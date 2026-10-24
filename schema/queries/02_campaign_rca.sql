-- Campaign RCA.
-- I want one row per campaign with the four numbers that decide money:
-- spend, cost per qualified lead, CTR, frequency, enrollments.
-- Suggested action is a starting rule, not a model.
--   frequency >= 3                      → refresh the asset
--   high CPQL and zero enrollments      → drop
--   CPQL on target and at least one pay → scale
-- :cpql_target is a finance number. I used 3000 in the dummy board.

-- params: :from, :to (date), :cpql_target (numeric)

with spend as (
  select
    c.campaign_id,
    c.campaign_type,
    sum(a.spend_inr) as spend,
    avg(a.frequency) as freq,
    sum(a.clicks)::numeric / nullif(sum(a.impressions), 0) as ctr
  from ad_daily_stats a
  join ad_creatives c using (creative_id)
  where a.day between :from and :to
  group by 1, 2
),
qualified as (
  select campaign_id, count(*) filter (where is_qualified) as qualified
  from leads
  where created_at::date between :from and :to
  group by 1
),
enrolled as (
  select l.campaign_id, count(*) as enrolled
  from enrollments e
  join leads l on l.id = e.lead_id
  where e.start_date between :from and :to
  group by 1
)
select
  s.campaign_id,
  s.campaign_type,
  round(s.spend) as spend_inr,
  coalesce(q.qualified, 0) as qualified,
  round(s.spend / nullif(q.qualified, 0)) as cpql,
  round(100 * s.ctr, 2) as ctr_pct,
  round(s.freq, 1) as frequency,
  coalesce(e.enrolled, 0) as enrolled,
  case
    when s.freq >= 3 then 'refresh'
    when coalesce(e.enrolled, 0) = 0
         and s.spend / nullif(q.qualified, 0) > :cpql_target * 1.5 then 'drop'
    when s.spend / nullif(q.qualified, 0) <= :cpql_target
         and coalesce(e.enrolled, 0) > 0 then 'scale'
    else 'hold'
  end as suggested_action
from spend s
left join qualified q using (campaign_id)
left join enrolled e using (campaign_id)
order by spend_inr desc;
