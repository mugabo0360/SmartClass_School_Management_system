import Link from 'next/link'
import { Brain } from 'lucide-react'

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-gray-900">SmartClass</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Refund Policy</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Refund Policy</h1>
        <p className="text-gray-600">Last updated: April 2026</p>

        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">1) Trial period</h2>
          <p className="text-gray-700">
            Every new school gets a free trial. During trial, you can cancel anytime with no charges.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">2) Setup fees</h2>
          <p className="text-gray-700">
            Setup fees are non-refundable once onboarding, data import, or staff training has started.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">3) Subscription payments</h2>
          <p className="text-gray-700">
            Term subscription payments are generally non-refundable. If service disruption caused by SmartClass exceeds 72 consecutive hours,
            you may request service credit for the affected period.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">4) Contact for refund requests</h2>
          <p className="text-gray-700">
            Send refund questions within 14 days of payment to <strong>mugjoshua66@gmail.com</strong>. We reply within 5 business days.
          </p>
        </section>
      </div>
    </div>
  )
}
