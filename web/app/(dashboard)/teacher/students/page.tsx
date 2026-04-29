import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function TeacherStudentsPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, school_id')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.school_id || !['teacher', 'admin', 'super_admin'].includes(profile.role)) {
    redirect('/login')
  }

  const { data: students } = await supabase
    .from('students')
    .select('id, admission_number, full_name, gender, classes(name)')
    .eq('school_id', profile.school_id)
    .eq('is_active', true)
    .order('admission_number', { ascending: true })
    .limit(200)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 mt-1">Active learners in your school</p>
        </div>
        <Link href="/teacher/dashboard" className="sc-btn-secondary">
          Back to Dashboard
        </Link>
      </div>

      <div className="sc-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-3 pr-3">Admission No.</th>
              <th className="py-3 pr-3">Student Name</th>
              <th className="py-3 pr-3">Class</th>
              <th className="py-3 pr-3">Gender</th>
            </tr>
          </thead>
          <tbody>
            {(students || []).map((student: any) => (
              <tr key={student.id} className="border-b last:border-b-0">
                <td className="py-3 pr-3 font-medium">{student.admission_number}</td>
                <td className="py-3 pr-3">{student.full_name}</td>
                <td className="py-3 pr-3">{student.classes?.name || '-'}</td>
                <td className="py-3 pr-3">{student.gender || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!students || students.length === 0) && (
          <div className="py-8 text-center text-gray-500">
            No students found yet. Seed or add students in Supabase first.
          </div>
        )}
      </div>
    </div>
  )
}
