export type Recipient = {
  name: string
  email: string
  status: 'Sent Successfully' | 'Failed'
}

export type Assessment = {
  slug: string
  title: string
  subtitleLabel: string
  assessmentNumber: string
  totalCpdPoints: string
  assessmentDate: string
  activityDate: string
  recipients: Recipient[]
}

export const assessments: Assessment[] = [
  {
    slug: 'conference-on-modern-financial-advice',
    title: 'Conference on Modern Financial Advice',
    subtitleLabel: 'Meeting Automation - Certificate',
    assessmentNumber: 'ENSO-25111803-58180001',
    totalCpdPoints: '2',
    assessmentDate: '18 November 2025',
    activityDate: '18 November 2025',
    recipients: [
      { name: 'Albert Thomas',   email: 'albert.thomas@gmail.com',   status: 'Sent Successfully' },
      { name: 'Jonathan Smith',  email: 'jonathan.smith@gmail.com',  status: 'Failed' },
      { name: 'Christine Marks', email: 'christine.marks@gmail.com', status: 'Sent Successfully' },
      { name: 'Jesse Jackson',   email: 'jesse.jackson@gmail.com',   status: 'Sent Successfully' },
      { name: 'Susan Mann',      email: 'susan.mann@gmail.com',      status: 'Failed' },
      { name: 'Martin Smith',    email: 'martin.smith@gmail.com',    status: 'Failed' },
    ],
  },
]
