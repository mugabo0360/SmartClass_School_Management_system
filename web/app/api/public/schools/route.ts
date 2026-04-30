import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const admin = createAdminClient()
    const { data, error } = await admin
      .from('schools')
      .select('id, name, district')
      .order('name', { ascending: true })
      .limit(200)

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ schools: data || [] })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to load schools' }, { status: 500 })
  }
}
