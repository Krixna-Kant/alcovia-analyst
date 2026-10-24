-- Home card tap-through.
-- I am testing a claim I made after using the app: Home shows too many
-- cards and none of them is the primary action. If tap_pct is flat and
-- low across eight cards, that claim holds. If one card already wins,
-- I should make that card first instead of redesigning the whole feed.

-- params: :from (timestamptz)

select
  props->>'card' as card,
  count(*) filter (where event = 'card_impression') as shown,
  count(*) filter (where event = 'card_tap') as tapped,
  round(
    100.0 * count(*) filter (where event = 'card_tap')
    / nullif(count(*) filter (where event = 'card_impression'), 0)
  , 1) as tap_pct
from app_events
where at >= :from
  and event in ('card_impression', 'card_tap')
group by 1
order by tap_pct asc;
