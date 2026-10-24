# n8n workflows

These are export files. Import them as-is. Credentials stay in n8n — I did not put tokens in the JSON.

| File | Job | Trigger | Writes |
|---|---|---|---|
| `01_clickup_lead_sync.json` | Mirror new / moved leads | Every 15 min | `leads`, `lead_stage_events`, `clickup_sync_log` |
| `02_smallest_discovery_showup.json` | T-24h and T-2h AI calls on Discovery | Every hour | `outreach_calls`, `nudges_sent` |
| `03_deadline_nudge.json` | Missed task / syllabus behind | 8:30pm IST daily | `nudges_sent` |
| `04_trial_renewal.json` | 21 / 14 / 7 day renewal list | 9:00am IST daily | `nudges_sent` (ClickUp task on sales) |
| `05_razorpay_workshop.json` | ₹3,999 seat → warehouse | Razorpay webhook | `workshop_payments` |
| `06_friday_scorecard.json` | Advisor digest | Friday 5:00pm IST | email / ClickUp comment |

Rules I want on every workflow:

- Idempotent. A retry must not create a second lead or a second seat.
- Every send writes `nudges_sent` or `clickup_sync_log`. If it is not in the table, it did not happen.
- Copy is one fact and one ask. No paragraphs to parents.
- If ClickUp is down, the workflow fails closed and retries. It does not invent a stage.
