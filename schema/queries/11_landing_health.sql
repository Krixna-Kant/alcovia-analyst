-- Landing page health. Drop-off and load time, by page, for the selected window.

-- params: :from, :to (date)

select
  page,
  sum(visits) as visits,
  sum(bounces) as bounces,
  round(100.0 * sum(bounces) / nullif(sum(visits), 0), 1) as drop_off_pct,
  round(avg(avg_load_ms)) as avg_load_ms,
  case
    when avg(avg_load_ms) > 3000 then 'slow'
    when (sum(bounces)::numeric / nullif(sum(visits), 0)) > 0.65 then 'leaky'
    else 'ok'
  end as health
from landing_page_daily
where day between :from and :to
group by 1
order by drop_off_pct desc;
