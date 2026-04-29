import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import SalesReportingSidebar from '@/components/layout/SalesReportingSidebar'

// ─── Types ────────────────────────────────────────────────────────────────────

type Confidence = 'Strong' | 'High' | 'Moderate' | 'Low' | 'Unassessable'
type Trend = 'up' | 'down' | 'neutral'

// ─── Data ─────────────────────────────────────────────────────────────────────

const meetings = [
  { name: 'Adrian Kowalski',   lastMeeting: '13 Mar 2026', count: 4, confidence: 'Moderate'     as Confidence, trend: 'up'      as Trend },
  { name: 'Sarah Brennan',     lastMeeting: '28 Feb 2026', count: 6, confidence: 'High'          as Confidence, trend: 'up'      as Trend },
  { name: 'James Tran',        lastMeeting: '10 Feb 2026', count: 3, confidence: 'Low'           as Confidence, trend: 'down'    as Trend },
  { name: 'Michelle Okafor',   lastMeeting: '3 Feb 2026',  count: 2, confidence: 'Unassessable'  as Confidence, trend: 'neutral' as Trend },
  { name: 'David Carmichael',  lastMeeting: '22 Jan 2026', count: 5, confidence: 'Strong'        as Confidence, trend: 'neutral' as Trend },
  { name: 'Priya Nair',        lastMeeting: '15 Jan 2026', count: 3, confidence: 'Low'           as Confidence, trend: 'down'    as Trend },
  { name: 'Tom Gillespie',     lastMeeting: '8 Jan 2026',  count: 4, confidence: 'Moderate'      as Confidence, trend: 'neutral' as Trend },
]

const objections = [
  { text: 'Onboarding paperwork volume',            advisers: ['A', 'D', 'D', 'M'], count: 5 },
  { text: 'Compliance requirement uncertainty',     advisers: ['A', 'D', 'P'],      count: 4 },
  { text: 'Timeline hesitancy — managed accounts', advisers: ['A', 'D', 'F'],      count: 3 },
  { text: 'Competitor platform trialling',          advisers: ['G', 'M', 'P'],      count: 3 },
  { text: 'Fee transparency concerns',              advisers: ['S', 'D'],            count: 2 },
]

const topicCoverage = [
  { name: 'Managed Accounts',    covered: 6, partial: 1, missed: 0 },
  { name: 'FDS Renewal',         covered: 2, partial: 3, missed: 2 },
  { name: 'Compliance Training', covered: 3, partial: 3, missed: 1 },
  { name: 'Estate Planning',     covered: 1, partial: 2, missed: 4 },
  { name: 'Platform Migration',  covered: 5, partial: 1, missed: 1 },
  { name: 'Q1 Business Plan',    covered: 2, partial: 4, missed: 1 },
]

// Chart data: one dot per week, level 0=Unassessable…4=Strong (fractional ok)
const chartDots: { week: number; level: number; score?: number }[] = [
  { week: 1,  level: 2.1 },
  { week: 2,  level: 2.2 },
  { week: 3,  level: 2.4 },
  { week: 4,  level: 2.2 },
  { week: 5,  level: 2.3 },
  { week: 6,  level: 2.5 },
  { week: 7,  level: 2.4 },
  { week: 8,  level: 2.6 },
  { week: 9,  level: 2.3 },
  { week: 10, level: 2.5 },
  { week: 11, level: 2.6 },
  { week: 12, level: 3.0, score: 58 },
]

// ─── Config ───────────────────────────────────────────────────────────────────

const CONFIDENCE_CFG: Record<Confidence, { bar: string; text: string; width: string }> = {
  Strong:      { bar: '#16a34a', text: '#15803d', width: '100%' },
  High:        { bar: '#4ade80', text: '#16a34a', width: '75%'  },
  Moderate:    { bar: '#fbbf24', text: '#d97706', width: '50%'  },
  Low:         { bar: '#f87171', text: '#ef4444', width: '25%'  },
  Unassessable:{ bar: '#e5e7eb', text: '#9ca3af', width: '10%'  },
}

const AVATAR_COLORS: Record<string, { bg: string; fg: string }> = {
  A: { bg: '#dbeafe', fg: '#2563eb' },
  D: { bg: '#dcfce7', fg: '#16a34a' },
  M: { bg: '#fce7f3', fg: '#db2777' },
  P: { bg: '#fef9c3', fg: '#ca8a04' },
  F: { bg: '#ede9fe', fg: '#7c3aed' },
  G: { bg: '#fee2e2', fg: '#dc2626' },
  S: { bg: '#ffedd5', fg: '#ea580c' },
  J: { bg: '#cffafe', fg: '#0891b2' },
  T: { bg: '#f0fdf4', fg: '#15803d' },
}


