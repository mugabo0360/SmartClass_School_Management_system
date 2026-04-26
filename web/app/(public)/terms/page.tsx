// app/(public)/terms/page.tsx
import Link from 'next/link'
import { Brain } from 'lucide-react'

export default function TermsOfService() {
  const lastUpdated = 'April 2025'
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-gray-900">SmartClass</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Terms of Service</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <p className="text-amber-800 text-sm">
            <strong>Please read these terms carefully.</strong> By creating an account and using SmartClass, 
            you agree to be bound by these Terms of Service. If you do not agree, do not use the service.
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. About SmartClass</h2>
            <p className="text-gray-700 leading-relaxed">
              SmartClass is a cloud-based school management system developed and operated in Uganda. 
              The service provides tools for school administration, student assessment tracking, 
              AI-powered report generation, parent communication, and fee payment processing for 
              educational institutions in Uganda and East Africa.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              SmartClass is operated by Joshua Mugabo, Kampala, Uganda. 
              Contact: mugjoshua66@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Eligibility</h2>
            <p className="text-gray-700 leading-relaxed">By using SmartClass, you confirm that:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
              <li>You are at least 18 years old</li>
              <li>You are authorized to register your school or institution on this platform</li>
              <li>The information you provide is accurate and complete</li>
              <li>You will use the service in compliance with Ugandan law and regulations</li>
              <li>You are not using the service for any unlawful purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Subscription and Payments</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>3.1 Free Trial:</strong> New schools receive a 30-day free trial with full access to all features. No payment information is required during the trial.</p>
              <p><strong>3.2 Pricing:</strong> After the trial, fees are charged per student per term. Current pricing is displayed on our pricing page and may change with 30 days' notice.</p>
              <p><strong>3.3 Payment Methods:</strong> We accept MTN Mobile Money, Airtel Money, and bank transfer. Payments are processed in Uganda Shillings (UGX).</p>
              <p><strong>3.4 Billing Cycle:</strong> Subscriptions are billed per academic term (3 terms per year).</p>
              <p><strong>3.5 Late Payment:</strong> Accounts with overdue balances of more than 30 days may have access suspended until payment is received.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Refund Policy</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>4.1 Setup Fees:</strong> The one-time setup fee is non-refundable once the account has been configured and activated.</p>
              <p><strong>4.2 Subscription Fees:</strong> Subscription fees paid for a current term are non-refundable. We do not provide prorated refunds for partial-term cancellations.</p>
              <p><strong>4.3 Technical Issues:</strong> If SmartClass is unavailable for more than 72 consecutive hours due to our error, we will provide a credit equivalent to the downtime period.</p>
              <p><strong>4.4 Dispute Resolution:</strong> For payment disputes, contact us within 14 days at mugjoshua66@gmail.com. We aim to resolve all disputes within 5 business days.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data and Student Privacy</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>5.1 Data Ownership:</strong> Your school owns all data entered into SmartClass, including student records, assessments, and payment information. We do not claim ownership of your data.</p>
              <p><strong>5.2 Data Protection:</strong> We implement industry-standard security measures including AES-256 encryption for data at rest and TLS for data in transit.</p>
              <p><strong>5.3 No Data Selling:</strong> We will never sell your school's data or student information to third parties for any purpose.</p>
              <p><strong>5.4 AI Processing:</strong> Assessment data may be processed by AI services (Google Gemini) solely to generate report remarks. This data is not retained by AI providers beyond the immediate processing request.</p>
              <p><strong>5.5 Data Retention:</strong> We retain your data for as long as your account is active, plus 2 years after closure (for legal compliance). You may request complete data deletion at any time.</p>
              <p><strong>5.6 Minor's Data:</strong> As your platform processes data about students who may be minors, you (the school) are responsible for obtaining appropriate consents from parents or guardians as required by applicable law.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Acceptable Use</h2>
            <p className="text-gray-700 mb-2">You agree NOT to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Enter false or misleading student data</li>
              <li>Share login credentials between multiple schools</li>
              <li>Attempt to access other schools' data</li>
              <li>Use the platform to harass students, parents, or teachers</li>
              <li>Reverse-engineer, copy, or resell any part of the SmartClass software</li>
              <li>Use automated scripts or bots to access the service</li>
              <li>Circumvent any payment or billing features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. AI Features and Accuracy</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>7.1 AI-Generated Content:</strong> SmartClass uses AI (Google Gemini) to generate report remarks, lesson plans, and predictions. These are suggestions only.</p>
              <p><strong>7.2 Teacher Responsibility:</strong> Teachers are responsible for reviewing, editing, and approving all AI-generated content before it is used in official school reports.</p>
              <p><strong>7.3 UNEB Predictions:</strong> Any exam performance predictions are estimates based on available data and should not be taken as guaranteed outcomes.</p>
              <p><strong>7.4 No Guarantee of Accuracy:</strong> While we strive for accuracy, SmartClass does not guarantee that AI-generated content will be free from errors.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Service Availability</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>8.1 Uptime Target:</strong> We aim for 99% uptime but do not guarantee uninterrupted service.</p>
              <p><strong>8.2 Maintenance:</strong> Scheduled maintenance will be announced at least 24 hours in advance via email.</p>
              <p><strong>8.3 Internet Dependency:</strong> SmartClass requires internet access. We are not responsible for connectivity issues on your end.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by Ugandan law, SmartClass shall not be liable for any 
              indirect, incidental, or consequential damages arising from your use of the service, 
              including but not limited to loss of data, loss of revenue, or errors in AI-generated content. 
              Our total liability shall not exceed the amount you paid for the service in the 3 months 
              preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Termination</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>By You:</strong> You may cancel your account at any time by contacting us. Cancellation takes effect at the end of the current billing period.</p>
              <p><strong>By Us:</strong> We may terminate or suspend accounts that violate these terms, with or without notice, depending on the severity of the violation.</p>
              <p><strong>Data Export:</strong> Upon request, we will provide a full export of your school's data within 14 days of account closure.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms are governed by the laws of Uganda. Any disputes shall be subject to the 
              jurisdiction of the courts of Uganda, specifically the courts of Kampala. We encourage 
              resolving disputes amicably through direct communication before resorting to legal action.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms from time to time. We will notify you by email at least 14 days 
              before significant changes take effect. Continued use after the effective date constitutes 
              acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">13. Contact</h2>
            <div className="bg-gray-100 rounded-xl p-4 text-gray-700">
              <p><strong>SmartClass Uganda</strong></p>
              <p>Joshua Mugabo</p>
              <p>Kampala, Uganda</p>
              <p>Email: mugjoshua66@gmail.com</p>
              <p>WhatsApp: +256 XXX XXXXXX</p>
            </div>
          </section>
        </div>

        <div className="mt-12 flex gap-4">
          <Link href="/privacy" className="sc-btn-secondary">Privacy Policy</Link>
          <Link href="/signup" className="sc-btn-primary">Accept & Create Account</Link>
        </div>
      </div>
    </div>
  )
}
