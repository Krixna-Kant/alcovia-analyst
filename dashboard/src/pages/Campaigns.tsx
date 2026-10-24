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
import { campaignRows, creativeRows, landingRows } from '../data/metrics'
import { axis, barA, grid, tip } from '../lib/charts'
import { inr, num, pct } from '../lib/format'
import { useRange } from '../range'

const toneFor = (a: string) =>
  a === 'scale' || a === 'keep' ? 'ok' : a === 'refresh' || a === 'refresh copy' || a === 'watch' ? 'warn' : a === 'drop' || a === 'reshoot' || a === 'leaky' || a === 'slow' ? 'bad' : 'plain'

export function Campaigns() {
  const { range } = useRange()
  const rows = campaignRows(range)
  const assets = creativeRows(range).sort((a, b) => b.ctr - a.ctr)
  const pages = landingRows(range)
  const scale = rows.filter((r) => r.action === 'scale').length
  const refresh = rows.filter((r) => r.action === 'refresh').length
  const drop = rows.filter((r) => r.action === 'drop').length

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <Kpi label="Scale" value={String(scale)} hint="CPQL on the ₹3,000 line and at least one enrolment" tone="ok" />
        <Kpi label="Refresh" value={String(refresh)} hint="Frequency 3+ — the room has seen this asset" tone="warn" />
        <Kpi label="Drop" value={String(drop)} hint="Expensive qualified leads, no one paid" tone="bad" />
      </div>

      <Panel title="Campaign RCA" kicker="starting rules, not a model">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-mute">
              <tr>
                <th className="pb-2">Campaign</th>
                <th>Type</th>
                <th>Spend</th>
                <th>Qualified</th>
                <th>CPQL</th>
                <th>CTR</th>
                <th>Freq</th>
                <th>Enrolled</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-line">
                  <td className="py-2 font-medium">{r.id}</td>
                  <td className="text-mute">{r.type}</td>
                  <td>{inr(r.spend)}</td>
                  <td>{r.qualified}</td>
                  <td>{inr(r.cpql)}</td>
                  <td>{pct(r.ctr, 2)}</td>
                  <td>{r.frequency.toFixed(1)}</td>
                  <td>{r.enrolled}</td>
                  <td>
                    <Pill tone={toneFor(r.action)}>{r.action}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-mute">
          Refresh if frequency ≥ 3. Drop if CPQL &gt; 1.5× target and zero enrolments.
          Scale if CPQL ≤ target and someone paid. I will move these lines after two
          months of real spend against Architect sessions.
        </p>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-5">
        <Panel title="Assets by CTR" kicker="keep the top, reshoot the bottom" className="lg:col-span-3">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={assets} layout="vertical" margin={{ left: 8, right: 8 }}>
                <CartesianGrid stroke={grid} horizontal={false} />
                <XAxis type="number" stroke={axis} fontSize={12} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="name" width={150} stroke={axis} fontSize={10} />
                <Tooltip contentStyle={tip} formatter={(v) => pct(Number(v), 2)} />
                <Bar dataKey="ctr" fill={barA} radius={3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Landing health" kicker="drop-off and load" className="lg:col-span-2">
          <ul className="space-y-3">
            {pages.map((p) => (
              <li key={p.page} className="rounded-2xl bg-panel px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{p.page}</span>
                  <Pill tone={toneFor(p.health)}>{p.health}</Pill>
                </div>
                <div className="mt-1 text-xs text-mute">
                  {num(p.visits)} visits · {pct(p.drop)} drop-off · {p.loadMs} ms
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-mute">
            `/apply` is slow. `/workshop` leaks. I would not buy more workshop traffic
            until that page holds.
          </p>
        </Panel>
      </div>

      <Panel title="Refresh list" kicker="frequency and tired copy">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-mute">
              <tr>
                <th className="pb-2">Asset</th>
                <th>Campaign</th>
                <th>CTR</th>
                <th>Freq</th>
                <th>Spend</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a.id} className="border-t border-line">
                  <td className="py-2">{a.name}</td>
                  <td className="text-mute">{a.campaign}</td>
                  <td>{pct(a.ctr, 2)}</td>
                  <td>{a.frequency.toFixed(1)}</td>
                  <td>{inr(a.spend)}</td>
                  <td>
                    <Pill tone={toneFor(a.action)}>{a.action}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}