// ─── Sub-components ───────────────────────────────────────────────────────────

function TrendArrow({ trend }: { trend: Trend }) {
  if (trend === 'up') return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#dcfce7]">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </span>
  )
  if (trend === 'down') return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#fee2e2]">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </span>
  )
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f3f4f6]">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </span>
  )
}

function ConfidenceBar({ level }: { level: Confidence }) {
  const cfg = CONFIDENCE_CFG[level]
  return (
    <div className="flex items-center gap-2">
      <div className="w-[88px] h-1.5 rounded-full bg-[#f3f4f6] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: cfg.width, background: cfg.bar }} />
      </div>
      <span className="text-[13px] font-medium" style={{ color: cfg.text }}>{level}</span>
    </div>
  )
}

function AvatarPill({ initial }: { initial: string }) {
  const colors = AVATAR_COLORS[initial] ?? { bg: '#f3f4f6', fg: '#6b7280' }
  return (
    <span
      className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
      style={{ background: colors.bg, color: colors.fg }}
    >
      {initial}
    </span>
  )
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[12px] font-medium text-[#16a34a] bg-[#dcfce7] rounded-full px-2 py-0.5">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      {label}
    </span>
  )
}

function KpiCard({
  iconBg,
  icon,
  value,
  label,
  badge,
}: {
  iconBg: string
  icon: React.ReactNode
  value: string
  label: string
  badge: string
}) {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[12px] px-4 py-4 flex flex-col gap-2 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <span className="w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0" style={{ background: iconBg }}>
          {icon}
        </span>
        <Badge label={badge} />
      </div>
      <div>
        <p className="text-[26px] font-bold text-[#0a0a0a] leading-tight">{value}</p>
        <p className="text-[13px] text-[#737373] leading-tight mt-0.5">{label}</p>
      </div>
    </div>
  )
}

