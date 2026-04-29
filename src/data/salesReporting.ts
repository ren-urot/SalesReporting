export type Confidence = 'Strong' | 'High' | 'Moderate' | 'Low' | 'Unassessable'
export type Trend      = 'up' | 'down' | 'neutral'
export type Period     = 'Weeks' | 'Months' | 'Quarter' | 'Year'

export type Meeting = {
  name: string
  lastMeeting: string
  count: number
  confidence: Confidence
  trend: Trend
}

export type Objection = {
  text: string
  advisers: string[]
  count: number
}

export type TopicCoverage = {
  name: string
  covered: number
  partial: number
  missed: number
}

export type ChartDot = {
  week: number
  level: number
  score?: number
}

export const PERIODS: Period[] = ['Weeks', 'Months', 'Quarter', 'Year']

export const meetings: Meeting[] = [
  { name: 'Adrian Kowalski',  lastMeeting: '13 Mar 2026', count: 4, confidence: 'Moderate',     trend: 'up'      },
  { name: 'Sarah Brennan',    lastMeeting: '28 Feb 2026', count: 6, confidence: 'High',          trend: 'up'      },
  { name: 'James Tran',       lastMeeting: '10 Feb 2026', count: 3, confidence: 'Low',           trend: 'down'    },
  { name: 'Michelle Okafor',  lastMeeting: '3 Feb 2026',  count: 2, confidence: 'Unassessable',  trend: 'neutral' },
  { name: 'David Carmichael', lastMeeting: '22 Jan 2026', count: 5, confidence: 'Strong',        trend: 'neutral' },
  { name: 'Priya Nair',       lastMeeting: '15 Jan 2026', count: 3, confidence: 'Low',           trend: 'down'    },
  { name: 'Tom Gillespie',    lastMeeting: '8 Jan 2026',  count: 4, confidence: 'Moderate',      trend: 'neutral' },
]

export const objections: Objection[] = [
  { text: 'Onboarding paperwork volume',            advisers: ['A', 'D', 'D', 'M'], count: 5 },
  { text: 'Compliance requirement uncertainty',     advisers: ['A', 'D', 'P'],      count: 4 },
  { text: 'Timeline hesitancy — managed accounts',  advisers: ['A', 'D', 'F'],      count: 3 },
  { text: 'Competitor platform trialling',          advisers: ['G', 'M', 'P'],      count: 3 },
  { text: 'Fee transparency concerns',              advisers: ['S', 'D'],            count: 2 },
]

export const topicCoverage: TopicCoverage[] = [
  { name: 'Managed Accounts',    covered: 6, partial: 1, missed: 0 },
  { name: 'FDS Renewal',         covered: 2, partial: 3, missed: 2 },
  { name: 'Compliance Training', covered: 3, partial: 3, missed: 1 },
  { name: 'Estate Planning',     covered: 1, partial: 2, missed: 4 },
  { name: 'Platform Migration',  covered: 5, partial: 1, missed: 1 },
  { name: 'Q1 Business Plan',    covered: 2, partial: 4, missed: 1 },
]

// One dot per week; level 0 = Unassessable … 4 = Strong
export const chartDots: ChartDot[] = [
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

// How many recent meetings to show per period
export const MEETINGS_BY_PERIOD: Record<Period, number> = {
  Weeks:   2,
  Months:  4,
  Quarter: 7,
  Year:    7,
}

// How many trailing chart dots to show per period
export const DOTS_BY_PERIOD: Record<Period, number> = {
  Weeks:   4,
  Months:  8,
  Quarter: 12,
  Year:    12,
}

// KPI headline figures per period
export const KPI_BY_PERIOD: Record<Period, { meetings: string; effectiveness: string; advisers: string }> = {
  Weeks:   { meetings: '22',  effectiveness: '82%', advisers: '18' },
  Months:  { meetings: '85',  effectiveness: '79%', advisers: '20' },
  Quarter: { meetings: '210', effectiveness: '76%', advisers: '22' },
  Year:    { meetings: '847', effectiveness: '74%', advisers: '26' },
}
