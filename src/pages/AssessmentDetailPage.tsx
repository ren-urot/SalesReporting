import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import SalesReportingSidebar from '@/components/layout/SalesReportingSidebar'

const recipients = [
  { name: 'Albert Thomas', email: 'albert.thomas@gmail.com', status: 'Sent Successfully' },
  { name: 'Jonathan Smith', email: 'jonathan.smith@gmail.com', status: 'Failed' },
  { name: 'Christine Marks', email: 'christine.marks@gmail.com', status: 'Sent Successfully' },
  { name: 'Jesse Jackson', email: 'jesse.jackson@gmail.com', status: 'Sent Successfully' },
  { name: 'Susan Mann', email: 'susan.mann@gmail.com', status: 'Failed' },
  { name: 'Martin Smith', email: 'martin.smith@gmail.com', status: 'Failed' },
]

const cpdStandardCards = [
  {
    question: 'Does it enhance financial advising skills?',
    reference: 'Corps Determination 2018 cl 7(1)(e)',
    description: 'The content aims to enhance skills in implementing AI systematically within financial practices, improving efficiency and client service.',
  },
  {
    question: 'Is the education related to financial advice?',
    reference: 'Corps Determination 2018 cl 7(1)(c)',
    description: 'The content discusses practical applications of AI in financial planning, which is directly related to financial advice and client service.',
  },
  {
    question: 'Is there sufficient intellectual/practical content?',
    reference: 'Corps Determination 2018 cl 7(1)(b)',
    description: 'The presentation provides intellectual content on AI applications, frameworks, and strategies for financial planning businesses.',
  },
  {
    question: 'Does it fall within legislated CPD areas?',
    reference: 'Corps Determination 2018 cl 7(1)(a)',
    description: 'The session covers topics relevant to financial planning practices, including compliance and client communication, which fall under legislated CPD areas.',
  },
  {
    question: 'Is it conducted by a qualified expert?',
    reference: 'Corps Determination 2018 cl 7(1)(d)',
    description: 'Dean Holmes has been a Co-Founder and Director at Absolute Wealth Advisers since 2008, providing him with over 15 years of professional work experience in financial services.',
  },
  {
    question: 'Check accuracy & compliance with regulations',
    reference: 'Industry Adopted Criteria',
    description: 'The information presented is accurate and complies with industry standards for financial planning and AI implementation.',
  },
  {
    question: 'Ensure the content is educational, not promotional',
    reference: 'Industry Adopted Criteria',
    description: 'The presentation provides intellectual content on AI applications, frameworks, and strategies for financial planning businesses.',
  },
  {
    question: 'Validate presence of clear learning outcomes',
    reference: 'Industry Adopted Criteria',
    description: 'The session covers topics relevant to financial planning practices, including compliance and client communication, which fall under legislated CPD areas.',
  },
]

type CategoryCard = {
  name: string
  value: string
  description?: string
}

const categoryCards: CategoryCard[] = [
  { name: 'General', value: '-' },
  { name: 'Regulatory Compliance and Consumer Protection', value: '-' },
  {
    name: 'Technical Competence',
    value: '0.75',
    description: 'Discusses AI applications in financial planning, including client communication and operational efficiency, enhancing technical skills in practice management.',
  },
  { name: 'Professionalism and Ethics', value: '-' },
  {
    name: 'Client Care and Practice',
    value: '0.25',
    description: 'Covers how AI can improve client service through better communication and personalized advice, directly impacting client care practices.',
  },
  { name: 'Tax (Financial) Advice', value: '-' },
]

type SpecificItem = { label: string; value: string }

const specificRows: SpecificItem[][] = [
  [
    { label: 'Super', value: '-' },
    { label: 'Derivatives', value: '-' },
    { label: 'Financial planning', value: '0.25' },
    { label: 'Aged care', value: '-' },
  ],
  [
    { label: 'Retirement income streams', value: '-' },
    { label: 'Self Managed Super Funds', value: '-' },
    { label: 'Retirement', value: '0.25' },
    { label: 'Skills', value: '-' },
  ],
  [
    { label: 'Securities', value: '-' },
    { label: 'Social Security', value: '-' },
    { label: 'Compliance', value: '0.50' },
    { label: 'Retirement', value: '0.25' },
  ],
  [
    { label: 'Estate planning', value: '-' },
    { label: 'Taxation', value: '-' },
    { label: 'General knowledge', value: '0.25' },
    { label: 'Responsible Manager', value: '-' },
  ],
  [
    { label: 'Life Insurance', value: '-' },
    { label: 'Fixed Interest', value: '-' },
    { label: 'Margin lending', value: '-' },
    { label: 'Practice management', value: '-' },
  ],
]

