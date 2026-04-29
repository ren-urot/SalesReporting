import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import SalesReportingSidebar from '@/components/layout/SalesReportingSidebar'

type IconType = 'person-edit' | 'doc-check' | 'doc-play' | 'doc-edit'

type Activity = {
  iconType: IconType
  title: string
  code?: string
  tags?: string[]
  href?: string
}

const activities: Activity[] = [
  { iconType: 'person-edit', title: 'Conference on Modern Financial Advice', code: 'WTGQ-0001-05082025', tags: ['Meeting Automation', 'MCQ'], href: '/assessment/conference-on-modern-financial-advice' },
  { iconType: 'person-edit', title: 'PDR Meeting Transcript Review',     code: 'WTGQ-0001-05082025', tags: ['Meeting Automation', 'Certificate'] },
  { iconType: 'person-edit', title: 'Presentation Review',               code: 'WTGQ-0001-05082025', tags: ['Meeting Automation', 'Publish Quiz'] },
  { iconType: 'doc-check',   title: 'Meeting Transcript & Key Insights', code: 'WTGQ-0001-05082025', tags: ['Transcript', 'MCQ'] },
  { iconType: 'doc-play',    title: 'PDR Meeting Transcript Review',     code: 'WTGQ-0001-05082025', tags: ['Presentation', 'Certificate'] },
  { iconType: 'doc-edit',    title: 'Presentation Review',               code: 'WTGQ-0001-05082025', tags: ['Written Materials', 'Publish Quiz'] },
  { iconType: 'doc-check',   title: 'Meeting Transcript & Key Insights', code: 'WTGQ-0001-05082025', tags: ['Transcript', 'MCQ'] },
  { iconType: 'doc-play',    title: 'PDR Meeting Transcript Review',     code: 'WTGQ-0001-05082025', tags: ['Presentation', 'Certificate'] },
  { iconType: 'doc-edit',    title: 'Presentation Review',               code: 'WTGQ-0001-05082025', tags: ['Written Materials', 'Publish Quiz'] },
]

function ActivityIcon({ type }: { type: IconType }) {
  if (type === 'person-edit') return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M17 3l2 2-4 4-2-2 4-4z" strokeWidth="1.4" />
    </svg>
  )
  if (type === 'doc-check') return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <polyline points="9 13 11 15 15 11" />
    </svg>
  )
  if (type === 'doc-play') return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <polygon points="10 12 16 15.5 10 19" fill="white" stroke="none" />
    </svg>
  )
  // doc-edit
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M11 15l-1 1 1 .3.3-1L11 15zm2-2l-2 2" strokeWidth="1.4" />
      <path d="M13 13l1.5-1.5a1 1 0 011.4 1.4L14.4 14.4" strokeWidth="1.4" />
    </svg>
  )
}

function ActivityCard({ activity }: { activity: Activity }) {
  const [checked, setChecked] = useState(false)

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[16px] overflow-hidden flex flex-col">
      {/* Blue icon area */}
      <div className="bg-[#bfdbfe] flex items-center justify-center" style={{ height: 160 }}>
        <div className="w-[72px] h-[72px] rounded-full bg-[#2563eb] flex items-center justify-center">
          <ActivityIcon type={activity.iconType} />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 pb-4 flex flex-col gap-2 flex-1">
        <p className="text-[15px] font-bold text-[#0a0a0a] leading-snug">{activity.title}</p>

        {activity.code && <p className="text-[12px] text-[#9ca3af]">{activity.code}</p>}
        <div className="flex flex-wrap gap-1.5">
          {activity.tags?.map(tag => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#dbeafe] text-[#1d4ed8]">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3">
          {activity.href ? (
            <Link to={activity.href} className="px-4 py-2 bg-[#0f0f0f] text-white text-[13px] font-medium rounded-lg hover:bg-[#262626] transition-colors">
              View Details
            </Link>
          ) : (
            <button className="px-4 py-2 bg-[#0f0f0f] text-white text-[13px] font-medium rounded-lg hover:bg-[#262626] transition-colors">
              View Details
            </button>
          )}
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(c => !c)}
            className="w-4 h-4 cursor-pointer accent-[#2563eb]"
          />
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <>
      <Navbar breadcrumb={[{ label: 'Dashboard' }]} />

      <div className="w-full max-w-[1245px] mx-auto flex items-start">
        <SalesReportingSidebar />

        <main className="flex-1 min-w-0 p-4">
          <div className="bg-white rounded-[10px] pt-[20px] pb-[36px] px-[28px]">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-[18px] font-semibold text-[#0a0a0a]">Activities</h1>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-[#9ca3af]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-[#9ca3af]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-4">
              {activities.map((a, i) => (
                <ActivityCard key={i} activity={a} />
              ))}
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
