import type { ReactNode } from 'react'

const wash = {
  plain: 'bg-card',
  ok: 'bg-[linear-gradient(160deg,#c8f6ee_0%,#c4e4ff_100%)]',
  warn: 'bg-[linear-gradient(160deg,#ffd4c4_0%,#ffc2dc_100%)]',
  bad: 'bg-[linear-gradient(160deg,#e4d6ff_0%,#d0e2ff_100%)]',
  gold: 'bg-[linear-gradient(160deg,#c8deff_0%,#b4eeff_100%)]',
}

export function Kpi({
  label,
  value,
  hint,
  tone = 'plain',
}: {
  label: string
  value: string
  hint?: string
  tone?: 'plain' | 'ok' | 'warn' | 'bad' | 'gold'
}) {
  return (
    <div className={`rounded-[28px] px-6 py-6 shadow-[0_12px_32px_rgba(21,27,40,0.04)] ${wash[tone]}`}>
      <div className="text-[12px] font-medium text-mute">{label}</div>
      <div className="mt-4 text-[2.4rem] font-semibold leading-none tracking-tight text-ink">{value}</div>
      {hint ? <div className="mt-3 text-xs leading-relaxed text-mute">{hint}</div> : null}
    </div>
  )
}

export function Panel({
  title,
  kicker,
  children,
  className = '',
}: {
  title: string
  kicker?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`rounded-[28px] bg-card p-6 shadow-[0_12px_32px_rgba(21,27,40,0.04)] ${className}`}>
      <header className="mb-5">
        {kicker ? <div className="text-[11px] font-medium text-gold">{kicker}</div> : null}
        <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
      </header>
      <div>{children}</div>
    </section>
  )
}

export function Pill({
  children,
  tone = 'plain',
}: {
  children: ReactNode
  tone?: 'plain' | 'ok' | 'warn' | 'bad' | 'gold'
}) {
  const cls = {
    plain: 'bg-panel text-mute',
    ok: 'bg-[#ecfdf8] text-[#0f766e]',
    warn: 'bg-gold/10 text-gold-2',
    bad: 'bg-[#eef2ff] text-[#4f46e5]',
    gold: 'bg-gold/10 text-gold-2',
  }[tone]
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${cls}`}>
      {children}
    </span>
  )
}
