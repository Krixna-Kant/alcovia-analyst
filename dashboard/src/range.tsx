import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AS_OF } from './data/seed'
import type { Range } from './data/metrics'

type Preset = { id: string; label: string; range: Range }

function addDays(isoDate: string, n: number): string {
  const d = new Date(isoDate + 'T00:00:00')
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

export const PRESETS: Preset[] = [
  { id: '7d', label: '7 days', range: { from: addDays(AS_OF, -6), to: AS_OF } },
  { id: '14d', label: '14 days', range: { from: addDays(AS_OF, -13), to: AS_OF } },
  { id: '30d', label: '30 days', range: { from: addDays(AS_OF, -29), to: AS_OF } },
  { id: '45d', label: '45 days', range: { from: addDays(AS_OF, -44), to: AS_OF } },
  { id: 'oct', label: 'October', range: { from: '2026-10-01', to: AS_OF } },
  { id: 'sep', label: 'September', range: { from: '2026-09-01', to: '2026-09-30' } },
  { id: 'q', label: 'Aug–Oct', range: { from: '2026-08-01', to: AS_OF } },
]

const RangeCtx = createContext<{
  range: Range
  preset: string
  setPreset: (id: string) => void
} | null>(null)

export function RangeProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useSearchParams()
  const preset = PRESETS.some((p) => p.id === params.get('w')) ? (params.get('w') as string) : '45d'
  const setPreset = (id: string) => {
    const next = new URLSearchParams(params)
    next.set('w', id)
    setParams(next, { replace: true })
  }
  const range = useMemo(
    () => PRESETS.find((p) => p.id === preset)?.range ?? PRESETS[3].range,
    [preset],
  )
  return (
    <RangeCtx.Provider value={{ range, preset, setPreset }}>
      {children}
    </RangeCtx.Provider>
  )
}

export function useRange() {
  const ctx = useContext(RangeCtx)
  if (!ctx) throw new Error('useRange')
  return ctx
}
