import {
  APP_AVG_MINUTES,
  AS_OF,
  CPQL_TARGET,
  alcovians,
  campaigns,
  creatives,
  funnelByMonth,
  homeCards,
  landings,
  monthlyRevenue,
  programEvents,
  studentOps,
  type Campaign,
  type Creative,
  type FunnelMonth,
  type MonthRev,
} from './seed'

export type Range = { from: string; to: string }

function inRange(day: string, r: Range): boolean {
  return day >= r.from && day <= r.to
}

function overlapMonth(month: string, r: Range): boolean {
  const end = month.slice(0, 8) + '28'
  return month <= r.to && end >= r.from
}

export function monthsIn(r: Range): MonthRev[] {
  return monthlyRevenue.filter((m) => overlapMonth(m.month, r))
}

export function funnelIn(r: Range): FunnelMonth[] {
  return funnelByMonth.filter((m) => overlapMonth(m.month, r))
}

export function funnelRollup(r: Range) {
  const rows = funnelIn(r)
  const sum = (fn: (x: FunnelMonth) => number) => rows.reduce((a, x) => a + fn(x), 0)
  const leads = sum((x) => x.leads)
  const qualified = sum((x) => x.qualified)
  const enrolled = sum((x) => x.enrolled)
  const discoverySet = sum((x) => x.discoverySet)
  const discoveryDone = sum((x) => x.discoveryDone)
  const spend = sum((x) => x.spend)
  return {
    leads,
    organic: sum((x) => x.organic),
    qualified,
    discoverySet,
    discoveryDone,
    ambitionDone: sum((x) => x.ambitionDone),
    architectDone: sum((x) => x.architectDone),
    enrolled,
    dropped: sum((x) => x.dropped),
    spend,
    showUp: discoverySet ? (100 * discoveryDone) / discoverySet : 0,
    conversion: qualified ? (100 * enrolled) / qualified : 0,
    cpql: qualified ? spend / qualified : 0,
    avgJourney:
      rows.length === 0
        ? 0
        : rows.reduce((a, x) => a + x.avgJourneyDays * x.leads, 0) / Math.max(leads, 1),
  }
}

export function revenueRollup(r: Range) {
  const rows = monthsIn(r)
  const trial = rows.reduce((a, x) => a + x.trial, 0)
  const full = rows.reduce((a, x) => a + x.full, 0)
  const workshop = rows.reduce((a, x) => a + x.workshop, 0)
  const target = rows.reduce((a, x) => a + x.target, 0)
  const unpaid = rows.reduce((a, x) => a + x.unpaid, 0)
  const onboarded = rows.reduce((a, x) => a + x.onboarded, 0)
  const seats = rows.reduce((a, x) => a + x.workshopSeats, 0)
  const total = trial + full + workshop
  return { trial, full, workshop, target, unpaid, onboarded, seats, total, vs: target ? (100 * total) / target : 0 }
}

function scaleForRange(r: Range): number {
  // Dummy set is Aug–Oct. A shorter window should not show the full quarter.
  const from = new Date(r.from + 'T00:00:00').getTime()
  const to = new Date(r.to + 'T00:00:00').getTime()
  const days = Math.max(1, Math.round((to - from) / 86400000) + 1)
  return Math.min(1, days / 83)
}

export function campaignRows(r: Range) {
  const s = scaleForRange(r)
  return campaigns.map((c) => decorateCampaign({ ...c, spend: Math.round(c.spend * s), qualified: Math.max(1, Math.round(c.qualified * s)), enrolled: Math.round(c.enrolled * s), impressions: Math.round(c.impressions * s), clicks: Math.round(c.clicks * s) }))
}

export function decorateCampaign(c: Campaign) {
  const ctr = c.impressions ? (100 * c.clicks) / c.impressions : 0
  const cpql = c.qualified ? c.spend / c.qualified : Infinity
  let action: 'scale' | 'refresh' | 'drop' | 'hold' = 'hold'
  if (c.frequency >= 3) action = 'refresh'
  else if (c.enrolled === 0 && cpql > CPQL_TARGET * 1.5) action = 'drop'
  else if (cpql <= CPQL_TARGET && c.enrolled > 0) action = 'scale'
  return { ...c, ctr, cpql, action }
}

