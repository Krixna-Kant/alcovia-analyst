-- Student KPIs on the three lenses the brief asked for.
-- Quantity: did Alcovia conduct it?
-- Quality: did the Alcovian like it? (rating)
-- Performance: how did they show up? (skill scores, chapter rigour, focus)

-- params: :from, :to (date)

-- 1. Program quantity and quality by kind
select
  e.kind,
  count(*) as scheduled,
  count(*) filter (where e.conducted) as conducted,
  round(100.0 * count(*) filter (where e.conducted) / nullif(count(*), 0), 1) as conducted_pct,
  round(avg(a.rating) filter (where a.attended and a.rating is not null), 2) as avg_rating,
  round(100.0 * count(*) filter (where a.attended) / nullif(count(a.alcovian_id), 0), 1) as attend_pct
from program_events e
left join program_attendance a on a.event_id = e.id
where e.scheduled_on between :from and :to
group by 1
order by 1;

-- 2. Chapter readiness and monthly process adherence
select
  a.name,
  count(*) as chapters_touched,
  round(avg(cp.rigour_stage), 2) as avg_readiness,
  count(*) filter (where cp.rigour_stage >= 5) as exam_ready,
  count(*) filter (where cp.rigour_stage >= 3) as practiced
from chapter_progress cp
join alcovians a on a.id = cp.alcovian_id
where cp.updated_on between :from and :to
group by a.name
order by avg_readiness desc;

-- 3. Day-level execution: tasks, deadlines, time estimates, focus, quiz
select
  a.name,
  count(t.*) filter (where t.completed_at is not null) as tasks_done,
  count(t.*) as tasks_total,
  round(
    100.0 * count(t.*) filter (where t.completed_at is not null)
    / nullif(count(t.*), 0)
  , 1) as task_completion_pct,
  round(
    100.0 * count(t.*) filter (
      where t.completed_at is not null and t.completed_at::date <= t.due_on
    ) / nullif(count(t.*) filter (where t.completed_at is not null), 0)
  , 1) as deadline_adherence_pct,
  round(avg(
    case
      when t.planned_minutes is not null and fs.actual_minutes is not null
        then abs(fs.actual_minutes - t.planned_minutes)::numeric / nullif(t.planned_minutes, 0)
    end
  ) * 100, 1) as time_estimate_error_pct,
  coalesce(sum(d.focus_minutes), 0) as focus_minutes,
  round(avg(d.quiz_score) filter (where d.quiz_score is not null), 1) as avg_quiz
from alcovians a
left join tasks t on t.alcovian_id = a.id and t.due_on between :from and :to
left join focus_sessions fs on fs.task_id = t.id
left join daily_activity d on d.alcovian_id = a.id and d.day between :from and :to
group by a.name
order by task_completion_pct desc nulls last;
