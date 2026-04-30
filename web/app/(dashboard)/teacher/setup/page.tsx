'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function TeacherSetupPage() {
  const router = useRouter()
  const [schoolName, setSchoolName] = useState('SmartClass Demo School')
  const [district, setDistrict] = useState('Kampala')
  const [loading, setLoading] = useState(false)

  const handleSetup = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ school_name: schoolName, school_district: district }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json?.error || 'Setup failed')

      toast.success('Setup complete')
      router.push('/teacher/dashboard')
      router.refresh()
    } catch (error: any) {
      toast.error(error?.message || 'Setup failed. Run the SQL migration first.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="sc-card">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Account Setup</h1>
        <p className="text-gray-600 mb-6">
          Link your account to a school so students, assessments, and reports can load.
        </p>

        <div className="space-y-4">
          <div>
            <label className="sc-label">School Name</label>
            <input className="sc-input" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
          </div>
          <div>
            <label className="sc-label">District</label>
            <input className="sc-input" value={district} onChange={(e) => setDistrict(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={handleSetup} disabled={loading} className="sc-btn-primary disabled:opacity-60">
            {loading ? 'Setting up...' : 'Finish Setup'}
          </button>
          <Link href="/teacher/dashboard" className="sc-btn-secondary">
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}
