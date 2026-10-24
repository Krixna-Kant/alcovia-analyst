-- Share of Alcovians with a fully loaded syllabus, by how it got there.
-- If advisor-fed and upload stay near zero, the fade from 10 openers to
-- 1 this week is an input problem, not a "teens don't care about syllabus" problem.

select
  syllabus_source,
  count(distinct alcovian_id) as alcovians,
  count(*) as subjects_loaded
from student_subjects
group by 1;

select
  count(distinct a.id) as alcovians,
  count(distinct ss.alcovian_id) as with_any_subject,
  count(distinct ss.alcovian_id) filter (
    where (
      select count(*) from student_subjects x where x.alcovian_id = ss.alcovian_id
    ) >= 5
  ) as with_full_load
from alcovians a
left join student_subjects ss on ss.alcovian_id = a.id;
