-- Focus adoption, and whether sessions started from a task.
-- Only 5 of 11 who opened Focus use it regularly. The double time-ask
-- sits on that path. If pct_from_task stays low after we prefill time,
-- the bug was not the only reason.

-- params: :from (timestamptz)

select
  date_trunc('week', at)::date as week,
  count(distinct alcovian_id) as active_alcovians,
  count(*) filter (where event = 'focus_start') as sessions_started,
  round(
    100.0 * count(*) filter (where event = 'focus_start' and props->>'source' = 'task')
    / nullif(count(*) filter (where event = 'focus_start'), 0)
  , 1) as pct_started_from_task,
  coalesce(sum((props->>'minutes')::int) filter (where event = 'focus_end'), 0) as focus_minutes,
  round(
    coalesce(sum((props->>'minutes')::int) filter (where event = 'focus_end'), 0)::numeric
    / nullif(count(distinct alcovian_id), 0)
  , 1) as focus_minutes_per_active
from app_events
where at >= :from
  and event in ('focus_start', 'focus_end')
group by 1
order by 1;
