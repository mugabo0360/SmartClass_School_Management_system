import Link from 'next/link'

export default function TeacherReportsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1">Generate and review learner progress reports</p>
        </div>
        <Link href="/teacher/dashboard" className="sc-btn-secondary">
          Back to Dashboard
        </Link>
      </div>
      <div className="sc-card">
        <p className="text-gray-700">
          Reports module is now available. Next step is to add PDF generation and publish actions.
        </p>
      </div>
    </div>
  )
}
