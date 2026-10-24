# What I would do differently with real data

I built this on the brief, one test account, and dummy numbers that match the 45-day usage snapshot. That is enough to design the board. It is not enough to lock thresholds.

**ClickUp stage names first.** `discovery_set` and `architect_done` are my names. They came from the brief, not from a live list. Week 1 I will walk one real lead from first comment to payment and rename the events to whatever ClickUp already says. The queries are only as good as those strings.

**RCA rules are starting lines.** Frequency 3+, 1.5× cost, ₹3,000 CPQL — I needed a rule so the SCALE / REFRESH / DROP column is not empty. After two or three months of real spend I will move those lines to whatever actually produced Architect sessions, not what looks tidy on a chart.

**Twenty Alcovians will swing weekly numbers.** One quiet week can look like a collapse. I will read app metrics on a 4–6 week slope and treat a single week as noise, especially Focus minutes and Realm visits.

**I have not seen Wellness with data.** The test account has no WHOOP. One Alcovian in the brief has it connected. Sleep, recovery and active minutes stay null until a wearable is on. The board prints "not connected". It does not print zero.

**Syllabus fade is a hypothesis.** Ten opened it, one this week. I think manual entry is why. `syllabus_source` exists so I can be wrong. If upload lands and usage still dies, the problem is the weekly habit, not the input.

**I would rather have five events firing than a perfect schema.** `focus_start` (with source), `focus_end` (with minutes), `card_tap`, `exam_created`, `realm_open`. If those five are clean in week two, the rest of the warehouse can wait.
