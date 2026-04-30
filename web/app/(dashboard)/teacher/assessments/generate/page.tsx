import Link from 'next/link'

export default function TeacherAIGenerateRemarksPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Generate AI Remarks</h1>
          <p className="text-gray-500 mt-1">Generate CBC remarks for learner assessments</p>
        </div>
        <Link href="/teacher/dashboard" className="sc-btn-secondary">
          Back to Dashboard
        </Link>
      </div>
      <div className="sc-card">
        <p className="text-gray-700">
          AI remarks route is active. Next step is selecting students and sending data to the AI API.
        </p>
      </div>
    </div>
  )
}
