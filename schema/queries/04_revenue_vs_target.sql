-- Monthly revenue vs target, split the way the brief asked:
-- 3-month trial, full program, workshop (₹3999 / seat from Razorpay),
-- invoices generated but not paid, renewals coming up on trial teens.

with program as (
  select
    date_trunc('month', i.paid_on)::date as month,
    e.plan,
    sum(i.amount_inr) as amt
  from invoices i
  join enrollments e on e.id = i.enrollment_id
  where i.paid_on is not null
  group by 1, 2
),
workshop as (
  select date_trunc('month', paid_at)::date as month, sum(amount_inr) as amt
  from workshop_payments
  group by 1
),
unpaid as (
  select date_trunc('month', issued_on)::date as month, sum(amount_inr) as amt
  from invoices
  where paid_on is null
  group by 1
),
onboarded as (
  select date_trunc('month', start_date)::date as month, count(*) as n
  from enrollments
  group by 1
)
select
  t.month,
  t.target_inr,
  coalesce((select amt from program p where p.month = t.month and p.plan = 'trial_3m'), 0) as trial_rev,
  coalesce((select amt from program p where p.month = t.month and p.plan = 'full_program'), 0) as full_program_rev,
  coalesce((select amt from workshop w where w.month = t.month), 0) as workshop_rev,
  coalesce((select amt from unpaid u where u.month = t.month), 0) as invoices_unpaid,
  coalesce((select n from onboarded o where o.month = t.month), 0) as students_onboarded,
  (
    coalesce((select amt from program p where p.month = t.month and p.plan = 'trial_3m'), 0)
    + coalesce((select amt from program p where p.month = t.month and p.plan = 'full_program'), 0)
    + coalesce((select amt from workshop w where w.month = t.month), 0)
  ) as total_rev
from revenue_targets t
order by t.month;

-- Renewals in the next 30 days. This is the Monday list, not a chart.
select
  a.name as alcovian,
  e.plan,
  e.renewal_date,
  e.monthly_fee_inr,
  (e.renewal_date - current_date) as days_left
from enrollments e
join alcovians a on a.enrollment_id = e.id
where e.plan = 'trial_3m'
  and e.renewal_date between current_date and current_date + 30
order by e.renewal_date;
