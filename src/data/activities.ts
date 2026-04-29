export type IconType = 'person-edit' | 'doc-check' | 'doc-play' | 'doc-edit'

export type Activity = {
  iconType: IconType
  title: string
  code?: string
  tags?: string[]
  href?: string
}

export const activities: Activity[] = [
  { iconType: 'person-edit', title: 'Conference on Modern Financial Advice', code: 'WTGQ-0001-05082025', tags: ['Meeting Automation', 'MCQ'], href: '/assessment/conference-on-modern-financial-advice' },
  { iconType: 'person-edit', title: 'PDR Meeting Transcript Review',         code: 'WTGQ-0001-05082025', tags: ['Meeting Automation', 'Certificate'] },
  { iconType: 'person-edit', title: 'Presentation Review',                   code: 'WTGQ-0001-05082025', tags: ['Meeting Automation', 'Publish Quiz'] },
  { iconType: 'doc-check',   title: 'Meeting Transcript & Key Insights',     code: 'WTGQ-0001-05082025', tags: ['Transcript', 'MCQ'] },
  { iconType: 'doc-play',    title: 'PDR Meeting Transcript Review',         code: 'WTGQ-0001-05082025', tags: ['Presentation', 'Certificate'] },
  { iconType: 'doc-edit',    title: 'Presentation Review',                   code: 'WTGQ-0001-05082025', tags: ['Written Materials', 'Publish Quiz'] },
  { iconType: 'doc-check',   title: 'Meeting Transcript & Key Insights',     code: 'WTGQ-0001-05082025', tags: ['Transcript', 'MCQ'] },
  { iconType: 'doc-play',    title: 'PDR Meeting Transcript Review',         code: 'WTGQ-0001-05082025', tags: ['Presentation', 'Certificate'] },
  { iconType: 'doc-edit',    title: 'Presentation Review',                   code: 'WTGQ-0001-05082025', tags: ['Written Materials', 'Publish Quiz'] },
]
