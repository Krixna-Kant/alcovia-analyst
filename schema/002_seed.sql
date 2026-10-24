-- Thin seed so the five headline queries have something to return.
-- The interactive boards use a richer dummy set in dashboard/src/data/seed.ts.
-- This file is for anyone who stands up Postgres and wants to see the SQL live.

insert into revenue_targets (month, target_inr) values
  ('2026-08-01', 650000),
  ('2026-09-01', 750000),
  ('2026-10-01', 800000);

insert into academic_quarters (academic_year, quarter, start_month, end_month, theme) values
  ('2026-27', 'Q1', '2026-05-01', '2026-07-31', 'social_work'),
  ('2026-27', 'Q2', '2026-08-01', '2026-10-31', 'entrepreneurship');

insert into ad_creatives (creative_id, campaign_id, campaign_type, asset_name, launched_on) values
  ('cr_amb_pod', 'program_ambition_q3', 'program', 'Podcast cut', '2026-08-01'),
  ('cr_ws_room', 'workshop_sat_sim', 'workshop', 'Saturday room', '2026-08-15');

insert into ad_daily_stats (day, creative_id, spend_inr, impressions, clicks, frequency) values
  ('2026-10-20', 'cr_amb_pod', 4200, 28000, 620, 1.6),
  ('2026-10-20', 'cr_ws_room', 2100, 15000, 180, 3.5);

insert into landing_page_daily (day, page, visits, bounces, avg_load_ms) values
  ('2026-10-20', '/program', 420, 190, 1600),
  ('2026-10-20', '/apply', 90, 48, 3400);

insert into home_card_config (card_key, sort_rank, is_primary, is_visible) values
  ('realm_nudge', 1, true, true),
  ('focus_score', 2, false, true),
  ('exams', 3, false, true),
  ('wellness', 8, false, false);
