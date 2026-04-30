import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const DEFAULT_CLASSES = [
  'P1',
  'P2',
  'P3',
  'P4',
  'P5',
  'P6',
  'P7',
  'S1',
  'S2',
  'S3',
  'S4',
  'S5',
  'S6',
]

export async function POST(request: Request) {
  try {
    const server = createServerClient()
    const admin = createAdminClient()
    const body = await request.json().catch(() => ({}))

    const {
      data: { user },
    } = await server.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const fallbackFullName =
      (user.user_metadata?.full_name as string | undefined) || user.email || 'SmartClass User'
    const fallbackRole = (user.user_metadata?.role as string | undefined) || 'teacher'
    const parentSchoolId =
      (body?.school_id as string | undefined) || (user.user_metadata?.school_id as string | undefined) || null
    const schoolName =
      (body?.school_name as string | undefined) ||
      (user.user_metadata?.school_name as string | undefined) ||
      `${fallbackFullName} School`
    const schoolDistrict =
      (body?.school_district as string | undefined) ||
      (user.user_metadata?.school_district as string | undefined) ||
      'Kampala'

    const { data: profile } = await admin
      .from('profiles')
      .select('id, role, school_id')
      .eq('id', user.id)
      .maybeSingle()

    if (!profile) {
      const { error: insertProfileError } = await admin.from('profiles').insert({
        id: user.id,
        full_name: fallbackFullName,
        role: fallbackRole,
        accepted_terms: true,
        accepted_terms_at: new Date().toISOString(),
      })
      if (insertProfileError) {
        return NextResponse.json({ error: insertProfileError.message }, { status: 400 })
      }
    }

    const { data: profileAfter } = await admin
      .from('profiles')
      .select('id, role, school_id')
      .eq('id', user.id)
      .single()

    if (!profileAfter.school_id) {
      if (profileAfter.role === 'parent') {
        if (!parentSchoolId) {
          return NextResponse.json({ error: 'Parent account must be linked to a school.' }, { status: 400 })
        }
        const { error: parentLinkError } = await admin
          .from('profiles')
          .update({ school_id: parentSchoolId })
          .eq('id', user.id)

        if (parentLinkError) {
          return NextResponse.json({ error: parentLinkError.message }, { status: 400 })
        }
      } else {
        const { data: school, error: schoolError } = await admin
          .from('schools')
          .insert({
            name: schoolName,
            district: schoolDistrict,
            school_type: 'Primary',
            email: user.email,
          })
          .select('id, name')
          .single()

        if (schoolError) {
          return NextResponse.json({ error: schoolError.message }, { status: 400 })
        }

        const { error: updateError } = await admin
          .from('profiles')
          .update({ school_id: school.id })
          .eq('id', user.id)

        if (updateError) {
          return NextResponse.json({ error: updateError.message }, { status: 400 })
        }
      }
    }

    const { data: finalProfile } = await admin
      .from('profiles')
      .select('id, role, school_id')
      .eq('id', user.id)
      .single()

    // Ensure default class structure exists for staff school accounts.
    if (finalProfile.role !== 'parent') {
      for (const className of DEFAULT_CLASSES) {
        const { data: existingClass } = await admin
          .from('classes')
          .select('id')
          .eq('school_id', finalProfile.school_id)
          .eq('name', className)
          .maybeSingle()

        if (!existingClass) {
          await admin.from('classes').insert({
            school_id: finalProfile.school_id,
            name: className,
            level: className,
            section: 'A',
            academic_year: '2025',
            term: 'Term 1',
          })
        }
      }
    }

    return NextResponse.json({ ok: true, profile: finalProfile })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Onboarding failed' }, { status: 500 })
  }
}
