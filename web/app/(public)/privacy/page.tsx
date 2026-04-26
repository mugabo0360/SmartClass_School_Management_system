// app/(public)/privacy/page.tsx
import Link from 'next/link'
import { Brain } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-gray-900">SmartClass</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Privacy Policy</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: April 2025</p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <p className="text-blue-800 text-sm font-medium">
            SmartClass takes student privacy seriously. We never sell student data. 
            This policy explains exactly what we collect, why, and how we protect it.
          </p>
        </div>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who We Are</h2>
            <p>SmartClass is operated by Joshua Mugabo, Kampala, Uganda (mugjoshua66@gmail.com). 
            We are the data processor; your school is the data controller for all student information.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. What Data We Collect</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Data Type</th>
                    <th className="px-4 py-2 text-left">Why We Collect It</th>
                    <th className="px-4 py-2 text-left">Who Can Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Teacher name & email', 'Account creation and login', 'Teacher, Admin'],
                    ['Student names & class', 'Assessment and attendance tracking', 'Teacher, Parent (own child only)'],
                    ['Assessment scores (1,2,3)', 'Report generation', 'Teacher, Parent (own child only)'],
                    ['Attendance records', 'Monitoring and reporting', 'Teacher, Parent (own child only)'],
                    ['Payment records', 'Fee management', 'Admin, Parent (own payments)'],
                    ['IP addresses', 'Security and fraud prevention', 'Admin only'],
                  ].map(([type, why, who], i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium">{type}</td>
                      <td className="px-4 py-2">{why}</td>
                      <td className="px-4 py-2 text-blue-600">{who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. AI Data Processing</h2>
            <p className="mb-3">SmartClass uses Google Gemini AI to generate report remarks. When you generate a remark:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We send: student first name, subject, CBC score, and term to the AI</li>
              <li>We do NOT send: student surname, date of birth, ID numbers, or payment data to AI</li>
              <li>Google processes this data under their Privacy Policy but does not retain it for training</li>
              <li>All AI-generated content is reviewed and approved by a teacher before use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Security</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Encryption at rest:</strong> AES-256 (provided by Supabase/PostgreSQL)</li>
              <li><strong>Encryption in transit:</strong> TLS 1.3 for all connections</li>
              <li><strong>Access control:</strong> Row-Level Security ensures schools can only see their own data</li>
              <li><strong>Authentication:</strong> Secure password hashing, optional 2FA</li>
              <li><strong>Backups:</strong> Daily automated backups retained for 30 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Rights</h2>
            <p className="mb-2">Under Ugandan data protection guidelines and good practice, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of all your school's data at any time</li>
              <li><strong>Correction:</strong> Correct any inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your data (we'll comply within 30 days)</li>
              <li><strong>Export:</strong> Export all data in standard formats (CSV, JSON)</li>
              <li><strong>Portability:</strong> Move your data to another system</li>
            </ul>
            <p className="mt-3">To exercise these rights: mugjoshua66@gmail.com</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Sharing</h2>
            <p className="mb-2">We share data ONLY with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Supabase:</strong> Database hosting (GDPR compliant, EU-based)</li>
              <li><strong>Google Gemini:</strong> Only anonymized assessment data for AI remarks (see section 3)</li>
              <li><strong>Vercel:</strong> Web hosting (no access to database data)</li>
              <li><strong>MTN/Airtel:</strong> Only payment transaction data required for processing</li>
            </ul>
            <p className="mt-3 font-medium text-red-700">We NEVER sell data to advertisers, data brokers, or any third party.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Cookies</h2>
            <p>We use only essential cookies for authentication (keeping you logged in). We do not use tracking or advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Contact</h2>
            <div className="bg-gray-100 rounded-xl p-4">
              <p>For privacy concerns or data requests:</p>
              <p className="mt-2"><strong>Email:</strong> mugjoshua66@gmail.com</p>
              <p><strong>WhatsApp:</strong> +256 XXX XXXXXX</p>
              <p><strong>Address:</strong> Kampala, Uganda</p>
              <p className="mt-2 text-sm text-gray-500">We respond to all privacy requests within 5 business days.</p>
            </div>
          </section>
        </div>

        <div className="mt-12 flex gap-4">
          <Link href="/terms" className="sc-btn-secondary">Terms of Service</Link>
          <Link href="/signup" className="sc-btn-primary">Create Account</Link>
        </div>
      </div>
    </div>
  )
}
