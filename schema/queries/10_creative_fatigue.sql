-- Asset-level CTR and frequency. This is the refresh list.
-- Highest CTR we keep. Lowest CTR + frequency 3+ we reshoot.

-- params: :from, :to (date)

select
  c.campaign_type,
  c.asset_name,
  c.creative_id,
  sum(s.impressions) as impressions,
  sum(s.clicks) as clicks,
  round(100.0 * sum(s.clicks) / nullif(sum(s.impressions), 0), 2) as ctr_pct,
  round(avg(s.frequency), 2) as frequency,
  round(sum(s.spend_inr)) as spend_inr,
  case
    when avg(s.frequency) >= 3 and (sum(s.clicks)::numeric / nullif(sum(s.impressions), 0)) < 0.01
      then 'reshoot'
    when avg(s.frequency) >= 3 then 'refresh_copy'
    when (sum(s.clicks)::numeric / nullif(sum(s.impressions), 0)) >= 0.015 then 'keep'
    else 'watch'
  end as action
from ad_daily_stats s
join ad_creatives c using (creative_id)
where s.day between :from and :to
group by 1, 2, 3
order by ctr_pct desc;
