# Metric queries

All of these read the schema in `../001_schema.sql`. Parameters are `:from`, `:to`, and on the RCA query `:cpql_target`.

| File | Question it answers |
|---|---|
| `01_discovery_showup.sql` | Discovery show-up by campaign |
| `02_campaign_rca.sql` | SCALE / REFRESH / DROP |
| `03_focus_from_task.sql` | Did the timer prefill get used? |
| `04_revenue_vs_target.sql` | Trial / full / workshop vs target, plus unpaid and renewals |
| `05_home_card_taps.sql` | Which Home cards actually get a tap |
| `06_funnel_journey.sql` | Full funnel, organic, conversion, average journey days |
| `07_student_kpis.sql` | Quantity, quality, performance |
| `08_syllabus_source.sql` | Manual vs upload vs advisor-fed |
| `09_exam_create_return.sql` | Did Add Exam land them back on the list |
| `10_creative_fatigue.sql` | Asset CTR and frequency 3+ |
| `11_landing_health.sql` | Drop-off and load time |

1–5 are the ones I would put on a printed appendix. The rest are what the boards already run in TypeScript against the dummy set.
