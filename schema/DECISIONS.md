# Schema decisions

I wrote these as decisions, not as a generic warehouse. If a table is here, it is because a metric in the brief, or a break I hit in the app, needs it.

## What I kept, and why

**Leads stay mirrored from ClickUp.** I do not replace ClickUp. Parent conversations already live there. The warehouse only needs enough to compute funnel, journey length, and cost per qualified lead.

**Stage changes are events.** `lead_stage_events` is one row per move. A single `status` column can tell me where a lead is today. It cannot tell me show-up rate or average days from first touch to Architect.

**I split every call into `_set` and `_done`.** Discovery show-up is `discovery_done / discovery_set`. Same for Ambition and Architect. If we only store "Discovery call booked", we will keep arguing about show-up in Slack.

**Workshop money is a separate table.** Razorpay at ₹3,999 a seat is not an invoice against an enrollment. Mixing it into `invoices` would break program vs workshop on day one.

**App events are the raw log. Daily activity is the rollup.** Most adoption questions (Home card taps, Focus started from a task, Realm repeat visits) need the log. Advisor Monday reviews need one row per Alcovian per day.

## What I added after using the app

I tested on the provided account (`nehil.chandrakar@alcovia.life`). No WHOOP. Little history. These tables exist because of what I actually hit, not because they look complete.

| Table | What I hit | Decision |
|---|---|---|
| `tasks.planned_minutes` + `focus_sessions` | I set a time on a task. Focus restarted at 25 minutes and asked again. | Planned minutes travel with the session. I store `source = task \| free` so I can see if the fix is used. |
| `exams.first_view_after_create_at` | Add Exam did not take me back to Exams. | Completion is not "row inserted". Completion is "teen saw their exam after saving". |
| `student_subjects.syllabus_source` | Syllabus is typed by hand. 10 opened it in 45 days, 1 this week. | I want upload vs advisor-fed vs manual as a metric before anyone redesigns the screen. |
| `tasks.subject` + `task_type` | Filters are only Today / Overdue / Done. | Subject and type have to be first-class or the new filters will be fake. |
| `academic_quarters` | Academics showed Q2 with no months. Home did not show the quarter. | One range, reused everywhere. Q2 is "Aug–Oct", not a badge. |
| `home_card_config` | Home puts about eight cards on screen. Nothing is clearly first. | Rank and hide cards without an app release. |
| `goals` as its own table | One goal completion in 45 days. | A goal is not a task. Monthly / quarterly outcomes stay separate. |
| `wearable_connections` | Wellness is one WHOOP user. | Null means not connected. The dashboard is not allowed to draw a zero. |
| `nudges_sent` | Advisors already chase deadlines by hand. | If n8n sends it, I log it, then I check 48-hour action. |
| `outreach_calls` | Smallest.ai is already paid for. | "We called them" has to be a row, or show-up work stays anecdotal. |
| `soft_skills` lookup | Workshops score 11 skills. | Scores are keys, not whatever the facilitator typed that Saturday. |
| `advisor_monthly_reviews` | Brief asks for a monthly syllabus re-eval. | Templatised. On track / sprint triggered. Not a free-text ClickUp doc. |

## What I refused to add

- **Parent, counselor, admin tables.** Out of scope. The brief said so.
- **Dragon inventory, territories, AlcoCoins balances.** Realm is the strongest feature. I instrument `realm_open` and `realm_first_run_done` first. A game economy table before the first-run explainer is the wrong order.
- **A second CRM.** ClickUp is the CRM. I sync. I do not rebuild.

## How I named stages

```
lead → qualified → discovery_set → discovery_done
                 → ambition_set → ambition_done
                 → architect_set → architect_done
                 → enrolled | dropped
```

These names are inferred from the brief. Week 1 I will sit on a live ClickUp lead and rename anything that does not match the lists they already use. The queries break if the strings drift.

## The one number I cannot invent

Campaign RCA uses a cost-per-qualified-lead target. I used ₹3,000 as a working line in the dummy dashboard so the SCALE / REFRESH / DROP column has something to push against. That number has to come from Sahil / finance. I would rather put a placeholder and flag it than pretend I know the unit economics.
