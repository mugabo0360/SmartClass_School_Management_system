// app/(auth)/signup/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { Brain, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    school_name: '',
    school_district: '',
    school_type: 'Primary',
    role: 'teacher',
    // Legal checkboxes
    accepted_terms: false,
    accepted_privacy: false,
    accepted_data_processing: false,
    confirm_legal_authority: false,
  })

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (form.password !== form.confirm_password) {
      toast.error('Passwords do not match')
      return
    }
    if (!form.accepted_terms || !form.accepted_privacy || !form.accepted_data_processing) {
      toast.error('Please accept all required terms to continue')
      return
    }

    setLoading(true)

    try {
      // Create user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.full_name,
            role: form.role,
            phone: form.phone,
          }
        }
      })

      if (error) throw error

      // Create school record
      if (form.school_name && data.user) {
        const { data: school, error: schoolError } = await supabase
          .from('schools')
          .insert({
            name: form.school_name,
            district: form.school_district,
            school_type: form.school_type,
            email: form.email,
            phone: form.phone,
          })
          .select()
          .single()

        if (!schoolError && school) {
          // Link user to school
          await supabase
            .from('profiles')
            .update({ 
              school_id: school.id,
              accepted_terms: true,
              accepted_terms_at: new Date().toISOString(),
            })
            .eq('id', data.user.id)
        }
      }

      toast.success('Account created! Check your email to verify.')
      router.push('/login?message=Check your email to confirm your account')
      
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const ugandaDistricts = [
    'Kampala', 'Wakiso', 'Mukono', 'Jinja', 'Mbarara', 'Gulu', 'Lira', 
    'Arua', 'Fort Portal', 'Mbale', 'Masaka', 'Entebbe', 'Other'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Register Your School on SmartClass</h1>
          <p className="text-blue-300 text-sm mt-1">Free 30-day trial • No credit card required</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step > s ? 'bg-green-500 text-white' : step === s ? 'bg-blue-500 text-white' : 'bg-white/20 text-white/50'
              }`}>
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-green-500' : 'bg-white/20'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={step === 3 ? handleSignup : (e) => { e.preventDefault(); setStep(step + 1) }}>
            
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Your Information</h2>
                <div>
                  <label className="sc-label">Full Name *</label>
                  <input className="sc-input" placeholder="Joshua Mugabo" value={form.full_name}
                    onChange={e => setForm({...form, full_name: e.target.value})} required />
                </div>
                <div>
                  <label className="sc-label">Email Address *</label>
                  <input type="email" className="sc-input" placeholder="teacher@school.ug"
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                </div>
                <div>
                  <label className="sc-label">Phone (WhatsApp) *</label>
                  <input className="sc-input" placeholder="+256 700 000000" value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})} required />
                </div>
                <div>
                  <label className="sc-label">Your Role</label>
                  <select className="sc-input" value={form.role}
                    onChange={e => setForm({...form, role: e.target.value})}>
                    <option value="admin">Head Teacher / Administrator</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
                <button type="submit" className="w-full sc-btn-primary py-3">
                  Continue →
                </button>
              </div>
            )}

            {/* Step 2: School Info */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">School Information</h2>
                <div>
                  <label className="sc-label">School Name *</label>
                  <input className="sc-input" placeholder="Kampala Junior School" value={form.school_name}
                    onChange={e => setForm({...form, school_name: e.target.value})} required />
                </div>
                <div>
                  <label className="sc-label">District *</label>
                  <select className="sc-input" value={form.school_district}
                    onChange={e => setForm({...form, school_district: e.target.value})} required>
                    <option value="">Select District</option>
                    {ugandaDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="sc-label">School Type</label>
                  <select className="sc-input" value={form.school_type}
                    onChange={e => setForm({...form, school_type: e.target.value})}>
                    <option value="Primary">Primary (P1-P7)</option>
                    <option value="Secondary">Secondary (S1-S6)</option>
                    <option value="Combined">Combined (Primary + Secondary)</option>
                  </select>
                </div>
                <div>
                  <label className="sc-label">Password *</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} className="sc-input pr-10"
                      placeholder="Minimum 8 characters" value={form.password}
                      onChange={e => setForm({...form, password: e.target.value})} required minLength={8} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="sc-label">Confirm Password *</label>
                  <input type="password" className="sc-input" placeholder="Re-enter password"
                    value={form.confirm_password}
                    onChange={e => setForm({...form, confirm_password: e.target.value})} required />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="sc-btn-secondary py-3 flex-1">
                    ← Back
                  </button>
                  <button type="submit" className="sc-btn-primary py-3 flex-1">
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Legal Agreement */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Terms & Agreement</h2>
                <p className="text-sm text-gray-500 mb-4">Please read and accept the following before creating your account.</p>
                
                {/* Terms checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" 
                      checked={form.accepted_terms}
                      onChange={e => setForm({...form, accepted_terms: e.target.checked})}
                      className="mt-1 rounded border-gray-300 text-blue-600 flex-shrink-0"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I have read and agree to SmartClass's{' '}
                      <Link href="/terms" target="_blank" className="text-blue-600 hover:underline font-medium">
                        Terms of Service
                      </Link>{' '}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox"
                      checked={form.accepted_privacy}
                      onChange={e => setForm({...form, accepted_privacy: e.target.checked})}
                      className="mt-1 rounded border-gray-300 text-blue-600 flex-shrink-0"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I have read and agree to the{' '}
                      <Link href="/privacy" target="_blank" className="text-blue-600 hover:underline font-medium">
                        Privacy Policy
                      </Link>{' '}
                      and understand how student data is protected{' '}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox"
                      checked={form.accepted_data_processing}
                      onChange={e => setForm({...form, accepted_data_processing: e.target.checked})}
                      className="mt-1 rounded border-gray-300 text-blue-600 flex-shrink-0"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I consent to SmartClass processing student data as described in the Privacy Policy. 
                      I understand this data will not be sold to third parties{' '}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox"
                      checked={form.confirm_legal_authority}
                      onChange={e => setForm({...form, confirm_legal_authority: e.target.checked})}
                      className="mt-1 rounded border-gray-300 text-blue-600 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700">
                      I confirm that I am authorized by my school to register and use this platform
                    </span>
                  </label>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
                  <strong>Data Protection:</strong> All student data is encrypted and stored securely. 
                  SmartClass complies with Uganda's data protection guidelines. Your data will never be sold.
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)} className="sc-btn-secondary py-3 flex-1">
                    ← Back
                  </button>
                  <button type="submit" disabled={loading || !form.accepted_terms || !form.accepted_privacy || !form.accepted_data_processing}
                    className="sc-btn-primary py-3 flex-1 flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Creating...</> : 'Create Account ✓'}
                  </button>
                </div>
              </div>
            )}
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
