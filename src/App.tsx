import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const DashboardPage       = lazy(() => import('./pages/DashboardPage'))
const SalesReportingPage  = lazy(() => import('./pages/SalesReportingPage'))
const AssessmentDetailPage = lazy(() => import('./pages/AssessmentDetailPage'))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f5]" />}>
      <Routes>
        <Route path="/"               element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard"      element={<DashboardPage />} />
        <Route path="/sales-reporting" element={<SalesReportingPage />} />
        <Route path="/assessment/:id" element={<AssessmentDetailPage />} />
      </Routes>
    </Suspense>
  )
}
