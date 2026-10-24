-- Alcovia warehouse
-- I treat this as a mirror of ClickUp, Razorpay, Meta, the app, and wearables.
-- ClickUp stays the operating system for leads and parent notes.
-- This database exists so Monday reviews do not start in folders.

-- ---------------------------------------------------------------------------
-- Vocabulary I locked
-- ---------------------------------------------------------------------------
-- Alcovian, not student.
-- Academic advisor, not teacher. Advisors are not subject-matter experts,
-- so I measure process adherence, not "did they teach the chapter well".
-- Funnel stages follow the brief: lead → qualified → discovery →
-- ambition interview → architect session → enrolled / dropped.
-- I split set vs done on every call stage. Show-up rate needs both.

create extension if not exists pgcrypto;

-- ===========================================================================
-- SALES
-- ===========================================================================

create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null,
  source text not null,              -- meta_ad | organic | referral | workshop
  campaign_id text,
  creative_id text,
  parent_name text,
  teen_name text,
  city text,
  -- ClickUp is the source of truth for the lead. I only mirror it.
  -- Unique so a ClickUp task cannot land twice when n8n retries.
  clickup_task_id text unique,
  is_qualified boolean not null default false,
  dropped_reason text
);

-- I log one row per stage change instead of a single status column.
-- The brief asks for drop-off and average journey length.
-- A status column can tell me where a lead is today. It cannot tell me
-- how long they sat between discovery_set and discovery_done.
create table lead_stage_events (
  id bigserial primary key,
  lead_id uuid not null references leads(id),
  stage text not null,
    -- lead
    -- qualified
    -- discovery_set
    -- discovery_done
    -- ambition_set
    -- ambition_done
    -- architect_set
    -- architect_done
    -- enrolled
    -- dropped
  occurred_at timestamptz not null,
  actor text,                        -- human | n8n | smallest_ai
  unique (lead_id, stage, occurred_at)
);

create index lead_stage_events_lead_idx on lead_stage_events (lead_id, occurred_at);
create index lead_stage_events_stage_idx on lead_stage_events (stage, occurred_at);

create table enrollments (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id),
  alcovian_id uuid,                  -- filled once the teen is onboarded
  plan text not null,                -- trial_3m | full_program
  start_date date not null,
  -- trial_3m only. This is the list I want on the GTM board every Monday.
  renewal_date date,
  monthly_fee_inr int not null
);

create table invoices (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references enrollments(id),
  amount_inr int not null,
  issued_on date not null,
  -- null means generated but not paid. That is a GTM metric, not a footnote.
  paid_on date,
  razorpay_payment_id text
);

-- Workshop seats come from Razorpay at 3999. I keep them off invoices
-- so program vs workshop revenue never gets mixed in one column.
create table workshop_payments (
  razorpay_payment_id text primary key,
  workshop_date date not null,
  seats int not null default 1,
  amount_inr int not null,
  paid_at timestamptz not null,
  parent_phone text
);

create table revenue_targets (
  month date primary key,            -- first of month
  target_inr int not null,
  trial_target int,
  full_program_target int,
  workshop_target_inr int
);

-- Smallest.ai is already in the stack to lift discovery show-up.
-- I want every automated call in a table so "we called them" is a fact.
create table outreach_calls (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id),
  purpose text not null,             -- discovery_t24 | discovery_t2 | ambition_t24 | renewal
  vendor text not null default 'smallest_ai',
  scheduled_for timestamptz not null,
  status text not null,              -- queued | completed | no_answer | failed
  answered boolean,
  duration_sec int
);

-- ===========================================================================
-- ADS
-- ===========================================================================

create table ad_creatives (
  creative_id text primary key,
  campaign_id text not null,
  campaign_type text not null,       -- program | workshop
  asset_name text not null,
  launched_on date not null,
  retired_on date
);

-- Stats at creative × day so I can see CTR by asset and fatigue
-- (frequency 3+) before it shows up in cost per qualified lead.
create table ad_daily_stats (
  day date not null,
  creative_id text not null references ad_creatives(creative_id),
  spend_inr numeric not null,
  impressions int not null,
  clicks int not null,
  frequency numeric not null,
  primary key (day, creative_id)
);

create table landing_page_daily (
  day date not null,
  page text not null,
  visits int not null,
  bounces int not null,
  avg_load_ms int not null,
  primary key (day, page)
);

-- ===========================================================================
-- ALCOVIANS
-- ===========================================================================

create table alcovians (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  grade int not null check (grade between 6 and 10),
  academic_advisor text not null,
  joined_on date not null,
  city text,
  enrollment_id uuid references enrollments(id)
);

-- In the app, Academics showed quarters with no months.
-- Home did not show the quarter at all. I store the range once
-- so every screen can label Q2 as "Aug–Oct" the same way.
create table academic_quarters (
  academic_year text not null,
  quarter text not null,             -- Q1 | Q2 | Q3 | Q4
  start_month date not null,
  end_month date not null,
  theme text,                        -- social_work | entrepreneurship | summer_closure
  primary key (academic_year, quarter)
);

