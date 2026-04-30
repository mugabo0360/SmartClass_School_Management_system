// app/(auth)/login/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { Brain, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleResendVerification = async () => {
    if (!form.email) {
      toast.error('Enter your email first')
      return
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: form.email,
    })

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Verification email sent. Check inbox/spam.')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      if (error.message.toLowerCase().includes('invalid login credentials')) {
        toast.error('Invalid credentials or email not verified. Check your inbox, then try again.')
      } else {
        toast.error(error.message)
      }
      setLoading(false)
      return
    }

    // Complete profile + school onboarding via server API (service-role path).
    const setupRes = await fetch('/api/onboarding/complete', { method: 'POST' })
    const setupJson = await setupRes.json().catch(() => ({}))
    if (!setupRes.ok) {
      toast.error(setupJson?.error || 'Could not complete onboarding')
      setLoading(false)
      return
    }
    const resolvedProfile = setupJson?.profile

    const role = resolvedProfile?.role
    if (role === 'teacher' || role === 'admin' || role === 'super_admin') {
      router.push('/teacher/dashboard')
    } else if (role === 'parent') {
      router.push('/parent/dashboard')
    } else {
      router.push('/teacher/dashboard')
    }
    
    toast.success('Welcome back!')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">SmartClass</h1>
          <p className="text-blue-300 text-sm mt-1">AI School Management · Uganda</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sign In</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="sc-label">Email Address</label>
              <input
                type="email"
                className="sc-input"
                placeholder="teacher@school.ac.ug"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="sc-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="sc-input pr-10"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="button"
              onClick={handleResendVerification}
              className="text-sm text-blue-600 hover:underline"
            >
              Resend verification email
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sc-btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 font-medium hover:underline">
              Register your school
            </Link>
          </div>
        </div>

        {/* Demo access */}
        <div className="mt-4 text-center text-sm text-blue-300">
          <a href="https://wa.me/256YOUR_PHONE?text=I%20need%20a%20SmartClass%20demo%20account"
            className="hover:text-white">
            📱 Need a demo account? WhatsApp us
          </a>
        </div>
      </div>
    </div>
  )
}
