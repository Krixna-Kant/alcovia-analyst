import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AS_OF } from '../data/seed'
import { prettyDate } from '../lib/format'
import { PRESETS, useRange } from '../range'

const links = [
  { to: '/', label: 'Command' },
  { to: '/gtm', label: 'GTM & revenue' },
  { to: '/campaigns', label: 'Campaign RCA' },
  { to: '/students', label: 'Alcovians' },
  { to: '/adoption', label: 'Adoption' },
]

const titles: Record<string, string> = {
  '/': 'Command',
  '/gtm': 'GTM & revenue',
  '/campaigns': 'Campaign RCA',
  '/students': 'Alcovians',
  '/adoption': 'Adoption',
}

export function Shell() {
  const { preset, setPreset, range } = useRange()
  const q = `?w=${preset}`
  const { pathname } = useLocation()
  const title = titles[pathname] ?? 'Command'

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-[1360px] px-4 py-8 md:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-sm font-bold text-white">
              A
            </span>
            <div>
              <div className="text-[1.35rem] font-semibold text-ink">Welcome, Alcovia</div>
              <div className="text-sm text-mute">
                {title} · {prettyDate(range.from)} – {prettyDate(range.to)}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 rounded-full bg-card px-2 py-1.5 shadow-[0_8px_24px_rgba(28,36,52,0.04)]">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPreset(p.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
                  preset === p.id
                    ? 'bg-gold text-white'
                    : 'text-mute hover:bg-panel hover:text-ink'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <nav className="mb-8 flex flex-wrap gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={`${l.to}${q}`}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-card text-ink shadow-[0_8px_20px_rgba(28,36,52,0.06)]'
                    : 'text-mute hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Outlet />

        <footer className="mt-12 text-xs text-mute">
          Dummy numbers as of {prettyDate(AS_OF)}. ClickUp stays the place people type.
          Wearable cells stay empty unless a device is connected.
        </footer>
      </div>
    </div>
  )
}
