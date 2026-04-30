import Link from 'next/link'

export default function TeacherLessonGeneratePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Generate Lesson Plan</h1>
          <p className="text-gray-500 mt-1">Create NCDC-aligned lesson plans with AI</p>
        </div>
        <Link href="/teacher/dashboard" className="sc-btn-secondary">
          Back to Dashboard
        </Link>
      </div>
      <div className="sc-card">
        <p className="text-gray-700">
          Lesson generator route is live. Next step is wiring prompt input and AI output persistence.
        </p>
      </div>
    </div>
  )
}
