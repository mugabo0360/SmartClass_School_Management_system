import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function ParentDashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, school_id, full_name')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'parent') redirect('/login')

  const { data: children } = await supabase
    .from('students')
    .select('id, full_name, admission_number, classes(name), fee_balance')
    .eq('parent_id', profile.id)
    .eq('school_id', profile.school_id)
    .order('full_name', { ascending: true })

  const childIds = (children || []).map((c) => c.id)

  let recentAssessments: any[] = []
  if (childIds.length > 0) {
    const { data } = await supabase
      .from('assessments')
      .select('id, student_id, term, academic_year, score, raw_mark, max_mark, subjects(name), students(full_name)')
      .in('student_id', childIds)
      .order('created_at', { ascending: false })
      .limit(30)
    recentAssessments = data || []
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome, {profile.full_name}</p>
        </div>
        <Link href="/login" className="sc-btn-secondary">
          Switch Account
        </Link>
      </div>

      <div className="sc-card mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Children</h2>
        {(children || []).length === 0 ? (
          <p className="text-gray-500">No child is linked to this parent yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {(children || []).map((child: any) => (
              <div key={child.id} className="border rounded-lg p-4">
                <div className="font-semibold text-gray-900">{child.full_name}</div>
                <div className="text-sm text-gray-600 mt-1">Admission: {child.admission_number}</div>
                <div className="text-sm text-gray-600">Class: {child.classes?.name || '-'}</div>
                <div className="text-sm text-gray-600">
                  Fee Balance: UGX {Number(child.fee_balance || 0).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sc-card overflow-x-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Progress</h2>
        {(recentAssessments || []).length === 0 ? (
          <p className="text-gray-500">No assessment results found yet for linked children.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-3 pr-3">Child</th>
                <th className="py-3 pr-3">Subject</th>
                <th className="py-3 pr-3">Term</th>
                <th className="py-3 pr-3">Score</th>
                <th className="py-3 pr-3">Raw Mark</th>
              </tr>
            </thead>
            <tbody>
              {recentAssessments.map((item: any) => (
                <tr key={item.id} className="border-b last:border-b-0">
                  <td className="py-3 pr-3">{item.students?.full_name || '-'}</td>
                  <td className="py-3 pr-3">{item.subjects?.name || '-'}</td>
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
        )}
      </div>
    </div>
  )
}
