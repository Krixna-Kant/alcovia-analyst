-- Exam create completion.
-- A row in exams is not enough. I bounced after Add Exam.
-- first_view_after_create_at tells me whether they landed back on the list.

-- params: :from (timestamptz)

select
  count(*) as exams_created,
  count(first_view_after_create_at) as returned_to_list,
  round(100.0 * count(first_view_after_create_at) / nullif(count(*), 0), 1) as return_pct,
  count(distinct alcovian_id) as creators,
  count(distinct alcovian_id) filter (
    where created_at >= now() - interval '14 days'
  ) as returned_in_last_14d
from exams
where created_at >= :from;
