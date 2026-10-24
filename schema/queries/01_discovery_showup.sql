-- Discovery call show-up rate by campaign.
-- I need both discovery_set and discovery_done. A single "discovery" status
-- cannot give show-up. That is why the stage table is an event log.

-- params: :from, :to  (timestamptz)

with set_ as (
  select distinct lead_id
  from lead_stage_events
  where stage = 'discovery_set'
    and occurred_at >= :from
    and occurred_at < :to
),
done as (
  select distinct lead_id
  from lead_stage_events
  where stage = 'discovery_done'
)
select
  coalesce(l.campaign_id, 'organic_or_untracked') as campaign_id,
  l.source,
  count(*) as calls_set,
  count(d.lead_id) as calls_done,
  round(100.0 * count(d.lead_id) / nullif(count(*), 0), 1) as show_up_pct
from set_ s
join leads l on l.id = s.lead_id
left join done d on d.lead_id = s.lead_id
group by 1, 2
order by show_up_pct asc;
