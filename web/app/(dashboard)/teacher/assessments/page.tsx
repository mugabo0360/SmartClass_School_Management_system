import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function TeacherAssessmentsPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, school_id')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile || !profile.school_id || !['teacher', 'admin', 'super_admin'].includes(profile.role)) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="sc-card">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Setup needed before viewing assessments</h1>
          <p className="text-gray-600 mb-4">
            Your account is signed in, but no school is linked yet. Complete school/profile setup and refresh.
          </p>
          <Link href="/teacher/setup" className="sc-btn-primary">
            Complete Setup
          </Link>
        </div>
      </div>
    )
  }

  const { data: assessments } = await supabase
    .from('assessments')
    .select(
      'id, assessment_type, term, academic_year, score, raw_mark, max_mark, competency_area, students(full_name, admission_number), subjects(name)'
    )
    .eq('school_id', profile.school_id)
    .order('created_at', { ascending: false })
    .limit(200)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
          <p className="text-gray-500 mt-1">Recent learner assessment records</p>
        </div>
        <Link href="/teacher/dashboard" className="sc-btn-secondary">
          Back to Dashboard
        </Link>
      </div>

      <div className="sc-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-3 pr-3">Student</th>
              <th className="py-3 pr-3">Subject</th>
              <th className="py-3 pr-3">Type</th>
              <th className="py-3 pr-3">Term</th>
              <th className="py-3 pr-3">Score</th>
              <th className="py-3 pr-3">Raw Mark</th>
            </tr>
          </thead>
          <tbody>
            {(assessments || []).map((item: any) => (
              <tr key={item.id} className="border-b last:border-b-0">
                <td className="py-3 pr-3">
                  {item.students?.full_name || '-'}
                  <div className="text-xs text-gray-500">{item.students?.admission_number || ''}</div>
                </td>
                <td className="py-3 pr-3">{item.subjects?.name || '-'}</td>
                <td className="py-3 pr-3">{item.assessment_type}</td>
                <td className="py-3 pr-3">
                  {item.term} {item.academic_year ? `(${item.academic_year})` : ''}
                </td>
                <td className="py-3 pr-3">{item.score ?? '-'}</td>
                <td className="py-3 pr-3">
                  {item.raw_mark ?? '-'} {item.max_mark ? `/ ${item.max_mark}` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!assessments || assessments.length === 0) && (
          <div className="py-8 text-center text-gray-500">
            No assessments found yet. Seed or create records first.
          </div>
        )}
      </div>
    </div>
  )
}
