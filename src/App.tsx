import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import SalesReportingPage from './pages/SalesReportingPage'
import AssessmentDetailPage from './pages/AssessmentDetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/sales-reporting" element={<SalesReportingPage />} />
      <Route path="/assessment/:id" element={<AssessmentDetailPage />} />
    </Routes>
  )
}