-- ===========================================================================
-- APP FRICTION I HIT WHILE TESTING
-- ===========================================================================

-- Starting a task sent me to Focus, then Focus restarted at 25 minutes
-- and asked for the time again. Planned minutes have to live on the task
-- and travel with the session. That is why tasks are their own table,
-- not a JSON blob on the Alcovian.
create table tasks (
  id uuid primary key default gen_random_uuid(),
  alcovian_id uuid not null references alcovians(id),
  title text not null,
  subject text,
  task_type text,                    -- read | notes | practice | past_paper | revision | other
  planned_minutes int,
  due_on date,
  assigned_by text not null,         -- self | advisor
  status text not null default 'open', -- open | today | overdue | done
  completed_at timestamptz
);

create index tasks_alcovian_idx on tasks (alcovian_id, due_on);
create index tasks_filter_idx on tasks (alcovian_id, subject, task_type, status);

-- Goals had one completion in 45 days. I keep them separate from tasks.
-- A goal is a quarterly or monthly outcome. A task is a day-level action.
-- Mixing them is why the current Goals screen feels like a dead list.
create table goals (
  id uuid primary key default gen_random_uuid(),
  alcovian_id uuid not null references alcovians(id),
  horizon text not null,             -- monthly | quarterly
  title text not null,
  created_on date not null,
  due_on date not null,
  completed_on date
);

-- Add Exam did not send me back to Exams after I saved.
-- I need created_at and first_view_after_create_at to prove the fix worked.
create table exams (
  id uuid primary key default gen_random_uuid(),
  alcovian_id uuid not null references alcovians(id),
  title text not null,
  subject text,
  exam_type text not null,           -- formative | unit_test | midterm | half_yearly | boards
  exam_on date not null,
  created_at timestamptz not null,
  first_view_after_create_at timestamptz,
  target_score int,
  actual_score int
);

-- Manual chapter entry is the most likely reason Syllabus dies after week one.
-- 10 Alcovians opened it in 45 days, 1 this week. I want to measure
-- upload vs advisor-fed vs typed-by-teen before I redesign the screen.
create table student_subjects (
  alcovian_id uuid not null references alcovians(id),
  subject text not null,
  syllabus_source text not null,     -- manual | upload | advisor
  loaded_on date,
  primary key (alcovian_id, subject)
);

-- Rigour is a five-stage process, not a checkbox.
-- Advisors are not SMEs. They can ask "which stage are you on?"
-- They cannot mark a chapter complete on content quality.
-- 0 none
-- 1 chapter read
-- 2 notes / recollection
-- 3 practice ≥ 70%
-- 4 past paper, timed
-- 5 exam readiness ≥ 80%
create table chapter_progress (
  alcovian_id uuid not null references alcovians(id),
  subject text not null,
  chapter text not null,
  rigour_stage int not null check (rigour_stage between 0 and 5),
  updated_on date not null,
  primary key (alcovian_id, subject, chapter)
);

-- Home throws about eight card types at once. No card is clearly first.
-- A config table lets me rank, hide, or mark one primary action
-- without waiting for an app release.
create table home_card_config (
  card_key text primary key,         -- focus_score | syllabus_pace | attendance | exams | sessions | calendar | wellness | nudges
  sort_rank int not null,
  is_primary boolean not null default false,
  is_visible boolean not null default true,
  audience text not null default 'all'  -- all | has_exam_14d | has_wearable | behind_syllabus
);

-- I record planned vs actual on the session itself.
-- If I only have app_events I will keep guessing whether the double
-- time-ask is still happening.
create table focus_sessions (
  id uuid primary key default gen_random_uuid(),
  alcovian_id uuid not null references alcovians(id),
  task_id uuid references tasks(id),
  started_at timestamptz not null,
  ended_at timestamptz,
  planned_minutes int not null,
  actual_minutes int,
  source text not null               -- task | free
);

-- ===========================================================================
-- APP LOG AND DAILY STATE
-- ===========================================================================

-- Raw log. Most adoption metrics come from here.
-- Events I asked the engineer to fire, in this exact shape:
--   open_home
--   card_impression / card_tap          props.card
--   focus_start                         props.source = task | free
--   focus_end                           props.minutes
--   exam_created
--   exam_viewed_after_create
--   syllabus_opened / syllabus_uploaded
--   realm_open / realm_first_run_done
--   goal_completed
--   quiz_submitted                      props.score
create table app_events (
  id bigserial primary key,
  alcovian_id uuid not null references alcovians(id),
  event text not null,
  props jsonb not null default '{}',
  at timestamptz not null
);

create index app_events_alcovian_idx on app_events (alcovian_id, at);
create index app_events_event_idx on app_events (event, at);

