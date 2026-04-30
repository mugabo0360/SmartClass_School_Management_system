import Link from 'next/link'
import { redirect, redirect as navRedirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import SubmitButton from '@/components/submit-button'

export default async function TeacherStudentsPage({
  searchParams,
}: {
  searchParams?: { status?: string; message?: string; edit?: string; reset?: string }
}) {
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
          <h1 className="text-xl font-bold text-gray-900 mb-2">Setup needed before viewing students</h1>
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

  async function addStudent(formData: FormData) {
    'use server'
    const supabase = createClient()
    const admission_number = String(formData.get('admission_number') || '').trim()
    const full_name = String(formData.get('full_name') || '').trim()
    const gender = String(formData.get('gender') || '').trim() || null
    const class_name = String(formData.get('class_name') || '').trim()

    if (!admission_number || !full_name || !class_name) {
      navRedirect('/teacher/students?status=error&message=Admission+number,+name,+and+class+are+required')
    }

    const isValidAdmission = /^[A-Za-z0-9-]{3,20}$/.test(admission_number)
    if (!isValidAdmission) {
      navRedirect('/teacher/students?status=error&message=Admission+number+must+be+3-20+letters,+numbers,+or+-')
    }

    let class_id: string | null = null
    if (class_name) {
      const { data: existingClass } = await supabase
        .from('classes')
        .select('id')
        .eq('school_id', profile.school_id)
        .eq('name', class_name)
        .maybeSingle()

      if (existingClass?.id) {
        class_id = existingClass.id
      } else {
        const { data: newClass, error: newClassError } = await supabase
          .from('classes')
          .insert({
            school_id: profile.school_id,
            name: class_name,
            level: class_name,
            section: 'A',
            academic_year: '2025',
            term: 'Term 1',
          })
          .select('id')
          .single()
        if (newClassError) {
          navRedirect('/teacher/students?status=error&message=Failed+to+create+class')
        }
        class_id = newClass?.id || null
      }
    }

    const { error: insertError } = await supabase.from('students').insert({
      school_id: profile.school_id,
      class_id,
      admission_number,
      full_name,
      gender,
      is_active: true,
    })
    if (insertError) {
      const msg =
        insertError.code === '23505'
          ? 'Admission+number+already+exists+for+this+school'
          : 'Failed+to+save+student'
      navRedirect(`/teacher/students?status=error&message=${msg}`)
    }

    revalidatePath('/teacher/students')
    navRedirect(`/teacher/students?status=success&message=Student+saved&reset=${Date.now()}`)
  }

  async function createUgandaClasses() {
    'use server'
    const supabase = createClient()
    const classRows = [
      ['P1', 'P1'],
      ['P2', 'P2'],
      ['P3', 'P3'],
      ['P4', 'P4'],
      ['P5', 'P5'],
      ['P6', 'P6'],
      ['P7', 'P7'],
      ['S1', 'S1'],
      ['S2', 'S2'],
      ['S3', 'S3'],
      ['S4', 'S4'],
      ['S5', 'S5'],
      ['S6', 'S6'],
    ]

    for (const [name, level] of classRows) {
      const { data: existing } = await supabase
        .from('classes')
        .select('id')
        .eq('school_id', profile.school_id)
        .eq('name', name)
        .maybeSingle()
      if (!existing) {
        await supabase.from('classes').insert({
          school_id: profile.school_id,
          name,
          level,
          section: 'A',
          academic_year: '2025',
          term: 'Term 1',
        })
      }
    }

    revalidatePath('/teacher/students')
  }

  async function updateStudentName(formData: FormData) {
    'use server'
    const supabase = createClient()
    const studentId = String(formData.get('student_id') || '').trim()
    const admissionNumber = String(formData.get('admission_number') || '').trim()
    const fullName = String(formData.get('full_name') || '').trim()
    const gender = String(formData.get('gender') || '').trim() || null
    const className = String(formData.get('class_name') || '').trim()

    if (!studentId || !fullName || !admissionNumber) {
      navRedirect('/teacher/students?status=error&message=Admission+number+and+name+are+required')
    }

    const isValidAdmission = /^[A-Za-z0-9-]{3,20}$/.test(admissionNumber)
    if (!isValidAdmission) {
      navRedirect('/teacher/students?status=error&message=Invalid+admission+number+format')
    }

    let classId: string | null = null
    if (className) {
      const { data: existingClass } = await supabase
        .from('classes')
        .select('id')
        .eq('school_id', profile.school_id)
        .eq('name', className)
        .maybeSingle()

      if (existingClass?.id) {
        classId = existingClass.id
      } else {
        const { data: newClass, error: newClassError } = await supabase
          .from('classes')
          .insert({
            school_id: profile.school_id,
            name: className,
            level: className,
            section: 'A',
            academic_year: '2025',
            term: 'Term 1',
          })
          .select('id')
          .single()
        if (newClassError) {
          navRedirect('/teacher/students?status=error&message=Failed+to+create+class')
        }
        classId = newClass?.id || null
      }
    }

    const { error } = await supabase
      .from('students')
      .update({
        admission_number: admissionNumber,
        full_name: fullName,
        gender,
        class_id: classId,
      })
      .eq('id', studentId)
      .eq('school_id', profile.school_id)

    if (error) {
      const msg =
        error.code === '23505'
          ? 'Admission+number+already+exists+for+this+school'
          : 'Failed+to+update+student'
      navRedirect(`/teacher/students?status=error&message=${msg}`)
    }

    revalidatePath('/teacher/students')
    navRedirect('/teacher/students?status=success&message=Student+updated')
  }

  async function deleteStudent(formData: FormData) {
    'use server'
    const supabase = createClient()
    const studentId = String(formData.get('student_id') || '').trim()

    if (!studentId) {
      navRedirect('/teacher/students?status=error&message=Student+id+is+missing')
    }

    const { error } = await supabase
      .from('students')
      .update({ is_active: false })
      .eq('id', studentId)
      .eq('school_id', profile.school_id)

    if (error) {
      navRedirect('/teacher/students?status=error&message=Failed+to+delete+student')
    }

    revalidatePath('/teacher/students')
    navRedirect('/teacher/students?status=success&message=Student+deleted')
  }

  const { data: school } = await supabase
    .from('schools')
    .select('name')
    .eq('id', profile.school_id)
    .maybeSingle()

  const { data: students } = await supabase
    .from('students')
    .select('id, admission_number, full_name, gender, classes(name)')
    .eq('school_id', profile.school_id)
    .eq('is_active', true)
    .order('admission_number', { ascending: true })
    .limit(200)

  const editingStudentId = searchParams?.edit || ''

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

      <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-800">
        School: <span className="font-semibold">{school?.name || 'Unknown School'}</span> · Loaded students:{' '}
        <span className="font-semibold">{students?.length || 0}</span>
      </div>

      {searchParams?.status && (
        <div
          className={`mb-4 rounded-lg p-3 text-sm ${
            searchParams.status === 'success'
              ? 'border border-green-200 bg-green-50 text-green-700'
              : 'border border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {searchParams.message
            ? decodeURIComponent(searchParams.message.replace(/\+/g, ' '))
            : searchParams.status === 'success'
            ? 'Saved successfully.'
            : 'Could not save.'}
        </div>
      )}

      <div className="sc-card mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Student</h2>
        <form action={createUgandaClasses} className="mb-4">
          <SubmitButton
            idleLabel="Create Uganda Classes (P1-P7, S1-S6)"
            pendingLabel="Creating classes..."
            className="sc-btn-secondary"
          />
        </form>
        <form
          key={searchParams?.reset || 'fresh'}
          action={addStudent}
          className="grid md:grid-cols-4 gap-3"
          autoComplete="off"
        >
          <input
            name="admission_number"
            className="sc-input"
            placeholder="Admission No. (e.g. STU005)"
            pattern="[A-Za-z0-9-]{3,20}"
            title="Use 3-20 letters, numbers, or hyphen"
            required
          />
          <input name="full_name" className="sc-input" placeholder="Student full name" required />
          <select name="gender" className="sc-input">
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select name="class_name" className="sc-input" required>
            <option value="">Select Class *</option>
            <optgroup label="Primary Section">
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
              <option value="P4">P4</option>
              <option value="P5">P5</option>
              <option value="P6">P6</option>
              <option value="P7">P7</option>
            </optgroup>
            <optgroup label="Secondary Section">
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
              <option value="S4">S4</option>
              <option value="S5">S5</option>
              <option value="S6">S6</option>
            </optgroup>
          </select>
          <SubmitButton
            idleLabel="Save Student"
            pendingLabel="Saving student..."
            className="sc-btn-primary md:col-span-4"
          />
        </form>
      </div>

      <div className="sc-card overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-x-4 border-spacing-y-1">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-3 px-6 whitespace-nowrap">Admission No.</th>
              <th className="py-3 px-6 min-w-[320px] whitespace-nowrap">Student Name</th>
              <th className="py-3 px-6 min-w-[140px] whitespace-nowrap">Class</th>
              <th className="py-3 px-6 min-w-[140px] whitespace-nowrap">Gender</th>
              <th className="py-3 px-6 min-w-[160px] whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(students || []).map((student: any) => (
              <tr key={student.id} className="border-b last:border-b-0">
                <td className="py-3 px-6 font-medium align-middle whitespace-nowrap">
                  {editingStudentId === student.id ? (
                    <input
                      name="admission_number"
                      form={`edit-student-${student.id}`}
                      defaultValue={student.admission_number}
                      className="sc-input !py-1 !px-2 !text-xs w-28"
                      pattern="[A-Za-z0-9-]{3,20}"
                      required
                    />
                  ) : (
                    student.admission_number
                  )}
                </td>
                <td className="py-3 px-6 align-middle">
                  {editingStudentId === student.id ? (
                    <input
                      name="full_name"
                      form={`edit-student-${student.id}`}
                      defaultValue={student.full_name}
                      className="sc-input !py-1 !px-2 !text-xs min-w-40"
                      required
                    />
                  ) : (
                    <span className="inline-block max-w-[280px] truncate" title={student.full_name}>
                      {student.full_name}
                    </span>
                  )}
                </td>
                <td className="py-3 px-6 align-middle whitespace-nowrap">
                  {editingStudentId === student.id ? (
                    <select
                      name="class_name"
                      form={`edit-student-${student.id}`}
                      defaultValue={student.classes?.name || ''}
                      className="sc-input !py-1 !px-2 !text-xs min-w-24"
                    >
                      <option value="">-</option>
                      <optgroup label="Primary">
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                        <option value="P4">P4</option>
                        <option value="P5">P5</option>
                        <option value="P6">P6</option>
                        <option value="P7">P7</option>
                      </optgroup>
                      <optgroup label="Secondary">
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                        <option value="S4">S4</option>
                        <option value="S5">S5</option>
                        <option value="S6">S6</option>
                      </optgroup>
                    </select>
                  ) : (
                    student.classes?.name || '-'
                  )}
                </td>
                <td className="py-3 px-6 align-middle whitespace-nowrap">
                  {editingStudentId === student.id ? (
                    <select
                      name="gender"
                      form={`edit-student-${student.id}`}
                      defaultValue={student.gender || ''}
                      className="sc-input !py-1 !px-2 !text-xs min-w-20"
                    >
                      <option value="">-</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    student.gender || '-'
                  )}
                </td>
                <td className="py-3 px-6 align-middle whitespace-nowrap">
                  <div className="inline-flex items-center gap-2 whitespace-nowrap">
                    {editingStudentId === student.id ? (
                      <>
                        <form id={`edit-student-${student.id}`} action={updateStudentName} className="flex items-center gap-2">
                          <input type="hidden" name="student_id" value={student.id} />
                          <SubmitButton
                            idleLabel="💾"
                            pendingLabel="..."
                            className="sc-btn-secondary !py-1 !px-2 !text-xs !border-emerald-200 !text-emerald-700 hover:!bg-emerald-50"
                            title="Save modifications"
                            ariaLabel="Save modifications"
                          />
                        </form>
                        <Link href="/teacher/students" className="sc-btn-secondary !py-1 !px-2 !text-xs">
                          ✖
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={`/teacher/students?edit=${student.id}`}
                        className="sc-btn-secondary !py-1 !px-2 !text-xs !border-emerald-200 !text-emerald-700 hover:!bg-emerald-50"
                        title="Edit student"
                        aria-label="Edit student"
                      >
                        ✏️
                      </Link>
                    )}
                    <form action={deleteStudent}>
                      <input type="hidden" name="student_id" value={student.id} />
                      <SubmitButton
                        idleLabel="🗑"
                        pendingLabel="..."
                        className="sc-btn-secondary !py-1 !px-2 !text-xs !border-red-200 !text-red-700 hover:!bg-red-50"
                        title="Delete student"
                        ariaLabel="Delete student"
                        confirmMessage="Delete this student? This will archive the student from active lists."
                      />
                    </form>
                  </div>
                </td>
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
