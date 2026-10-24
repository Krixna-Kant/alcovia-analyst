export function inr(n: number, compact = false): string {
  if (compact) {
    if (Math.abs(n) >= 100000) return `₹${(n / 100000).toFixed(1)}L`
    if (Math.abs(n) >= 1000) return `₹${(n / 1000).toFixed(0)}k`
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function pct(n: number, digits = 1): string {
  if (!Number.isFinite(n)) return '—'
  return `${n.toFixed(digits)}%`
}

export function num(n: number, digits = 0): string {
  if (!Number.isFinite(n)) return '—'
  return n.toLocaleString('en-IN', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })
}

export function iso(d: Date): string {
  return d.toISOString().slice(0, 10)
}

export function prettyDate(isoDate: string): string {
  const [y, m, day] = isoDate.split('-').map(Number)
  return new Date(y, m - 1, day).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function daysBetween(from: string, to: string): number {
  const a = new Date(from + 'T00:00:00')
  const b = new Date(to + 'T00:00:00')
  return Math.round((b.getTime() - a.getTime()) / 86400000)
}
