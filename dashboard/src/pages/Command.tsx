import { Link } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Kpi, Panel, Pill } from '../components/Kpi'
import { APP_TARGET_MINUTES, alcovians } from '../data/seed'
import { cohortPulse, funnelRollup, revenueRollup } from '../data/metrics'
import { axis, barA, barB, barC, grid, tip } from '../lib/charts'
import { inr, num, pct, prettyDate } from '../lib/format'
import { useRange } from '../range'

export function Command() {
  const { range, preset } = useRange()
  const q = `?w=${preset}`
  const rev = revenueRollup(range)
  const fun = funnelRollup(range)
  const pulse = cohortPulse(range)
  const quiet = alcovians.filter((a) => a.lastOpen < '2026-10-09')

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          label="Revenue vs target"
          value={pct(rev.vs, 0)}
          hint={`${inr(rev.total, true)} of ${inr(rev.target, true)} · trial ${inr(rev.trial, true)} · full ${inr(rev.full, true)} · workshop ${inr(rev.workshop, true)}`}
          tone={rev.vs >= 90 ? 'ok' : rev.vs >= 70 ? 'warn' : 'bad'}
        />
        <Kpi
          label="Program conversion"
          value={pct(fun.conversion)}
          hint={`${fun.enrolled} enrolled / ${fun.qualified} qualified · CPQL ${inr(fun.cpql, true)} · journey ${fun.avgJourney.toFixed(1)}d`}
          tone="gold"
        />
        <Kpi
          label="Discovery show-up"
          value={pct(fun.showUp)}
          hint={`${fun.discoveryDone} sat / ${fun.discoverySet} set. Smallest.ai should move this before we buy more leads.`}
          tone={fun.showUp >= 70 ? 'ok' : 'warn'}
        />
        <Kpi
          label="App minutes / user"
          value={`${pulse.avgMinutes.toFixed(2)}m`}
          hint={`Target ${APP_TARGET_MINUTES}m. ${pulse.thisWeek} active this week · ${pulse.quiet} quiet 14d.`}
          tone="bad"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <Panel title="Revenue split" kicker="program vs workshop" className="lg:col-span-3">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart
                data={[
                  {
                    name: 'Window',
                    Trial: rev.trial,
                    Full: rev.full,
                    Workshop: rev.workshop,
                  },
                ]}
              >
                <CartesianGrid stroke={grid} vertical={false} />
                <XAxis dataKey="name" stroke={axis} fontSize={12} />
                <YAxis stroke={axis} fontSize={12} tickFormatter={(v) => inr(v, true)} />
                <Tooltip contentStyle={tip} formatter={(v) => inr(Number(v))} />
                <Bar dataKey="Trial" fill={barA} radius={4} />
                <Bar dataKey="Full" fill={barB} radius={4} />
                <Bar dataKey="Workshop" fill={barC} radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-mute">
            Workshop is Razorpay at ₹3,999 a seat · {rev.seats} seats in this window.
            Unpaid invoices sit at {inr(rev.unpaid)}.
          </p>
        </Panel>

        <Panel title="Funnel" kicker="meta + organic" className="lg:col-span-2">
          <ol className="space-y-2 text-sm">
            {[
              ['Leads', fun.leads, 'incl. organic ' + fun.organic],
              ['Qualified', fun.qualified, pct((100 * fun.qualified) / Math.max(fun.leads, 1))],
              ['Discovery set → done', `${fun.discoverySet} → ${fun.discoveryDone}`, pct(fun.showUp) + ' show-up'],
              ['Ambition done', fun.ambitionDone, 'teen in the room'],
              ['Architect done', fun.architectDone, 'parent + teen + roadmap'],
              ['Enrolled', fun.enrolled, pct(fun.conversion) + ' of qualified'],
            ].map(([k, v, h]) => (
              <li key={String(k)} className="flex items-baseline justify-between gap-3 border-b border-line/70 pb-2">
                <div>
                  <div className="text-ink">{k}</div>
                  <div className="text-[11px] text-mute">{h}</div>
                </div>
                <div className="text-[1.7rem] font-semibold tracking-tight text-ink">{typeof v === 'number' ? num(v) : v}</div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Quiet for 14 days" kicker="7 Alcovians">
          <ul className="space-y-2">
            {quiet.map((a) => (
              <li key={a.id} className="flex items-center justify-between text-sm">
                <span>
                  {a.name}{' '}
                  <span className="text-mute">
                    · G{a.grade} · {a.advisor}
                  </span>
                </span>
                <span className="text-mute">last {prettyDate(a.lastOpen)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-mute">
            I will not treat a quiet week as churn until I know if it is exams.
            The Friday scorecard still has to list them.
          </p>
        </Panel>

        <Panel title="What I would do this week" kicker="from the audit">
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <Pill tone="gold">1</Pill>
              <span>Carry task time into Focus. 5 of 11 who opened it actually use it.</span>
            </li>
            <li className="flex gap-2">
              <Pill tone="gold">2</Pill>
              <span>Add Exam must land back on the list. Study is already dying.</span>
            </li>
            <li className="flex gap-2">
              <Pill tone="gold">3</Pill>
              <span>Advisor loads the syllabus. 10 opened it, 1 this week.</span>
            </li>
            <li className="flex gap-2">
              <Pill>hold</Pill>
              <span>Do not restyle Realm. Explain the rules. 13 already come for it.</span>
            </li>
          </ul>
          <div className="mt-4 flex gap-2 text-sm">
            <Link className="text-gold-2 underline-offset-2 hover:underline" to={`/adoption${q}`}>
              Adoption board →
            </Link>
            <Link className="text-gold-2 underline-offset-2 hover:underline" to={`/gtm${q}`}>
              GTM →
            </Link>
            <Link className="text-gold-2 underline-offset-2 hover:underline" to={`/students${q}`}>
              Alcovians →
            </Link>
          </div>
        </Panel>
      </div>
    </div>
  )
}