-- One row per Alcovian per day. Wearable fields stay null when
-- nothing is connected. The dashboard must print "not connected",
-- never zero. I tested on one account with no WHOOP. Zeros would lie.
create table daily_activity (
  alcovian_id uuid not null references alcovians(id),
  day date not null,
  focus_minutes int,
  app_minutes numeric,
  quiz_score int,                    -- 8pm GK quiz
  timetable_filled boolean,
  active_minutes int,                -- null if no wearable
  sleep_hours numeric,               -- null if no wearable
  recovery_pct int,                  -- null if no wearable
  primary key (alcovian_id, day)
);

create table wearable_connections (
  alcovian_id uuid primary key references alcovians(id),
  vendor text not null,              -- whoop | apple | samsung | garmin
  connected_on date not null,
  last_sync_at timestamptz
);

-- Day-level timeboxing. Self-study slots are whatever is left after
-- school, tuition, extra-curriculars and free time are placed.
create table timetable_blocks (
  id uuid primary key default gen_random_uuid(),
  alcovian_id uuid not null references alcovians(id),
  day date not null,
  block_type text not null,          -- school | tuition | extra | self_study | free
  start_min int not null,            -- minutes from midnight
  end_min int not null,
  label text
);

create table daily_quizzes (
  day date primary key,
  topic text not null,               -- sports | history | logical | logos | current
  conducted boolean not null default false,
  question_count int not null default 10
);

create table quiz_attempts (
  alcovian_id uuid not null references alcovians(id),
  day date not null references daily_quizzes(day),
  score int not null,
  submitted_at timestamptz not null,
  primary key (alcovian_id, day)
);

-- ===========================================================================
-- PROGRAM RIGOUR (month / quarter)
-- ===========================================================================

-- Career / personal / academic roadmaps. Career is binary.
-- Personal is monthly milestones. Academic is the chapter process above.
create table roadmap_items (
  id uuid primary key default gen_random_uuid(),
  alcovian_id uuid not null references alcovians(id),
  kind text not null,                -- career | personal | academic
  title text not null,
  due_on date not null,
  done_on date
);

-- Workshops, pods, peer sessions, mentor calls, branding, quarterly items.
-- conducted answers the quantity lens: did Alcovia actually run it?
create table program_events (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
    -- workshop | pod | peer | mentor | branding
    -- podcast | competition | parent_child | out_of_city
  title text not null,
  scheduled_on date not null,
  conducted boolean not null default false,
  industry text
);

-- The 11 workshop soft skills live as a lookup so scores are not free text.
create table soft_skills (
  skill_key text primary key,
  label text not null,
  sort_rank int not null
);

insert into soft_skills (skill_key, label, sort_rank) values
  ('engagement',        'Engagement',         1),
  ('teamwork',          'Team work',          2),
  ('crisis',            'Crisis management',  3),
  ('adaptability',      'Adaptability',       4),
  ('public_speaking',   'Public speaking',    5),
  ('listening',         'Listening',          6),
  ('problem_solving',   'Problem solving',    7),
  ('leadership',        'Leadership',         8),
  ('empathy',           'Empathy',            9),
  ('time_use',          'Time use',          10),
  ('presence',          'Presence',          11);

-- attended + rating = quality lens (did the Alcovian like it).
-- skill_scores = performance lens (how they showed up in the room).
create table program_attendance (
  event_id uuid not null references program_events(id),
  alcovian_id uuid not null references alcovians(id),
  attended boolean not null,
  rating int check (rating between 1 and 5),
  skill_scores jsonb,
  primary key (event_id, alcovian_id)
);

-- Once a month the academic advisor re-evaluates syllabus pace.
-- This is the templatised review the brief asked for.
create table advisor_monthly_reviews (
  alcovian_id uuid not null references alcovians(id),
  month date not null,
  syllabus_on_track boolean not null,
  rigour_on_track boolean not null,
  sprint_triggered boolean not null default false,
  notes text,
  reviewed_on date not null,
  primary key (alcovian_id, month)
);

-- ===========================================================================
-- AUTOMATION AUDIT
-- ===========================================================================

-- Every n8n message is logged. I need to know the alert actually left,
-- and whether anyone moved within 48 hours. Otherwise automations
-- become a graveyard of "we set it up".
create table nudges_sent (
  id bigserial primary key,
  alcovian_id uuid references alcovians(id),
  lead_id uuid references leads(id),
  trigger text not null,             -- missed_deadline | syllabus_behind | renewal_due | quiz_absent | discovery_t24
  channel text not null,             -- clickup | whatsapp | smallest_ai | email
  sent_at timestamptz not null,
  acted_within_48h boolean
);

create table clickup_sync_log (
  id bigserial primary key,
  object_type text not null,         -- lead | parent_note | task
  clickup_task_id text not null,
  synced_at timestamptz not null,
  status text not null,              -- ok | conflict | skipped
  detail text
);
