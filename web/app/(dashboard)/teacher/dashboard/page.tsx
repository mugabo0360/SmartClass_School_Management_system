// app/(dashboard)/teacher/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Users, FileText, Brain, CheckCircle, TrendingUp, Bell } from 'lucide-react'
import Link from 'next/link'

export default async function TeacherDashboard() {
  const supabase = createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get profile and school
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*, schools(*)')
    .eq('id', user.id)
    .maybeSingle()
  const resolvedProfile =
    profile ||
    ({
      full_name: (user.user_metadata as any)?.full_name || user.email || 'Teacher',
      role: (user.user_metadata as any)?.role || 'teacher',
      school_id: null,
      schools: null,
    } as any)

  const schoolId = resolvedProfile.school_id

  // Get stats
  const [studentsResult, assessmentsResult, pendingRemarksResult] = schoolId
    ? await Promise.all([
        supabase.from('students').select('id', { count: 'exact' }).eq('school_id', schoolId).eq('is_active', true),
        supabase.from('assessments').select('id', { count: 'exact' }).eq('school_id', schoolId).eq('academic_year', '2025'),
        supabase.from('assessments').select('id', { count: 'exact' }).eq('school_id', schoolId).is('ai_remark', null),
      ])
    : [{ count: 0 }, { count: 0 }, { count: 0 }]

  const stats = [
    { label: 'Active Students', value: studentsResult.count || 0, icon: Users, color: 'bg-blue-50 text-blue-600', href: '/teacher/students' },
    { label: 'Assessments This Year', value: assessmentsResult.count || 0, icon: FileText, color: 'bg-purple-50 text-purple-600', href: '/teacher/assessments' },
    { label: 'Remarks Pending', value: pendingRemarksResult.count || 0, icon: Brain, color: 'bg-amber-50 text-amber-600', href: '/teacher/assessments' },
    { label: 'Reports Ready', value: 0, icon: CheckCircle, color: 'bg-green-50 text-green-600', href: '/teacher/reports' },
  ]

  const quickActions = [
    { label: 'Enter Assessment Scores', desc: 'Record student scores for current term', href: '/teacher/assessments', icon: FileText, color: 'bg-blue-600' },
    { label: 'Generate AI Remarks', desc: 'Let AI write CBC report remarks automatically', href: '/teacher/assessments/generate', icon: Brain, color: 'bg-purple-600' },
    { label: 'Mark Attendance', desc: 'Record today\'s attendance', href: '/teacher/attendance', icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Generate Lesson Plan', desc: 'AI creates NCDC-aligned lesson plans', href: '/teacher/lessons/generate', icon: TrendingUp, color: 'bg-amber-600' },
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Good morning, {resolvedProfile.full_name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          {(resolvedProfile as any).schools?.name || 'School profile pending'} · {new Date().toLocaleDateString('en-UG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {(profileError || !profile) && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Live profile data is temporarily unavailable. You can still use basic dashboard actions.
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Link key={i} href={stat.href} className="sc-card hover:shadow-md transition-shadow group">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {quickActions.map((action, i) => (
            <Link key={i} href={action.href}
              className="flex items-center gap-4 sc-card hover:shadow-md transition-all hover:-translate-y-0.5">
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{action.label}</div>
                <div className="text-sm text-gray-500">{action.desc}</div>
              </div>
              <div className="ml-auto text-gray-400">→</div>
            </Link>
          ))}
        </div>
      </div>

      {/* CBC Score guide */}
      <div className="sc-card bg-blue-50 border-blue-100">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <Brain className="w-5 h-5" /> CBC Scoring Guide (NCDC)
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { score: '1', label: 'Beginning', desc: 'Learner needs significant support', color: 'score-1' },
            { score: '2', label: 'Developing', desc: 'Making progress with some support', color: 'score-2' },
            { score: '3', label: 'Achieved', desc: 'Demonstrates mastery independently', color: 'score-3' },
          ].map(s => (
            <div key={s.score} className={`px-3 py-2 rounded-lg text-sm border ${s.color}`}>
              <span className="font-bold text-lg">{s.score}</span>
              <span className="font-medium ml-2">{s.label}</span>
              <div className="text-xs opacity-80 mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
