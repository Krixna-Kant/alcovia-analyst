import { useMemo, useState, type ReactNode } from 'react'
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
import { eventsIn, programKpis, studentTable } from '../data/metrics'
import { softSkillAvg } from '../data/seed'
import { axis, barA, grid, tip } from '../lib/charts'
import { num, pct } from '../lib/format'
import { useRange } from '../range'

export function Students() {
  const { range } = useRange()
  const rows = useMemo(() => studentTable(), [])
  const kpis = programKpis(range)
  const ev = eventsIn(range)
  const [open, setOpen] = useState<string | null>(rows[0]?.id ?? null)
  const selected = rows.find((r) => r.id === open) ?? rows[0]

  const conducted = ev.filter((e) => e.conducted).length
  const ratings = ev.filter((e) => e.rating != null)
  const avgRating = ratings.length
    ? ratings.reduce((a, e) => a + (e.rating || 0), 0) / ratings.length
    : 0
  const onTrack = rows.filter((r) => r.ops.syllabusOnTrack).length
  const avgFocus = rows.reduce((a, r) => a + r.ops.focusMin, 0) / rows.length

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          label="Quantity · conducted"
          value={`${conducted}/${ev.length}`}
          hint="Did Alcovia actually run what was on the calendar"
          tone="gold"
        />
        <Kpi
          label="Quality · rating"
          value={avgRating ? avgRating.toFixed(1) : '—'}
          hint="Did Alcovians like it. Empty if nothing was scored."
          tone="ok"
        />
        <Kpi
          label="Performance · syllabus on track"
          value={`${onTrack}/20`}
          hint="Advisor monthly flag, not a content judgement"
          tone={onTrack >= 10 ? 'ok' : 'warn'}
        />
        <Kpi
          label="Focus minutes / Alcovian"
          value={num(avgFocus, 0)}
          hint="Window rollup. Quiet teens pull the average down — that is the point."
          tone="bad"
        />
      </div>

      <Panel title="Program by kind" kicker="quantity and quality">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-mute">
              <tr>
                <th className="pb-2">Kind</th>
                <th>Scheduled</th>
                <th>Conducted</th>
                <th>Show-up</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((k) => (
                <tr key={k.kind} className="border-t border-line">
                  <td className="py-2 capitalize">{k.kind.replace('_', ' ')}</td>
                  <td>{k.scheduled}</td>
                  <td>
                    {k.conducted}{' '}
                    <span className="text-mute">({pct(k.conductedPct, 0)})</span>
                  </td>
                  <td>{pct(k.attendPct, 0)}</td>
                  <td>{k.rating == null ? '—' : k.rating.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-5">
        <Panel title="Cohort" kicker="click a row" className="lg:col-span-3">
          <div className="max-h-[480px] overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-card text-[11px] uppercase tracking-wider text-mute">
                <tr>
                  <th className="pb-2">Alcovian</th>
                  <th>Focus</th>
                  <th>Tasks</th>
                  <th>Ready</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setOpen(r.id)}
                    className={`cursor-pointer border-t border-line ${open === r.id ? 'bg-gold/8' : 'hover:bg-panel'}`}
                  >
                    <td className="py-2">
                      {r.name}
                      <div className="text-[11px] text-mute">
                        G{r.grade} · {r.advisor}
                        {r.quiet ? ' · quiet' : ''}
                      </div>
                    </td>
                    <td>{r.ops.focusMin}m</td>
                    <td>
                      {r.ops.tasksDone}/{r.ops.tasks}
                    </td>
                    <td>{r.ops.readiness.toFixed(1)}</td>
                    <td>
                      {r.ops.syllabusOnTrack ? (
                        <Pill tone="ok">on track</Pill>
                      ) : (
                        <Pill tone="bad">behind</Pill>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {selected ? <StudentCard row={selected} /> : null}
      </div>

      <Panel title="Workshop skills" kicker="performance lens · 11 scores">
        <div className="h-56">
          <ResponsiveContainer>
            <BarChart data={softSkillAvg}>
              <CartesianGrid stroke={grid} vertical={false} />
              <XAxis dataKey="skill" stroke={axis} fontSize={10} interval={0} angle={-20} textAnchor="end" height={60} />
              <YAxis domain={[0, 5]} stroke={axis} fontSize={12} />
              <Tooltip contentStyle={tip} />
              <Bar dataKey="score" fill={barA} radius={3} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs text-mute">
          Public speaking and time use are the soft floor. I would rather run one
          workshop that forces a pitch than add a "speaking module" in the app.
        </p>
      </Panel>
    </div>
  )
}

function StudentCard({
  row,
}: {
  row: ReturnType<typeof studentTable>[number]
}) {
  const o = row.ops
  return (
    <Panel title={row.name} kicker={`${row.advisor} · G${row.grade}`} className="lg:col-span-2">
      <div className="space-y-4 text-sm">
        <Block label="Day">
          Focus {o.focusMin}m in the window · app avg {o.appMinAvg.toFixed(1)}m ·
          quiz {o.quiz == null ? 'not connected / skipped' : `${o.quiz.toFixed(1)} (${o.quizTaken} nights)`}
          {row.whoop ? ' · WHOOP on' : ' · wearable not connected'}
        </Block>
        <Block label="Week">
          Tasks {o.tasksDone}/{o.tasks} · overdue {o.overdue} · deadline pressure
          sits on {row.advisor}. Advisors are not SMEs — they chase stage, not content.
        </Block>
        <Block label="Month">
          Chapter readiness {o.readiness.toFixed(1)} / 5 · syllabus{' '}
          {o.syllabusOnTrack ? 'on track' : 'behind — sprint candidate'} · last
          workshop {o.lastWorkshop ?? '—'}/5
        </Block>
        <Block label="Quarter / roadmap">
          Career {row.ops.careerRoadmap ? 'done' : 'not done'} · personal milestones{' '}
          {o.personalDone}/{o.personalTotal} · plan {row.plan.replace('_', ' ')}
          {row.renewal ? ` · renews ${row.renewal}` : ''}
        </Block>
        <p className="text-xs text-mute">
          Last open {row.lastOpen}. Realm {row.realm ? 'yes' : 'no'}. Focus regular{' '}
          {row.focusRegular ? 'yes' : 'no'}.
        </p>
      </div>
    </Panel>
  )
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-gold">{label}</div>
      <p className="mt-1 text-ink/90">{children}</p>
    </div>
  )
}
