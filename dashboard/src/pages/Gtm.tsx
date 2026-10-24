import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Kpi, Panel, Pill } from '../components/Kpi'
import { monthlyRevenue, unpaidInvoices } from '../data/seed'
import { funnelIn, funnelRollup, renewalsIn, revenueRollup } from '../data/metrics'
import { axis, barA, barB, barC, barMuted, grid, tip } from '../lib/charts'
import { inr, num, pct, prettyDate } from '../lib/format'
import { useRange } from '../range'

export function Gtm() {
  const { range } = useRange()
  const rev = revenueRollup(range)
  const fun = funnelRollup(range)
  const months = monthlyRevenue.filter((m) => m.month <= range.to && (m.month.slice(0, 7) + '-28') >= range.from)
  const funnelMonths = funnelIn(range)
  const renewals = renewalsIn(range)

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Kpi label="Target" value={inr(rev.target, true)} hint="Sum of months in the window" tone="gold" />
        <Kpi
          label="Achieved"
          value={inr(rev.total, true)}
          hint={pct(rev.vs, 0) + ' of target'}
          tone={rev.vs >= 90 ? 'ok' : 'warn'}
        />
        <Kpi label="3-month trials" value={inr(rev.trial, true)} hint={`${rev.onboarded} onboarded in window`} tone="ok" />
        <Kpi label="Full program" value={inr(rev.full, true)} tone="bad" />
        <Kpi
          label="Workshop"
          value={inr(rev.workshop, true)}
          hint={`${rev.seats} seats × ₹3,999 · Razorpay`}
          tone="gold"
        />
      </div>

      <Panel title="Target vs achievement" kicker="by month">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={months.map((m) => ({ ...m, total: m.trial + m.full + m.workshop }))}>
              <CartesianGrid stroke={grid} vertical={false} />
              <XAxis dataKey="label" stroke={axis} fontSize={12} />
              <YAxis stroke={axis} fontSize={12} tickFormatter={(v) => inr(v, true)} />
              <Tooltip contentStyle={tip} formatter={(v) => inr(Number(v))} />
              <Legend />
              <Bar dataKey="target" name="Target" fill={barMuted} radius={3} />
              <Bar dataKey="trial" name="Trial" stackId="a" fill={barA} />
              <Bar dataKey="full" name="Full program" stackId="a" fill={barB} />
              <Bar dataKey="workshop" name="Workshop" stackId="a" fill={barC} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Funnel journey" kicker="show-up and drop-off">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={funnelMonths}>
                <CartesianGrid stroke={grid} vertical={false} />
                <XAxis dataKey="month" tickFormatter={(v) => v.slice(5, 7)} stroke={axis} fontSize={12} />
                <YAxis stroke={axis} fontSize={12} />
                <Tooltip contentStyle={tip} />
                <Legend />
                <Bar dataKey="leads" fill={barMuted} name="Leads" />
                <Bar dataKey="qualified" fill={axis} name="Qualified" />
                <Bar dataKey="discoveryDone" fill={barA} name="Discovery done" />
                <Bar dataKey="enrolled" fill={barB} name="Enrolled" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
            <Stat k="Show-up" v={pct(fun.showUp)} />
            <Stat k="Conversion" v={pct(fun.conversion)} />
            <Stat k="Organic leads" v={num(fun.organic)} />
            <Stat k="Avg journey" v={`${fun.avgJourney.toFixed(1)}d`} />
          </div>
          <p className="mt-3 text-xs text-mute">
            Cost of a qualified lead in this window: {inr(fun.cpql)}. I used ₹3,000 as a
            working line on the RCA board. Finance has to replace that.
          </p>
        </Panel>

        <Panel title="Invoices generated, not paid" kicker="cash, not bookings">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-mute">
              <tr>
                <th className="pb-2">Who</th>
                <th>Amount</th>
                <th>Issued</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {unpaidInvoices.map((r) => (
                <tr key={r.who} className="border-t border-line">
                  <td className="py-2">{r.who}</td>
                  <td>{inr(r.amount)}</td>
                  <td className="text-mute">{prettyDate(r.issued)}</td>
                  <td>
                    <Pill tone={r.days > 10 ? 'bad' : 'warn'}>{r.days} days</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-mute">Window unpaid total {inr(rev.unpaid)}.</p>
        </Panel>
      </div>

      <Panel title="Trial renewals in the next 30 days" kicker="Monday list">
        {renewals.length === 0 ? (
          <p className="text-sm text-mute">None sit inside 30 days of the window end.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-mute">
              <tr>
                <th className="pb-2">Alcovian</th>
                <th>Advisor</th>
                <th>Renews</th>
                <th>Fee</th>
                <th>Days</th>
              </tr>
            </thead>
            <tbody>
              {renewals.map((r) => (
                <tr key={r.name} className="border-t border-line">
                  <td className="py-2">{r.name}</td>
                  <td className="text-mute">{r.advisor}</td>
                  <td>{prettyDate(r.renewal)}</td>
                  <td>{inr(r.fee)}</td>
                  <td>
                    <Pill tone={r.days <= 14 ? 'warn' : 'plain'}>{r.days} days</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="mt-3 text-xs text-mute">
          n8n opens a ClickUp task at 21 / 14 / 7. It does not message the parent
          until sales says so.
        </p>
      </Panel>
    </div>
  )
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl bg-panel px-3 py-2">
      <div className="text-[10px] font-medium text-mute">{k}</div>
      <div className="text-xl font-semibold tracking-tight text-ink">{v}</div>
    </div>
  )
}
