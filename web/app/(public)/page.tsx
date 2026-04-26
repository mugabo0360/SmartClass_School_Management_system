// app/(public)/page.tsx
import Link from 'next/link'
import { 
  Brain, 
  Users, 
  FileText, 
  Smartphone, 
  Shield, 
  TrendingUp,
  CheckCircle,
  Star,
  Phone
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">SmartClass</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600">Login</Link>
            <Link href="/signup" className="sc-btn-primary text-sm">Get Started Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sc-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-sm mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            NCDC & CBC Compliant · Made for Uganda
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The Smartest Way to<br />
            <span className="text-amber-400">Run Your School</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            AI-powered school management that writes CBC report cards, generates lesson plans, 
            and collects fees via MTN & Airtel Money — in minutes, not hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" 
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors">
              Start Free Trial →
            </Link>
            <a href="https://wa.me/256YOUR_NUMBER?text=Hello%2C%20I%20want%20to%20learn%20about%20SmartClass"
              target="_blank"
              className="bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-8 rounded-xl text-lg border border-white/30 transition-colors flex items-center gap-2 justify-center">
              <Phone className="w-5 h-5" /> WhatsApp Demo
            </a>
          </div>
          
          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-8 text-blue-200 text-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div>NCDC Aligned</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">MTN</div>
              <div>& Airtel Money</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">AI</div>
              <div>Report Writing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points → Solution */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Problems SmartClass Solves</h2>
          <p className="text-gray-600 text-center mb-10">Every Ugandan teacher knows these struggles.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                problem: "Writing CBC report cards takes teachers 2-3 days per term",
                solution: "SmartClass AI generates descriptive remarks in seconds from scores you enter",
                icon: "📝"
              },
              {
                problem: "Parents never know their child's progress until report day",
                solution: "Parents get real-time updates via SMS/app in plain language — no jargon",
                icon: "👨‍👩‍👧"
              },
              {
                problem: "Chasing school fees by calling parents one by one",
                solution: "Parents pay via MTN/Airtel MoMo and get instant digital receipts",
                icon: "💰"
              },
              {
                problem: "Lesson planning consumes Sunday evenings every week",
                solution: "AI generates NCDC-aligned lesson plans and schemes of work instantly",
                icon: "📚"
              }
            ].map((item, i) => (
              <div key={i} className="sc-card">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0">✗</div>
                  <p className="text-gray-600 text-sm">{item.problem}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-800 text-sm font-medium">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Everything Your School Needs</h2>
          <p className="text-gray-600 text-center mb-10">Built specifically for Uganda's curriculum and payment systems.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Report Writer",
                desc: "Enter scores → AI writes full CBC descriptive remarks for every student, every subject. Saves 20+ hours per term.",
                color: "bg-purple-50 text-purple-600"
              },
              {
                icon: FileText,
                title: "Lesson Planner",
                desc: "Generate weekly schemes of work and lesson plans aligned to NCDC curriculum guidelines instantly.",
                color: "bg-blue-50 text-blue-600"
              },
              {
                icon: Users,
                title: "Parent Portal",
                desc: "Parents see child progress in plain language story points. No more waiting for report day.",
                color: "bg-green-50 text-green-600"
              },
              {
                icon: Smartphone,
                title: "Mobile Money Fees",
                desc: "Accept school fees via MTN MoMo and Airtel Money. Automatic receipts, zero chasing.",
                color: "bg-amber-50 text-amber-600"
              },
              {
                icon: TrendingUp,
                title: "UNEB Predictor",
                desc: "For S4 & S6: AI analyzes continuous assessment trends to predict exam performance.",
                color: "bg-red-50 text-red-600"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                desc: "Student data encrypted with AES-256. Complies with Uganda's data protection guidelines.",
                color: "bg-gray-50 text-gray-600"
              }
            ].map((feature, i) => (
              <div key={i} className="sc-card hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 text-center mb-10">Pay per student per term. No hidden fees.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "7,500",
                unit: "UGX/student/term",
                limit: "Up to 100 students",
                setup: "50,000 UGX setup",
                features: ["AI report writing", "Attendance tracking", "Parent portal", "MoMo payments", "Email support"],
                highlighted: false,
                cta: "Start Free Trial"
              },
              {
                name: "School",
                price: "6,500",
                unit: "UGX/student/term",
                limit: "100–300 students",
                setup: "50,000 UGX setup",
                features: ["Everything in Starter", "Lesson plan AI", "UNEB predictor", "SMS notifications", "Priority support"],
                highlighted: true,
                cta: "Most Popular"
              },
              {
                name: "Institution",
                price: "5,500",
                unit: "UGX/student/term",
                limit: "300+ students",
                setup: "Custom setup",
                features: ["Everything in School", "Multi-branch", "Custom reports", "Training included", "Dedicated support"],
                highlighted: false,
                cta: "Contact Us"
              }
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 ${plan.highlighted 
                ? 'sc-gradient text-white shadow-lg scale-105' 
                : 'bg-white border border-gray-200'}`}>
                {plan.highlighted && (
                  <div className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`font-bold text-xl mb-1 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className={`text-3xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-blue-600'}`}>
                  {plan.price}
                </div>
                <div className={`text-sm mb-1 ${plan.highlighted ? 'text-blue-200' : 'text-gray-500'}`}>
                  {plan.unit}
                </div>
                <div className={`text-xs mb-4 ${plan.highlighted ? 'text-blue-200' : 'text-gray-400'}`}>
                  {plan.limit} · {plan.setup}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`text-sm flex items-center gap-2 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup"
                  className={`block text-center py-3 rounded-xl font-medium transition-colors ${
                    plan.highlighted 
                      ? 'bg-amber-400 hover:bg-amber-300 text-amber-900' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            All plans include a 30-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className="py-12 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Star className="w-8 h-8 text-amber-400 mx-auto mb-4" />
          <p className="text-xl font-medium mb-4">
            "SmartClass saved me 3 days of work writing report cards. The AI understood exactly what CBC requires."
          </p>
          <p className="text-blue-200">— Teacher, Kampala Primary School (Beta User)</p>
        </div>
      </section>

      {/* CTA + Contact */}
      <section id="contact" className="py-16 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your School?</h2>
          <p className="text-gray-600 mb-8">
            Join SmartClass today. We'll help you get set up in under 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="sc-btn-primary py-4 px-8 text-lg rounded-xl">
              Start Free — No Credit Card
            </Link>
            <a href="https://wa.me/256YOUR_PHONE?text=I%20want%20a%20SmartClass%20demo"
              className="sc-btn-secondary py-4 px-8 text-lg rounded-xl flex items-center gap-2 justify-center">
              📱 WhatsApp: +256 XXX XXXXXX
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-white text-lg">SmartClass</span>
            </div>
            <p className="text-sm">AI-powered school management for Uganda and East Africa.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><Link href="/login" className="hover:text-white">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>mugjoshua66@gmail.com</li>
              <li>WhatsApp: +256 XXX XXXXXX</li>
              <li>Kampala, Uganda</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          © {new Date().getFullYear()} SmartClass Uganda. All rights reserved. 
          Built with ❤️ for Ugandan educators.
        </div>
      </footer>
    </div>
  )
}
