'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MailCheck, RefreshCcw } from 'lucide-react'

export default function CheckInboxPage() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setEmail(params.get('email'))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl p-8 shadow-2xl">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-5">
          <MailCheck className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your inbox</h1>
        <p className="text-gray-600 mb-4">
          We sent a verification link to <span className="font-semibold">{email || 'your email address'}</span>.
          Open that email and click the link to activate your SmartClass account.
        </p>
        <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1 mb-6">
          <li>Check spam or promotions if you do not see it within 2 minutes.</li>
          <li>Use the same browser when opening the verification link.</li>
          <li>After confirming, come back and sign in.</li>
        </ul>
        <div className="flex flex-wrap gap-3">
          <Link href="/login" className="sc-btn-primary">
            Continue to Login
          </Link>
          <Link href="/signup" className="sc-btn-secondary inline-flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" />
            Try Another Email
          </Link>
        </div>
      </div>
    </div>
  )
}
