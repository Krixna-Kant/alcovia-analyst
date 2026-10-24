# Alcovia — Product, Systems & Analytics

Submission for the Product, Systems & Analytics Lead assessment.

I used the student app on the test account, then designed the smallest system that can run GTM, revenue, and the weekly Alcovian review without a folder of documents.

Dummy numbers in the dashboards match the 45-day usage snapshot in the brief (20 Alcovians, 2.15 minute average, Realm as the strongest feature, Focus used properly by 5). They are a picture of the board, not live Alcovia data.

## Live boards

Run them locally:

```bash
cd dashboard
npm install
npm run dev
```

| Board | Path | What it is for |
|---|---|---|
| Command | `/` | Monday snapshot. Revenue, funnel, app minutes, quiet Alcovians. |
| GTM & revenue | `/gtm` | Target vs actual, trial vs full, workshop ₹3,999, unpaid invoices, renewals, funnel. |
| Campaign RCA | `/campaigns` | CTR, frequency, CPQL, landing health, SCALE / REFRESH / DROP. |
| Alcovians | `/students` | Day / week / month / quarter on quantity, quality, performance. |
| Adoption | `/adoption` | App audit against the usage numbers, plus Home card taps and Focus. |

`?w=45d` (or `7d`, `14d`, `30d`, `oct`, `sep`, `q`) keeps the date window when you move between boards.

Date range at the top drives every board.

## How to read this repo

| If you want | Open |
|---|---|
| Schema and why each table exists | [`schema/001_schema.sql`](schema/001_schema.sql), [`schema/DECISIONS.md`](schema/DECISIONS.md) |
| Metric queries | [`schema/queries/`](schema/queries) |
| What I will change with real data | [`schema/WHAT_I_WOULD_CHANGE.md`](schema/WHAT_I_WOULD_CHANGE.md) |
| n8n exports | [`n8n/`](n8n) |
| The boards | [`dashboard/`](dashboard) |

## What I am not claiming

I have not seen the live ClickUp lists, the real Meta account, or Wellness with a wearable on. Stage names, the ₹3,000 CPQL line, and RCA thresholds are drafts. Week 1 I walk one real lead and replace them.

ClickUp stays the operating system. This warehouse is the maths.
