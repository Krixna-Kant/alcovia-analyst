import { Navigate, Route, Routes } from 'react-router-dom'
import { Shell } from './components/Shell'
import { Adoption } from './pages/Adoption'
import { Campaigns } from './pages/Campaigns'
import { Command } from './pages/Command'
import { Gtm } from './pages/Gtm'
import { Students } from './pages/Students'
import { RangeProvider } from './range'

export default function App() {
  return (
    <RangeProvider>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Command />} />
          <Route path="gtm" element={<Gtm />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="students" element={<Students />} />
          <Route path="adoption" element={<Adoption />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </RangeProvider>
  )
}
