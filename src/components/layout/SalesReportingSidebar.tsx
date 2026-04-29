import { Link, useLocation } from 'react-router-dom'

export default function SalesReportingSidebar() {
  const { pathname } = useLocation()
  const isDashboard      = pathname === '/dashboard' || pathname === '/'
  const isSalesReporting = pathname === '/sales-reporting'

  return (
    <aside className="sticky top-[52px] h-[calc(100vh-52px)] overflow-y-auto w-[280px] shrink-0 bg-[#f5f5f5] flex flex-col gap-2.5 p-3">
      {/* User profile card */}
      <div className="bg-white rounded-[10px] px-3 py-1.5">
        <div className="flex items-center gap-2 p-2 rounded-md">
          <div className="w-8 h-8 rounded-full bg-[#d1d5db] flex items-center justify-center shrink-0">
            <svg width="18" height="18" fill="none" stroke="#6b7280" strokeWidth="1.8" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[16px] font-semibold text-[#404040] leading-7 truncate">Jack Black</span>
            <span className="text-[12px] font-light text-[#404040] leading-4 truncate">Provider User ID#2345</span>
          </div>
        </div>
      </div>

      {/* Profile section */}
      <div className="bg-white rounded-[10px] p-2">
        <div className="px-2 h-8 flex items-center opacity-70">
          <span className="text-[12px] font-medium text-[#404040] uppercase tracking-wider">Profile</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <Link to="#" className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <svg width="16" height="16" fill="none" stroke="#404040" strokeWidth="1.8" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            <span className="text-[14px] text-[#404040]">Account</span>
          </Link>
          <Link to="#" className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <svg width="16" height="16" fill="none" stroke="#404040" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0121 9.414V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-[14px] text-[#404040]">Reporting</span>
          </Link>
          <Link to="#" className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <svg width="14" height="14" fill="none" stroke="#404040" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4-4-4M21 12H9M13 5v-1a3 3 0 00-3-3H6a3 3 0 00-3 3v14a3 3 0 003 3h4a3 3 0 003-3v-1" />
            </svg>
            <span className="text-[14px] text-[#404040]">Sign Out</span>
          </Link>
        </div>
      </div>

      {/* Dashboard */}
      <div className="bg-white rounded-[10px] p-2">
        <Link
          to="/dashboard"
          className={`flex items-center gap-2 px-2 py-2 rounded-lg transition-colors ${isDashboard ? 'hover:bg-gray-50' : 'hover:bg-gray-50'}`}
        >
          <svg width="16" height="16" fill="none" stroke={isDashboard ? '#1182e3' : '#404040'} strokeWidth="1.8" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          <span className={`text-[14px] ${isDashboard ? 'font-semibold text-[#1182e3]' : 'text-[#404040]'}`}>Dashboard</span>
        </Link>
      </div>

      {/* Upload */}
      <div className="bg-white rounded-[10px] p-2">
        <Link to="#" className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <svg width="16" height="16" fill="none" stroke="#404040" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3-3 3M12 10v12" />
          </svg>
          <span className="text-[14px] text-[#404040]">Upload</span>
        </Link>
      </div>

      {/* Sales Reporting */}
      <div className="bg-white rounded-[10px] p-2">
        <Link
          to="/sales-reporting"
          className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke={isSalesReporting ? '#1182e3' : '#404040'} strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          <span className={`text-[14px] ${isSalesReporting ? 'font-semibold text-[#1182e3]' : 'text-[#404040]'}`}>Sales Reporting</span>
        </Link>
      </div>

      {/* AFSL Reporting */}
      <div className="bg-white rounded-[10px] p-2">
        <span className="flex items-center gap-2 px-2 py-2 rounded-lg cursor-not-allowed">
          <svg width="16" height="16" fill="none" stroke="#404040" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0121 9.414V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-[14px] text-[#404040]">AFSL Reporting</span>
        </span>
      </div>
    </aside>
  )
}
