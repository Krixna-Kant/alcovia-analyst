import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Panel, Pill } from '../components/Kpi'
import { cardTaps } from '../data/metrics'
import { featureOpens45, focusWeeks } from '../data/seed'
import { axis, barA, barMuted, grid, tip } from '../lib/charts'
import { pct } from '../lib/format'

const audit = [
  {
    n: '1',
    obs: 'Focus asks for time again after I start from a task.',
    ev: 'Opened by 11, used by 5.',
    fix: 'Carry planned minutes. One tap starts the clock.',
    metric: '% sessions with source = task · focus min / active',
  },
  {
    n: '2',
    obs: 'Add Exam does not return me to the list.',
    ev: 'Study already dropped off.',
    fix: 'Redirect + exam_viewed_after_create.',
    metric: 'Create → return rate · 14-day revisits',
  },
  {
    n: '3',
    obs: 'Syllabus is typed by hand. No upload, no advisor path I could find.',
    ev: '10 opened in 45 days. 1 this week.',
    fix: 'Advisor loads chapters. Upload second.',
    metric: 'Full subject list, split by source',
  },
  {
    n: '4',
    obs: 'Tasks filter only Today / Overdue / Done.',
    ev: 'Goals: 1 completion in 45 days.',
    fix: 'Subject and type filters. Goals stay separate.',
    metric: 'Task completion · goal completions / month',
  },
  {
    n: '5',
    obs: 'Academics shows quarters with no months. Home hides the quarter.',
    ev: 'Same teen, two calendars.',
    fix: 'One academic_quarters range, reused.',
    metric: 'Home impressions of the quarter card',
  },
  {
    n: '6',
    obs: 'Home puts ~8 cards up. Nothing is first.',
    ev: 'Everyone opens Home. Session is 2.15m.',
    fix: 'One primary card. Rest under Discover.',
    metric: 'Card tap-through',
  },
  {
    n: '7',
    obs: 'Realm assumes I know the rules. I did not.',
    ev: '13 Alcovians this week — strongest feature.',
    fix: 'Three-line first-run. No redesign.',
    metric: 'Repeat Realm visits in 7 days',
  },
]

export function Adoption() {
  const cards = cardTaps()
  const focus = focusWeeks.map((w) => ({
    ...w,
    pctTask: w.sessions ? (100 * w.fromTask) / w.sessions : 0,
  }))

  return (
    <div className="space-y-5">
      <Panel title="What I hit" kicker="one account · no WHOOP · ranked">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-mute">
              <tr>
                <th className="pb-2 w-8">#</th>
                <th>Observation</th>
                <th>Evidence</th>
                <th>Fix</th>
                <th>Metric</th>
              </tr>
            </thead>
            <tbody>
              {audit.map((r) => (
                <tr key={r.n} className="border-t border-line align-top">
                  <td className="py-2 text-gold">{r.n}</td>
                  <td className="py-2 pr-3">{r.obs}</td>
                  <td className="py-2 pr-3 text-mute">{r.ev}</td>
                  <td className="py-2 pr-3">{r.fix}</td>
                  <td className="py-2 text-mute">{r.metric}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-mute">
          November is rows 1–3. A mascot, a colour rewrite, and Wellness wait.
          Focus Mode already works because it is one action. The prefill has to
          keep that.
        </p>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Feature opens" kicker="45 days vs this week">
          <div className="max-h-[420px] overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-card text-[11px] uppercase tracking-wider text-mute">
                <tr>
                  <th className="pb-2">Feature</th>
                  <th>45d</th>
                  <th>Week</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {featureOpens45.map((f) => (
                  <tr key={f.feature} className="border-t border-line">
                    <td className="py-1.5">
                      {f.feature}
                      <div className="text-[11px] text-mute">{f.area}</div>
                    </td>
                    <td>{f.opened}</td>
                    <td>{f.thisWeek}</td>
                    <td>
                      {f.thisWeek === 0 ? (
                        <Pill tone="bad">dead this week</Pill>
                      ) : f.thisWeek <= 2 && f.opened >= 8 ? (
                        <Pill tone="warn">fade</Pill>
                      ) : (
                        <Pill tone="ok">held</Pill>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Home card tap-through" kicker="testing the eight-card claim">
          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={cards} layout="vertical">
                <CartesianGrid stroke={grid} horizontal={false} />
                <XAxis type="number" stroke={axis} fontSize={12} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="card" width={110} stroke={axis} fontSize={11} />
                <Tooltip contentStyle={tip} formatter={(v) => pct(Number(v))} />
                <Bar dataKey="tapPct" fill={barA} radius={3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-mute">
            Realm nudge already wins. Wellness and syllabus almost do not get a tap.
            That is the primary-card decision: lead with Realm / Focus, hide the rest.
          </p>
        </Panel>
      </div>

      <Panel title="Focus — sessions from a task" kicker="the number I will hold after the prefill">
        <div className="h-56">
          <ResponsiveContainer>
            <BarChart data={focus}>
              <CartesianGrid stroke={grid} vertical={false} />
              <XAxis dataKey="week" stroke={axis} fontSize={12} />
              <YAxis stroke={axis} fontSize={12} />
              <Tooltip contentStyle={tip} />
              <Bar dataKey="sessions" fill={barMuted} name="Sessions" />
              <Bar dataKey="fromTask" fill={barA} name="From a task" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs text-mute">
          Most sessions already start from a task — and then the timer asks for
          the time again. If `pct_from_task` stays high and minutes do not move
          after prefill, I was wrong about the bug being the bottleneck.
        </p>
      </Panel>
    </div>
  )
}
