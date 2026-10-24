-- Full funnel + average journey length.
-- Journey is first lead event to enrolled or dropped.
-- Organic is counted separately because the brief asked for it.

-- params: :from, :to (timestamptz)

with first_touch as (
  select lead_id, min(occurred_at) as first_at
  from lead_stage_events
  group by 1
),
stage_once as (
  select lead_id, stage, min(occurred_at) as at
  from lead_stage_events
  group by 1, 2
),
cohort as (
  select l.id, l.source, l.is_qualified, ft.first_at
  from leads l
  join first_touch ft on ft.lead_id = l.id
  where l.created_at >= :from and l.created_at < :to
)
select
  count(*) as total_leads,
  count(*) filter (where source = 'organic') as organic_leads,
  count(*) filter (where is_qualified) as qualified,
  count(*) filter (where exists (
    select 1 from stage_once s where s.lead_id = c.id and s.stage = 'discovery_set'
  )) as discovery_set,
  count(*) filter (where exists (
    select 1 from stage_once s where s.lead_id = c.id and s.stage = 'discovery_done'
  )) as discovery_done,
  count(*) filter (where exists (
    select 1 from stage_once s where s.lead_id = c.id and s.stage = 'ambition_done'
  )) as ambition_done,
  count(*) filter (where exists (
    select 1 from stage_once s where s.lead_id = c.id and s.stage = 'architect_done'
  )) as architect_done,
  count(*) filter (where exists (
    select 1 from stage_once s where s.lead_id = c.id and s.stage = 'enrolled'
  )) as enrolled,
  round(
    100.0 * count(*) filter (where exists (
      select 1 from stage_once s where s.lead_id = c.id and s.stage = 'enrolled'
    )) / nullif(count(*) filter (where is_qualified), 0)
  , 1) as program_conversion_pct,
  round(avg(
    extract(epoch from (
      coalesce(
        (select at from stage_once s where s.lead_id = c.id and s.stage in ('enrolled', 'dropped') order by at limit 1),
        now()
      ) - c.first_at
    )) / 86400
  )::numeric, 1) as avg_journey_days
from cohort c;