export function creativeRows(r: Range) {
  const s = scaleForRange(r)
  return creatives.map((c) => {
    const impressions = Math.round(c.impressions * s)
    const clicks = Math.round(c.clicks * s)
    const ctr = impressions ? (100 * clicks) / impressions : 0
    let action = 'watch'
    if (c.frequency >= 3 && ctr < 1) action = 'reshoot'
    else if (c.frequency >= 3) action = 'refresh copy'
    else if (ctr >= 1.5) action = 'keep'
    return { ...c, impressions, clicks, spend: Math.round(c.spend * s), ctr, action }
  }) as Array<Creative & { ctr: number; action: string }>
}

export function landingRows(r: Range) {
  const s = scaleForRange(r)
  return landings.map((l) => {
    const visits = Math.round(l.visits * s)
    const bounces = Math.round(l.bounces * s)
    const drop = visits ? (100 * bounces) / visits : 0
    let health: 'ok' | 'leaky' | 'slow' = 'ok'
    if (l.loadMs > 3000) health = 'slow'
    else if (drop > 65) health = 'leaky'
    return { ...l, visits, bounces, drop, health }
  })
}

export function eventsIn(r: Range) {
  return programEvents.filter((e) => inRange(e.on, r))
}

export function programKpis(r: Range) {
  const ev = eventsIn(r)
  const kinds = [...new Set(ev.map((e) => e.kind))]
  return kinds.map((kind) => {
    const rows = ev.filter((e) => e.kind === kind)
    const conducted = rows.filter((e) => e.conducted).length
    const invited = rows.reduce((a, e) => a + e.invited, 0)
    const attended = rows.reduce((a, e) => a + e.attended, 0)
    const rated = rows.filter((e) => e.rating != null)
    const rating = rated.length ? rated.reduce((a, e) => a + (e.rating || 0), 0) / rated.length : null
    return {
      kind,
      scheduled: rows.length,
      conducted,
      conductedPct: rows.length ? (100 * conducted) / rows.length : 0,
      attendPct: invited ? (100 * attended) / invited : 0,
      rating,
    }
  })
}

export function cohortPulse(r: Range) {
  const quietCut = addDays(r.to, -14)
  const used = alcovians.filter((a) => a.lastOpen >= r.from && a.lastOpen <= r.to)
  const quiet = alcovians.filter((a) => a.lastOpen < quietCut)
  const thisWeekCut = addDays(r.to, -7)
  const thisWeek = alcovians.filter((a) => a.lastOpen >= thisWeekCut && a.lastOpen <= r.to)
  return {
    used: used.length,
    thisWeek: thisWeek.length,
    quiet: quiet.length,
    realm: alcovians.filter((a) => a.realm && a.lastOpen >= thisWeekCut).length,
    focusRegular: alcovians.filter((a) => a.focusRegular).length,
    focusOpened: alcovians.filter((a) => a.focusOpened).length,
    whoop: alcovians.filter((a) => a.whoop).length,
    avgMinutes: APP_AVG_MINUTES,
    rangeDays: days(r) + 1,
  }
}

export function renewalsIn(r: Range) {
  const horizon = addDays(r.to, 30)
  return alcovians
    .filter((a) => a.plan === 'trial_3m' && a.renewal && a.renewal >= r.to && a.renewal <= horizon)
    .map((a) => ({
      name: a.name,
      renewal: a.renewal as string,
      fee: a.monthlyFee,
      days: daysBetween(r.to, a.renewal as string),
      advisor: a.advisor,
    }))
    .sort((a, b) => a.days - b.days)
}

export function studentTable() {
  return alcovians.map((a) => ({
    ...a,
    ops: studentOps[a.id],
    quiet: a.lastOpen < addDays(AS_OF, -14),
  }))
}

export function cardTaps() {
  return homeCards
    .map((c) => ({ ...c, tapPct: c.shown ? (100 * c.tapped) / c.shown : 0 }))
    .sort((a, b) => a.tapPct - b.tapPct)
}

function addDays(isoDate: string, n: number): string {
  const d = new Date(isoDate + 'T00:00:00')
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

function days(r: Range): number {
  return daysBetween(r.from, r.to)
}

function daysBetween(from: string, to: string): number {
  const a = new Date(from + 'T00:00:00').getTime()
  const b = new Date(to + 'T00:00:00').getTime()
  return Math.round((b - a) / 86400000)
}

export { CPQL_TARGET }