function ValueBadge({ value }: { value: string }) {
  const isNumber = value !== '-'
  return (
    <span
      className={`rounded-lg px-3 py-1.5 text-[14px] font-semibold min-w-[48px] text-center inline-block ${
        isNumber
          ? 'bg-[#dcfce7] text-[#16a34a]'
          : 'bg-[#f3f4f6] text-[#737373]'
      }`}
    >
      {value}
    </span>
  )
}

function SmallValueBadge({ value }: { value: string }) {
  const isNumber = value !== '-'
  return (
    <span
      className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold min-w-[48px] text-center inline-block ${
        isNumber
          ? 'bg-[#dcfce7] text-[#16a34a]'
          : 'bg-[#f3f4f6] text-[#737373]'
      }`}
    >
      {value}
    </span>
  )
}

function FileDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18v-6" />
      <path d="M9 15l3 3 3-3" />
    </svg>
  )
}

function DownloadIcon({ color = 'white' }: { color?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  )
}

function BlueCircleButton({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-10 h-10 rounded-full bg-[#1182e3] flex items-center justify-center shrink-0 hover:bg-blue-600 transition-colors">
      <FileDownIcon />
    </button>
  )
}

function MailIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1182e3"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export default function AssessmentDetailPage() {
  const [activeTab, setActiveTab] = useState<'cpd' | 'sales'>('cpd')
  const [expert1Open, setExpert1Open] = useState(true)
  const [expert2Open, setExpert2Open] = useState(false)

  return (
    <>
      <Navbar
        breadcrumb={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Activities', href: '/dashboard' },
          { label: 'Conference on Modern Financial Advice' },
        ]}
      />
      <div className="w-full max-w-[1245px] mx-auto flex items-start">
        <SalesReportingSidebar />
        <main className="flex-1 min-w-0 p-4 flex flex-col gap-4">

          {/* 1. Tabs */}
          <div className="flex items-center bg-[#ebebeb] rounded-[10px] p-[5px] self-start gap-[2px]" data-print-hide>
            <button
              onClick={() => setActiveTab('cpd')}
              className={
                activeTab === 'cpd'
                  ? 'bg-white border border-[#e0e0e0] rounded-[8px] px-5 py-[9px] text-[14px] font-medium text-[#0a0a0a]'
                  : 'px-5 py-[9px] text-[14px] text-[#737373] hover:text-[#404040] transition-colors'
              }
            >
              CPD Reporting
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={
                activeTab === 'sales'
                  ? 'bg-white border border-[#e0e0e0] rounded-[8px] px-5 py-[9px] text-[14px] font-medium text-[#0a0a0a]'
                  : 'px-5 py-[9px] text-[14px] text-[#737373] hover:text-[#404040] transition-colors'
              }
            >
              Sales Reporting
            </button>
          </div>

          {/* 2. Header Card */}
          <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-7 py-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[20px] font-bold text-[#0a0a0a]">
                  Conference on Modern Financial Advice
                </h1>
                <a
                  href="#"
                  className="text-[14px] text-[#1182e3] font-medium hover:underline mt-1 inline-block"
                >
                  Meeting Automation - Certificate
                </a>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-6" data-print-hide>
                <span className="text-[13px] font-semibold text-[#404040]">
                  Export Entire Report to PDF
                </span>
                <BlueCircleButton onClick={() => window.print()} />
              </div>
            </div>

            <div className="border-t border-[#e5e5e5] my-4" />

            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-[12px] text-[#9ca3af]">Assessment Number</p>
                <p className="text-[14px] font-semibold text-[#1182e3]">ENSO-25111803-58180001</p>
              </div>
              <div>
                <p className="text-[12px] text-[#9ca3af]">Total CPD Points</p>
                <p className="text-[14px] font-semibold text-[#1182e3]">2</p>
              </div>
              <div>
                <p className="text-[12px] text-[#9ca3af]">Assessment Date</p>
                <p className="text-[14px] font-semibold text-[#1182e3]">18 November 2025</p>
              </div>
              <div>
                <p className="text-[12px] text-[#9ca3af]">Activity Date</p>
                <p className="text-[14px] font-semibold text-[#1182e3]">18 November 2025</p>
              </div>
            </div>
          </div>

          {/* Sales Reporting Tab Content */}
          {activeTab === 'sales' && (
            <>
              {/* Meeting Snapshot */}
              <div>
                <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-2">Meeting Snapshot</p>
                <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5 flex flex-col gap-5">
                  <div>
                    <p className="text-[11px] font-semibold text-[#1182e3] uppercase tracking-wider mb-2">Summary</p>
                    <p className="text-[14px] text-[#404040] leading-relaxed">
                      Meeting focused on reviewing Adrian's current platform usage and upcoming compliance obligations. Adrian raised concerns about the volume of paperwork in the new onboarding flow. Clayton introduced the upcoming managed account solution and noted positive initial interest. Key unresolved item is the compliance training question which needs follow-up.
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#1182e3] uppercase tracking-wider mb-2">Remember for Next Time</p>
                    <ul className="flex flex-col gap-2">
                      {[
                        "Adrian's daughter just started university — he mentioned it in passing.",
                        "He's looking to move offices mid-year, around June.",
                        "Prefers email over phone — said he rarely picks up unknown numbers.",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[14px] text-[#404040]">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#404040] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Account Health */}
              <div>
                <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-2">Account Health</p>
                <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5 flex flex-col gap-5">
                  {/* Probing Quality */}
                  <div>
                    <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-3">Probing Quality</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {[
                        { label: '✓ Pipeline health', color: 'green' },
                        { label: '✓ New client flow', color: 'green' },
                        { label: '~ Competitor platform use', color: 'amber' },
                        { label: '— Business slowdown signals', color: 'gray' },
                        { label: '~ FUM allocation intent', color: 'amber' },
                      ].map((pill) => (
                        <span key={pill.label} className={`px-3 py-1.5 rounded-full text-[13px] font-medium border ${
                          pill.color === 'green' ? 'border-[#16a34a] text-[#16a34a]' :
                          pill.color === 'amber' ? 'border-[#d97706] text-[#d97706]' :
                          'border-[#9ca3af] text-[#9ca3af]'
                        }`}>{pill.label}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-[#9ca3af]">
                      <span>✓ Probed</span>
                      <span>·</span>
                      <span>~ Partially explored</span>
                      <span>·</span>
                      <span>— Not asked</span>
                    </div>
                  </div>

                  <div className="border-t border-[#e5e5e5]" />

                  {/* FUM Commitment Confidence */}
                  <div>
                    <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-2">FUM Commitment Confidence</p>
                    <p className="text-[13px] text-[#737373] mb-4">AI-estimated likelihood this adviser will meet expected platform flows this period</p>
                    <div className="relative h-3 rounded-full" style={{ background: 'linear-gradient(to right, #ef4444, #f59e0b, #eab308, #22c55e)' }}>
                      <div className="absolute top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#0a0a0a] rounded-full" style={{ left: 'calc(58% - 1.5px)' }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-[#9ca3af] mt-1.5">
                      <span>Unassessable</span>
                      <span>Low</span>
                      <span>Moderate</span>
                      <span>High</span>
                      <span>Strong</span>
                    </div>
                    <p className="text-right mt-2">
                      <span className="text-[15px] font-semibold text-[#d97706]">Moderate</span>
                      <span className="text-[14px] text-[#9ca3af] ml-2">58 / 100</span>
                    </p>
                  </div>

                  <div className="border-t border-[#e5e5e5]" />

                  {/* Transcript Signals */}
                  <div>
                    <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-3">Transcript Signals</p>
                    <div className="flex flex-col gap-3">
                      {[
                        { type: 'Positive', color: 'green', quote: '"We\'ve had a strong run of new clients come through this quarter, probably four or five above where I expected."', interp: 'Suggests pipeline is healthy and new FUM is likely incoming.' },
                        { type: 'Positive', color: 'green', quote: '"The managed accounts product is exactly what a few of my clients have been asking for."', interp: 'Expressed genuine intent to move clients onto the platform.' },
                        { type: 'Caution', color: 'amber', quote: '"I\'ve been trialling a couple of other platforms for some of the smaller accounts — just to see what\'s out there."', interp: 'Competitor platform use detected. Allocation may be split.' },
                        { type: 'Risk', color: 'red', quote: '"Things have been a bit slower in the back half — nothing alarming, but I\'d rather be honest about it."', interp: 'Business flow may have softened. Watch next quarter closely.' },
                      ].map((signal, i) => (
                        <div key={i} className={`border-l-4 rounded-r-[8px] px-4 py-3 bg-[#f9fafb] ${
                          signal.color === 'green' ? 'border-[#16a34a]' :
                          signal.color === 'amber' ? 'border-[#d97706]' :
                          'border-[#dc2626]'
                        }`}>
                          <span className={`text-[12px] font-semibold ${
                            signal.color === 'green' ? 'text-[#16a34a]' :
                            signal.color === 'amber' ? 'text-[#d97706]' :
                            'text-[#dc2626]'
                          }`}>{signal.type}</span>
                          <p className="text-[13px] text-[#0a0a0a] font-medium mt-1">{signal.quote}</p>
                          <p className="text-[12px] text-[#737373] mt-1">{signal.interp}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Note */}
                  <div className="bg-[#f3f4f6] rounded-[8px] px-4 py-3">
                    <p className="text-[13px] text-[#737373]">
                      <span className="font-semibold text-[#404040]">Note:</span> Business slowdown signals were not sufficiently probed. A clearer read on FUM confidence requires direct questioning on client pipeline volume and allocation intent next meeting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Meeting Performance */}
              <div>
                <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-2">Meeting Performance</p>
                <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5">
                  <div className="flex gap-8">
                    {/* Gauges */}
                    <div className="flex gap-6 shrink-0 items-start">
                      {[
                        { value: 7.4, label: 'Effectiveness', color: '#f59e0b', pct: 0.74 },
                        { value: 8, label: 'Sentiment', color: '#16a34a', pct: 0.8 },
                      ].map((gauge) => {
                        const r = 34, c = 2 * Math.PI * r
                        return (
                          <div key={gauge.label} className="flex flex-col items-center gap-1.5">
                            <svg width="88" height="88" viewBox="0 0 88 88">
                              <circle cx="44" cy="44" r={r} fill="none" stroke="#f3f4f6" strokeWidth="8" />
                              <circle
                                cx="44" cy="44" r={r} fill="none" stroke={gauge.color} strokeWidth="8"
                                strokeDasharray={`${c * gauge.pct} ${c * (1 - gauge.pct)}`}
                                strokeDashoffset={c * 0.25}
                                strokeLinecap="round"
                                transform="rotate(-90 44 44)"
                              />
                              <text x="44" y="50" textAnchor="middle" fill="#0a0a0a" fontSize="20" fontWeight="700">{gauge.value}</text>
                            </svg>
                            <span className="text-[12px] text-[#737373]">{gauge.label}</span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Details */}
                    <div className="flex gap-6 flex-1 pt-1">
                      <div className="flex-1">
                        <p className="text-[14px] font-semibold text-[#16a34a] flex items-center gap-1.5 mb-3">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          What landed well
                        </p>
                        <ul className="flex flex-col gap-2">
                          {[
                            'Managed accounts introduction — genuine enthusiasm from Adrian',
                            'Strong rapport, relaxed tone throughout',
                            'Compliance concern acknowledged — Adrian felt heard',
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] text-[#404040]">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#404040] shrink-0" />{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex-1">
                        <p className="text-[14px] font-semibold text-[#dc2626] flex items-center gap-1.5 mb-3">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                          Objections &amp; Issues Raised
                        </p>
                        <ul className="flex flex-col gap-2">
                          {[
                            'Onboarding paperwork volume — described as "too much friction"',
                            'Uncertainty around new compliance requirements',
                            'Hesitant on timeline for moving clients to managed accounts',
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] text-[#404040]">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#404040] shrink-0" />{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coverage Analysis */}
              <div>
                <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-2">Coverage Analysis</p>
                <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5 flex flex-col gap-5">
                  {/* Priority Topics */}
                  <div>
                    <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-3">Priority Topics</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: 'Managed Accounts', color: 'green' },
                        { label: 'FDS Renewal', color: 'red' },
                        { label: 'Compliance Training', color: 'green' },
                        { label: 'Estate Planning', color: 'red' },
                        { label: 'Platform Migration', color: 'green' },
                        { label: 'Q1 Business Plan', color: 'gray' },
                      ].map((topic) => (
                        <span key={topic.label} className={`px-3 py-1.5 rounded-full text-[13px] font-medium border ${
                          topic.color === 'green' ? 'border-[#16a34a] text-[#16a34a]' :
                          topic.color === 'red' ? 'border-[#dc2626] text-[#dc2626]' :
                          'border-[#9ca3af] text-[#9ca3af]'
                        }`}>{topic.label}</span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#e5e5e5]" />

                  {/* What Was Not Said */}
                  <div>
                    <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-3">What Was Not Said</p>
                    <div className="flex flex-col gap-3">
                      <div className="bg-[#fef2f2] rounded-[10px] px-5 py-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-[#fee2e2] text-[#dc2626] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">High</span>
                          <span className="text-[14px] font-semibold text-[#0a0a0a]">FDS Renewal</span>
                        </div>
                        <p className="text-[13px] text-[#737373]">Due in 6 weeks — no discussion. Risk of lapse.</p>
                      </div>
                      <div className="bg-[#fffbeb] rounded-[10px] px-5 py-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-[#fef3c7] text-[#d97706] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">Medium</span>
                          <span className="text-[14px] font-semibold text-[#0a0a0a]">Estate Planning</span>
                        </div>
                        <p className="text-[13px] text-[#737373]">Relevant to Adrian's client base. Missed opportunity to introduce the new guide.</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#e5e5e5]" />

                  {/* How Key Themes Landed */}
                  <div>
                    <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-3">How Key Themes Landed</p>
                    <div className="flex flex-col">
                      {[
                        { theme: 'Managed Account Solution', badge: 'Positive', color: 'green', desc: 'Adrian expressed genuine interest, asked follow-up questions.' },
                        { theme: 'Compliance Training', badge: 'Neutral', color: 'amber', desc: 'Acknowledged but deferred — raised own question back.' },
                        { theme: 'Platform Onboarding', badge: 'Negative', color: 'red', desc: 'Adrian expressed frustration with paperwork volume.' },
                      ].map((row, i, arr) => (
                        <div key={i} className={`flex items-center gap-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-[#e5e5e5]' : ''}`}>
                          <span className="text-[14px] font-semibold text-[#0a0a0a] w-[210px] shrink-0">{row.theme}</span>
                          <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                            row.color === 'green' ? 'bg-[#dcfce7] text-[#16a34a]' :
                            row.color === 'amber' ? 'bg-[#fef3c7] text-[#d97706]' :
                            'bg-[#fee2e2] text-[#dc2626]'
                          }`}>{row.badge}</span>
                          <span className="text-[13px] text-[#737373]">{row.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* File Note */}
              <div>
                <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-2">File Note</p>
                <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[13px] text-[#9ca3af]">Auto-generated · 13 March 2026</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-[#404040]">Download</span>
                      <BlueCircleButton />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-[14px] text-[#404040]"><span className="font-bold">Adviser:</span> Adrian Kowalski</p>
                    <p className="text-[14px] text-[#404040]"><span className="font-bold">Date:</span> 13 March 2026 | <span className="font-bold">Duration:</span> 48 min</p>
                    <p className="text-[14px] text-[#404040]"><span className="font-bold">Purpose:</span> Quarterly review and product discussion</p>
                    <p className="text-[14px] text-[#404040]"><span className="font-bold">Topics Covered:</span> Platform usage review, managed account solution introduction, compliance training discussion, onboarding paperwork concerns.</p>
                    <p className="text-[14px] text-[#404040]"><span className="font-bold">Adviser Concerns:</span> Volume of paperwork in new onboarding flow.</p>
                    <p className="text-[14px] text-[#404040]"><span className="font-bold">Actions:</span> BDM to send managed account product sheet; follow up on compliance training question; book next quarterly review.</p>
                    <p className="text-[14px] text-[#404040]"><span className="font-bold">Next Contact:</span> Within 48 hours via email.</p>
                  </div>
                </div>
              </div>

              {/* Suggested Resources */}
              <div>
                <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-2">Suggested Resources</p>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      tag: 'Product Sheet', tagBg: '#1182e3',
                      title: 'Managed Accounts Overview',
                      quote: '"The managed accounts product is exactly what a few of my clients have been asking for."',
                      desc: 'Adrian expressed direct interest. This sheet gives him something concrete to take back to those clients and move them toward onboarding.',
                    },
                    {
                      tag: 'White Paper', tagBg: '#7c3aed',
                      title: 'Estate Planning Guide 2026',
                      quote: '"A lot of my clients are at that stage of life where they\'re starting to think about what happens next — it comes up more and more."',
                      desc: "Adrian's client base is skewing older. This guide positions you as a value-add and opens a natural conversation next meeting.",
                    },
                    {
                      tag: 'Education', tagBg: '#16a34a',
                      title: 'Compliance Training Modules',
                      quote: '"I\'m not totally across the new compliance requirements — I keep meaning to look into it properly."',
                      desc: "Adrian flagged a knowledge gap. Sending this is a low-effort way to resolve his concern and build trust before it becomes a blocker.",
                    },
                  ].map((resource, i) => (
                    <div key={i} className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5">
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: resource.tagBg }}>{resource.tag}</span>
                        <span className="text-[15px] font-bold text-[#0a0a0a]">{resource.title}</span>
                      </div>
                      <div className="border-l-4 border-[#1182e3] pl-4 mb-3">
                        <p className="text-[13px] text-[#404040]">{resource.quote}</p>
                      </div>
                      <p className="text-[13px] text-[#737373]">{resource.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions & Follow-Up */}
              <div>
                <p className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-2">Actions &amp; Follow-Up</p>
                <div className="flex flex-col gap-3">
                  {/* Action Items */}
                  <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5">
                    <p className="text-[15px] font-semibold text-[#0a0a0a] flex items-center gap-2 mb-4">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1182e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      Action Items
                    </p>
                    <div className="flex flex-col gap-2">
                      {[
                        'Send managed account product sheet by Wednesday',
                        'Follow up on compliance training question',
                        'Book next quarterly review',
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-[#f9fafb] rounded-[8px] px-4 py-3">
                          <input type="checkbox" className="w-4 h-4 cursor-pointer accent-[#1182e3]" />
                          <span className="text-[14px] text-[#0a0a0a]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Best Action */}
                  <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-[10px] px-6 py-5">
                    <p className="text-[15px] font-semibold text-[#1182e3] flex items-center gap-2 mb-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1182e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      Next Best Action
                    </p>
                    <p className="text-[14px] text-[#404040]">
                      Send the managed accounts product sheet and follow up on the compliance training question within 48 hours via email.
                    </p>
                  </div>

                  {/* Follow-up Timing + Recommended Method */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5">
                      <p className="text-[14px] font-semibold text-[#0a0a0a] flex items-center gap-2 mb-2">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                        Follow-up Timing
                      </p>
                      <p className="text-[15px] font-bold text-[#0a0a0a]">Within 48 hours</p>
                    </div>
                    <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5">
                      <p className="text-[14px] font-semibold text-[#0a0a0a] flex items-center gap-2 mb-2">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                        </svg>
                        Recommended Method
                      </p>
                      <p className="text-[15px] font-bold text-[#0a0a0a]">Email</p>
                    </div>
                  </div>

                  {/* Draft Follow-up Email */}
                  <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[15px] font-semibold text-[#0a0a0a] flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1182e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                        </svg>
                        Draft Follow-up Email
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-[#404040]">Copy Draft</span>
                        <button className="w-10 h-10 rounded-full bg-[#1182e3] flex items-center justify-center shrink-0 hover:bg-blue-600 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#f9fafb] rounded-[8px] px-5 py-4 flex flex-col gap-3">
                      <p className="text-[14px] text-[#0a0a0a]">Hi Adrian,</p>
                      <p className="text-[14px] text-[#0a0a0a]">Great catching up today. As discussed, I've attached the managed accounts overview for your review. I think it'll be a great fit for a few of your clients.</p>
                      <p className="text-[14px] text-[#0a0a0a]">I'm also following up on the compliance training modules — I'll send those through separately.</p>
                      <p className="text-[14px] text-[#0a0a0a]">Let's lock in the next quarterly review. Happy to work around your schedule.</p>
                      <p className="text-[14px] text-[#0a0a0a]">Best regards,<br />Clayton</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* CPD Tab Content */}
          {activeTab === 'cpd' && <>

          {/* 3. Certificate Recipients Table */}
          <div className="bg-white rounded-[10px] border border-[#e5e5e5] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-[16px] font-semibold text-[#0a0a0a]">Certificate Recipients</span>
              <div className="flex items-center gap-2" data-print-hide>
                <span className="text-[13px] font-semibold text-[#404040]">Export Data CSV</span>
                <BlueCircleButton />
              </div>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e5e5]">
                  <th className="px-6 py-3 text-left text-[11px] uppercase tracking-wider text-[#9ca3af] font-medium">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] uppercase tracking-wider text-[#9ca3af] font-medium">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] uppercase tracking-wider text-[#9ca3af] font-medium">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] uppercase tracking-wider text-[#9ca3af] font-medium" data-print-hide>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {recipients.map((r, i) => (
                  <tr
                    key={i}
                    className={`h-[52px] ${i < recipients.length - 1 ? 'border-b border-[#f3f4f6]' : ''}`}
                  >
                    <td className="px-6 text-[14px] text-[#0a0a0a] font-medium">{r.name}</td>
                    <td className="px-6 text-[14px] text-[#737373]">{r.email}</td>
                    <td className="px-6">
                      {r.status === 'Sent Successfully' ? (
                        <span className="bg-[#dcfce7] text-[#16a34a] text-[12px] font-medium px-2.5 py-1 rounded-full">
                          Sent Successfully
                        </span>
                      ) : (
                        <span className="bg-[#fee2e2] text-[#dc2626] text-[12px] font-medium px-2.5 py-1 rounded-full">
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="px-6" data-print-hide>
                      <button className="flex items-center gap-1.5 text-[13px] text-[#1182e3]">
                        <MailIcon />
                        Resend Certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-6 py-3 border-t border-[#e5e5e5]" data-print-hide>
              <span className="text-[13px] text-[#737373]">Showing 1 to 6 of 25 entries</span>
              <div className="flex items-center gap-1">
                <button className="border border-[#e5e5e5] rounded-lg px-3 py-1.5 text-[13px] text-[#737373] hover:bg-gray-50">
                  Previous
                </button>
                <button className="border border-[#e5e5e5] rounded-lg px-3 py-1.5 text-[13px] text-[#737373] hover:bg-gray-50">
                  1
                </button>
                <button className="border border-[#e5e5e5] rounded-lg px-3 py-1.5 text-[13px] text-[#737373] hover:bg-gray-50">
                  2
                </button>
                <button className="border border-[#e5e5e5] rounded-lg px-3 py-1.5 text-[13px] text-[#0a0a0a] font-semibold">
                  3
                </button>
                <button className="border border-[#e5e5e5] rounded-lg px-3 py-1.5 text-[13px] text-[#737373] hover:bg-gray-50">
                  4
                </button>
                <button className="border border-[#e5e5e5] rounded-lg px-3 py-1.5 text-[13px] text-[#737373] hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* 4. Activity Meets CPD Standards */}
          <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5">
            <h2 className="text-[16px] font-semibold text-[#0a0a0a] mb-4">
              Activity Meets CPD Standards
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {cpdStandardCards.map((card, i) => (
                <div key={i} className="border border-[#e5e5e5] rounded-[10px] p-4">
                  <span className="text-[11px] font-medium bg-[#dcfce7] text-[#16a34a] px-2 py-0.5 rounded-full mb-2 inline-block">
                    Passed
                  </span>
                  <p className="text-[14px] font-semibold text-[#0a0a0a]">{card.question}</p>
                  <p className="text-[12px] text-[#9ca3af]">{card.reference}</p>
                  <p className="text-[13px] text-[#737373] mt-2">{card.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. CPD Point Allocation */}
          <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5">
            <h2 className="text-[16px] font-semibold text-[#0a0a0a] mb-4">CPD Point Allocation</h2>

            <div className="grid grid-cols-2 gap-3">
              {categoryCards.map((cat, i) => (
                <div
                  key={i}
                  className="border border-[#e5e5e5] rounded-[10px] p-4 flex items-start justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#0a0a0a]">{cat.name}</p>
                    {cat.description && (
                      <p className="text-[12px] text-[#737373] mt-2">{cat.description}</p>
                    )}
                  </div>
                  <div className="shrink-0">
                    <ValueBadge value={cat.value} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {specificRows.map((row, ri) => (
                <div key={ri} className="grid grid-cols-4 gap-2">
                  {row.map((item, ci) => (
                    <div key={ci} className="flex items-center gap-3">
                      <SmallValueBadge value={item.value} />
                      <span className="text-[13px] text-[#404040]">{item.label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* 6. Expert Details */}
          <div className="bg-white rounded-[10px] border border-[#e5e5e5] px-6 py-5">
            <h2 className="text-[16px] font-semibold text-[#0a0a0a] mb-4">Expert Details</h2>

            {/* Expert 1 */}
            <div className="border border-[#e5e5e5] rounded-[10px] overflow-hidden mb-3">
              <button
                onClick={() => setExpert1Open(o => !o)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-[15px] font-semibold text-[#0a0a0a]">Clayton Daniels</span>
                {expert1Open ? <ChevronDownIcon /> : <ChevronRightIcon />}
              </button>
              {expert1Open && (
                <div className="px-5 pb-5 border-t border-[#e5e5e5] pt-4">
                  <p className="text-[13px] text-[#737373] leading-relaxed whitespace-pre-line">
                    {`Expert Role: Chief Executive Officer\nExpert Employer: Ensombl\nProfessional Biography: Clayton Daniels is the Chief Executive Officer of Ensombl. With a background spanning financial advisory, wealth management, and fintech, he has held leadership roles across Ensombl, Hillross Financial Services, Dixon Advisory, and more. Skills: Cash Flow, Coaching, Education, Estate Planning, Finance, Financial Advisory, Financial Planning, Financial Services, Income Protection, Investment Strategies, Investments, Life Insurance, Retirement Planning, Risk Management, Superannuation, Tax, Wealth Management.`}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[
                      'Financial Planning',
                      'Regulatory Compliance and Consumer Protection',
                      'Technical Competence',
                      'Client Care',
                      'Skills',
                      'Retirement Planning',
                    ].map(tag => (
                      <span
                        key={tag}
                        className="bg-[#dbeafe] text-[#1d4ed8] text-[11px] px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Expert 2 */}
            <div className="border border-[#e5e5e5] rounded-[10px] overflow-hidden">
              <button
                onClick={() => setExpert2Open(o => !o)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-[15px] font-semibold text-[#0a0a0a]">Dean Holmes</span>
                {expert2Open ? <ChevronDownIcon /> : <ChevronRightIcon />}
              </button>
              {expert2Open && (
                <div className="px-5 pb-5 border-t border-[#e5e5e5] pt-4">
                  <p className="text-[13px] text-[#737373] leading-relaxed whitespace-pre-line">
                    {`Expert Role: Co-Founder and Director\nExpert Employer: Absolute Wealth Advisers\nProfessional Biography: Dean Holmes has been a Co-Founder and Director at Absolute Wealth Advisers since 2008. His extensive experience qualifies him to deliver this CPD content. Expertise Areas: Financial Planning, Compliance, Client Communication.`}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[
                      'Financial Planning',
                      'Compliance',
                      'Client Communication',
                      'Regulatory Compliance',
                      'Practice Management',
                      'Risk Management',
                    ].map(tag => (
                      <span
                        key={tag}
                        className="bg-[#dbeafe] text-[#1d4ed8] text-[11px] px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          </>}

        </main>
      </div>
    </>
  )
}