function PortfolioChart() {
  const W = 920, H = 250
  const BAR_W = 6
  const padL = 106 + BAR_W + 10   // label text + bar + gap
  const padR  = 52
  const padT  = 22
  const padB  = 48

  const chartH = H - padT - padB
  const chartW = W - padL - padR

  // level: 0 = Unassessable (bottom) … 4 = Strong (top)
  const xPos = (week: number) => padL + ((week - 1) / 11) * chartW
  const yPos = (level: number) => padT + ((4 - level) / 4) * chartH

  const levels    = ['Unassessable', 'Low', 'Moderate', 'High', 'Strong']
  const lblColors = ['#ef4444', '#f97316', '#d97706', '#16a34a', '#15803d']

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block">
      <defs>
        {/* Smooth top-green → white-middle → bottom-red background */}
        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#bbf7d0" stopOpacity="0.55" />
          <stop offset="38%"  stopColor="#dcfce7" stopOpacity="0.18" />
          <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.0"  />
          <stop offset="62%"  stopColor="#fee2e2" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#fca5a5" stopOpacity="0.50" />
        </linearGradient>
        {/* Left bar: green → amber → red */}
        <linearGradient id="leftBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#16a34a" />
          <stop offset="48%"  stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      {/* Smooth gradient background fill */}
      <rect
        x={padL} y={padT}
        width={chartW} height={chartH}
        fill="url(#bgGrad)"
      />

      {/* Dashed horizontal grid lines at each confidence level */}
      {levels.map((_, i) => (
        <line
          key={i}
          x1={padL}          y1={yPos(i)}
          x2={padL + chartW} y2={yPos(i)}
          stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5 7"
        />
      ))}

      {/* Left gradient pill bar */}
      <rect
        x={padL - BAR_W - 9} y={padT}
        width={BAR_W} height={chartH}
        rx="3" fill="url(#leftBar)"
      />

      {/* Y-axis labels */}
      {levels.map((label, i) => (
        <text
          key={label}
          x={padL - BAR_W - 15} y={yPos(i)}
          dominantBaseline="middle" textAnchor="end"
          fontSize="11.5" fontWeight="500"
          fontFamily="Geist, ui-sans-serif, sans-serif"
          fill={lblColors[i]}
        >
          {label}
        </text>
      ))}

      {/* X-axis week labels */}
      {Array.from({ length: 12 }, (_, i) => i + 1).map(w => (
        <text
          key={w}
          x={xPos(w)} y={H - padB + 18}
          textAnchor="middle" fontSize="11"
          fontFamily="Geist, ui-sans-serif, sans-serif"
          fill="#9ca3af"
        >
          W{w}
        </text>
      ))}

      {/* "WEEKS" centred below x-axis */}
      <text
        x={padL + chartW / 2} y={H - 7}
        textAnchor="middle" fontSize="10" fontWeight="600"
        fontFamily="Geist, ui-sans-serif, sans-serif"
        fill="#9ca3af" letterSpacing="2"
      >
        WEEKS
      </text>

      {/* Data dots */}
      {chartDots.map((d, i) => (
        <g key={i}>
          <circle
            cx={xPos(d.week)} cy={yPos(d.level)}
            r={d.score != null ? 10 : 8}
            fill="#16a34a"
          />
          {d.score != null && (
            <text
              x={xPos(d.week) + 16} y={yPos(d.level) - 14}
              fontSize="15" fontWeight="700"
              fontFamily="Geist, ui-sans-serif, sans-serif"
              fill="#16a34a"
            >
              {d.score}
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

type Period = 'Weeks' | 'Months' | 'Quarter' | 'Year'
const PERIODS: Period[] = ['Weeks', 'Months', 'Quarter', 'Year']

export default function SalesReportingPage() {
  const [expandedObjections, setExpandedObjections] = useState<number[]>([])
  const [period, setPeriod] = useState<Period>('Weeks')
  const [periodOpen, setPeriodOpen] = useState(false)

  function toggleObjection(i: number) {
    setExpandedObjections(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  const totalAdvisers = 7

  return (
    <>
      <Navbar
        breadcrumb={[
          { label: 'Dashboard', href: '#' },
          { label: 'Sales Reporting' },
        ]}
      />

      <div className="w-full max-w-[1245px] mx-auto flex items-start">
        <SalesReportingSidebar />

        <main className="flex-1 min-w-0 p-4">
          <div className="bg-white rounded-[10px] pt-[20px] pb-[36px] px-[28px]">

            {/* Page header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-[22px] font-bold text-[#0a0a0a] leading-tight">Sales Reporting</h1>
                <p className="text-[13px] text-[#737373] mt-1">
                  Track meeting performance, sentiment, and action items across your accounts.
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {/* Export PDF */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[13px] font-semibold text-[#404040]">Export Entire Report to PDF</span>
                  <button className="w-10 h-10 rounded-full bg-[#1182e3] flex items-center justify-center hover:bg-blue-600 transition-colors shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M12 18v-6" />
                      <path d="M9 15l3 3 3-3" />
                    </svg>
                  </button>
                </div>
                {/* Period filter */}
                <div className="relative">
                  <button
                    onClick={() => setPeriodOpen(o => !o)}
                    className="flex items-center gap-2 border border-[#e5e5e5] rounded-lg px-3 h-[35px] bg-white hover:bg-gray-50 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-[13px] text-[#404040]">{period}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${periodOpen ? 'rotate-180' : ''}`}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {periodOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setPeriodOpen(false)} />
                      <div className="absolute right-0 top-[calc(100%+4px)] z-20 bg-white border border-[#e5e5e5] rounded-lg shadow-md py-1 min-w-[120px]">
                        {PERIODS.map(p => (
                          <button
                            key={p}
                            onClick={() => { setPeriod(p); setPeriodOpen(false) }}
                            className={`w-full text-left px-4 py-2 text-[13px] transition-colors ${p === period ? 'bg-[#f3f4f6] font-medium text-[#0a0a0a]' : 'text-[#404040] hover:bg-gray-50'}`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              <KpiCard
                iconBg="#dbeafe"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                }
                value="22"
                label="Meetings This Week"
                badge="+15%"
              />
              <KpiCard
                iconBg="#d1fae5"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                }
                value="82%"
                label="Avg Effectiveness"
                badge="+5%"
              />
              <KpiCard
                iconBg="#ede9fe"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                }
                value="18"
                label="Advisers Met"
                badge="+3"
              />
              <KpiCard
                iconBg="#ffedd5"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                }
                value="Moderate"
                label="Avg Portfolio Confidence"
                badge="+8"
              />
            </div>

            {/* Portfolio Confidence Chart */}
            <div className="border border-[#e5e5e5] rounded-[10px] px-5 pt-4 pb-3 mb-6">
              <h3 className="text-[14px] font-semibold text-[#0a0a0a] mb-3">Portfolio Confidence</h3>
              <PortfolioChart />
            </div>

            {/* Recent Meetings */}
            <div className="mb-6">
              <h3 className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-3">
                Recent Meetings
              </h3>
              <div className="border border-[#e5e5e5] rounded-[10px] overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] h-[44px]">
                      <th className="px-4 text-left text-[11px] uppercase tracking-wider whitespace-nowrap">Adviser</th>
                      <th className="px-4 text-left text-[11px] uppercase tracking-wider whitespace-nowrap">Last Meeting</th>
                      <th className="px-4 text-left text-[11px] uppercase tracking-wider whitespace-nowrap">Meetings</th>
                      <th className="px-4 text-left text-[11px] uppercase tracking-wider whitespace-nowrap">Portfolio Confidence</th>
                      <th className="px-4 text-left text-[11px] uppercase tracking-wider whitespace-nowrap">Trend</th>
                      <th className="px-4 text-left text-[11px] uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetings.map((m, i) => (
                      <tr key={i} className="border-b border-[#f3f4f6] last:border-0 h-[46px] hover:bg-gray-50 transition-colors">
                        <td className="px-4 text-[13px] font-medium text-[#0a0a0a] whitespace-nowrap">{m.name}</td>
                        <td className="px-4 text-[13px] text-[#737373] whitespace-nowrap">{m.lastMeeting}</td>
                        <td className="px-4 text-[13px] text-[#404040]">{m.count}</td>
                        <td className="px-4">
                          <ConfidenceBar level={m.confidence} />
                        </td>
                        <td className="px-4">
                          <TrendArrow trend={m.trend} />
                        </td>
                        <td className="px-4">
                          <a href="#" className="text-[13px] text-[#1182e3] hover:underline whitespace-nowrap">
                            View last meeting
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recurring Objections */}
            <div className="mb-6">
              <h3 className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-3">
                Recurring Objections Across Book
              </h3>
              <div className="border border-[#e5e5e5] rounded-[10px] overflow-hidden">
                <p className="text-[13px] text-[#737373] px-5 py-3 border-b border-[#f3f4f6]">
                  Issues that have come up across multiple adviser meetings this period.
                </p>
                {objections.map((obj, i) => (
                  <div key={i} className="border-b border-[#f3f4f6] last:border-0">
                    <button
                      onClick={() => toggleObjection(i)}
                      className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-[13px] font-medium text-[#0a0a0a] text-left">{obj.text}</span>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <div className="flex items-center -space-x-1">
                          {obj.advisers.map((a, j) => (
                            <AvatarPill key={j} initial={a} />
                          ))}
                        </div>
                        <span className="text-[12px] text-[#737373] whitespace-nowrap">{obj.count} advisers</span>
                        <svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className={`transition-transform shrink-0 ${expandedObjections.includes(i) ? 'rotate-180' : ''}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </button>
                    {expandedObjections.includes(i) && (
                      <div className="px-5 pb-4 text-[13px] text-[#737373]">
                        Raised across {obj.count} adviser meetings this period.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Topic Coverage */}
            <div>
              <h3 className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-3">
                Priority Topic Coverage
              </h3>
              <div className="border border-[#e5e5e5] rounded-[10px] px-5 pt-4 pb-5">
                <p className="text-[13px] text-[#737373] mb-5">
                  How consistently priority topics are being communicated across all adviser meetings this period.
                </p>
                <div className="flex flex-col gap-4">
                  {topicCoverage.map((topic, i) => {
                    const coveredPct  = (topic.covered / totalAdvisers) * 100
                    const partialPct  = (topic.partial  / totalAdvisers) * 100
                    const missedPct   = (topic.missed   / totalAdvisers) * 100
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <span className="text-[13px] text-[#404040] w-[150px] shrink-0">{topic.name}</span>
                        <div className="flex-1 flex rounded-full overflow-hidden h-2.5 bg-[#f3f4f6]">
                          {coveredPct > 0 && (
                            <div style={{ width: `${coveredPct}%`, background: '#22c55e' }} />
                          )}
                          {partialPct > 0 && (
                            <div style={{ width: `${partialPct}%`, background: '#fbbf24' }} />
                          )}
                          {missedPct > 0 && (
                            <div style={{ width: `${missedPct}%`, background: '#e5e7eb' }} />
                          )}
                        </div>
                        <span className="text-[12px] text-[#737373] shrink-0 w-[200px] text-right">
                          <span className="text-[#16a34a] font-medium">{topic.covered} covered</span>
                          {' · '}
                          <span className="text-[#d97706] font-medium">{topic.partial} partial</span>
                          {' · '}
                          <span className="text-[#9ca3af]">{topic.missed} missed</span>
                        </span>
                      </div>
                    )
                  })}
                </div>
                {/* Legend */}
                <div className="flex items-center gap-5 mt-6">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
                    <span className="text-[12px] text-[#404040]">Covered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                    <span className="text-[12px] text-[#404040]">Partial</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#e5e7eb]" />
                    <span className="text-[12px] text-[#404040]">Missed</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
