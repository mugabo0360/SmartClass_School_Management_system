# SmartClass — AI-Powered School Management System
### Built for Uganda · NCDC/CBC Compliant · Powered by Gemini AI

**Version:** 1.0.0  
**Developer:** Joshua Mugabo  
**Contact:** mugjoshua66@gmail.com  
**Region:** Uganda (East Africa ready)

---

## 🚀 What is SmartClass?

SmartClass is an AI-augmented School Management System designed for Ugandan schools implementing the New Competency-Based Curriculum (CBC). It automates report writing, generates lesson plans, enables parent communication, and accepts MTN/Airtel Mobile Money payments.

---

## 💰 FREE Stack (Zero Cost to Start)

| Service | What it does | Free Limit |
|---|---|---|
| [Supabase](https://supabase.com) | Database + Auth + Storage | 500MB DB, 50K MAU |
| [Vercel](https://vercel.com) | Next.js Hosting | 100GB bandwidth |
| [Google Gemini API](https://aistudio.google.com) | AI features | 60 requests/min FREE |
| [GitHub](https://github.com) | Code + CI/CD | Unlimited public repos |
| MTN MoMo Sandbox | Payment testing | Free sandbox |

**Total monthly cost in Month 1: UGX 0**

---

## 📁 Project Structure

```
smartclass/
├── supabase/          # Database (Supabase)
│   └── migrations/    # SQL schema files
├── backend/           # SmartClass CRM/automation API (Node.js/Express)
├── web/               # Next.js 14 App
│   ├── app/           # Pages & API routes
│   ├── components/    # React components
│   └── lib/           # Utilities & config
├── docs/              # Documentation
└── scripts/           # Deployment scripts
```

---

## ⚡ Quick Start (30 Minutes to Running App)

### Step 1: Prerequisites
Install these tools on your computer:
- [VS Code](https://code.visualstudio.com/) — free code editor
- [Node.js 18+](https://nodejs.org/) — JavaScript runtime
- [Git](https://git-scm.com/) — version control

### Step 2: Clone and Install
```bash
git clone https://github.com/YOUR_USERNAME/smartclass.git
cd smartclass/web
npm install
cd ../backend
npm install
```

### Step 3: Create Free Accounts
1. **Supabase**: Go to https://supabase.com → "Start for free" → Create project named "smartclass"
2. **Vercel**: Go to https://vercel.com → Sign up with GitHub
3. **Gemini**: Go to https://aistudio.google.com → Get API key (free)

### Step 4: Set Up Environment Variables
Copy `.env.example` to `.env.local` and fill in your keys:
```bash
cp .env.example .env.local
```

### Step 5: Run Database Migrations
In Supabase dashboard → SQL Editor → paste and run each file in `supabase/migrations/` in order.

### Step 6: Start Development
```bash
# terminal 1
cd web
npm run dev

# terminal 2
cd backend
npm run dev
```
Visit http://localhost:3000 ✅

---

## 🚀 Deploy to Production (Free on Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Your app will be live at: `https://smartclass-YOUR_NAME.vercel.app`

---

## 💵 Pricing Strategy (Month 1)

| Plan | Price | Target |
|---|---|---|
| Basic School | 7,500 UGX/student/term | Schools < 100 students |
| Standard School | 6,500 UGX/student/term | Schools 100-300 students |
| Setup Fee | 50,000 UGX one-time | All new schools |

**Month 1 Survival Math:**
- 1 school × 60 students = 450,000 UGX + 50,000 setup = **500,000 UGX**
- 3 schools × avg 80 students = 1,800,000 UGX + 150,000 = **~2M UGX/term**

---

## 📞 Support
- Email: mugjoshua66@gmail.com
- WhatsApp: [Your number]

---

*SmartClass is built for Uganda. East Africa expansion planned for Year 2.*
