import Link from 'next/link'

export default function TeacherAttendancePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-500 mt-1">Record and track daily learner attendance</p>
        </div>
        <Link href="/teacher/dashboard" className="sc-btn-secondary">
          Back to Dashboard
        </Link>
      </div>
      <div className="sc-card">
        <p className="text-gray-700">
          Attendance page is active. Next step is adding attendance form and class filters.
        </p>
      </div>
    </div>
  )
}
