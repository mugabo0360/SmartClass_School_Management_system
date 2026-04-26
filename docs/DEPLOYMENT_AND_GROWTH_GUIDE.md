# SmartClass: Complete Deployment Guide + First Customer Playbook
## Your Step-by-Step Path to Revenue in 30 Days

---

## PART 1: DEVELOPMENT ENVIRONMENT SETUP (Day 1 - 2 hours)

### Install VS Code Extensions
Open VS Code and install these extensions (Ctrl+Shift+X):
1. `ES7+ React/Redux/React-Native snippets` — faster component coding
2. `Tailwind CSS IntelliSense` — autocomplete for CSS classes
3. `Prettier - Code formatter` — auto-format code
4. `GitLens` — Git history
5. `Supabase` — database helpers

### VS Code Settings
Add to `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "\"([^\"]*)\""]
  ]
}
```

---

## PART 2: FREE ACCOUNT SETUP (Day 1-2, 3 hours)

### 1. GitHub (Free)
- Go to https://github.com/signup
- Create account: username = `smartclass-ug` or similar
- Create new repository: `smartclass` — set to Private
- Follow the instructions to push your code

### 2. Supabase (Free — $0/month for your first school)
1. Go to https://supabase.com → "Start for free"
2. Create new project:
   - Name: `smartclass`
   - Database Password: Use a strong password, SAVE IT
   - Region: Choose `EU West 1` (closest to Uganda with good latency)
3. After project creates (2 minutes), go to:
   - Settings → API → Copy `Project URL` and `anon public` key
   - Paste into your `.env.local` file
4. Go to SQL Editor → paste `supabase/migrations/001_initial_schema.sql` → click Run

### 3. Google Gemini API (FREE — 60 requests/minute)
1. Go to https://aistudio.google.com
2. Sign in with your Google account
3. Click "Get API Key" → "Create API key"
4. Copy the key → paste into `.env.local` as `GEMINI_API_KEY`

**Free limits:** 60 requests/minute, 1 million tokens/day — MORE than enough for 10 schools!

### 4. Vercel (Free hosting)
1. Go to https://vercel.com → "Sign up with GitHub"
2. Import your `smartclass` repository
3. Set "Root Directory" to `web`
4. Add all your `.env.local` variables under "Environment Variables"
5. Click Deploy → your app is live in 3 minutes!

### 5. MTN MoMo Sandbox (Free for testing)
1. Go to https://momodeveloper.mtn.com
2. Register as developer
3. Subscribe to "Collections" product (free)
4. Get your Subscription Key → add to `.env.local`

---

## PART 3: LOCAL DEVELOPMENT

```bash
# Clone your repo
git clone https://github.com/YOUR_USERNAME/smartclass.git
cd smartclass/web

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Now edit .env.local with your actual keys

# Start development server
npm run dev
# Open http://localhost:3000
```

---

## PART 4: DEPLOY TO PRODUCTION

### Using Vercel (Recommended — Free)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from web/ folder
cd web
vercel --prod
```

Your app will be at: `https://smartclass-xyz.vercel.app`

### Custom Domain (Optional — ~$10/year)
If you want `www.smartclassuganda.com`:
1. Buy domain at https://namecheap.com (~$10/year for .com)
2. In Vercel dashboard → Domains → Add your domain
3. Follow DNS instructions

**For now, Vercel's free subdomain works perfectly for getting your first customers!**

---

## PART 5: GET YOUR FIRST CUSTOMER (Week 4)

### The 5-School Outreach Strategy

**Target Schools:**
- Primary/secondary schools in Kampala, Wakiso, Mukono
- Schools with 50-200 students (affordable, decision-maker is reachable)
- Schools you have ANY personal connection to

### Script: WhatsApp Message to Head Teachers
```
Hello [Head Teacher's Name],

My name is Joshua Mugabo. I've built SmartClass — a digital tool specifically 
for Ugandan schools that:

✅ Writes CBC report card remarks automatically (saves teachers 2-3 days per term)
✅ Parents can see their child's progress any time
✅ Accepts school fees via MTN/Airtel MoMo
✅ Generates NCDC-aligned lesson plans instantly

I'd love to give you a FREE demo at your school this week. 
No cost, no commitment.

Would 30 minutes this week work for you?

Joshua
SmartClass Uganda
```

### Demo Script (30-minute school visit)
1. **Minutes 1-5:** "What's your biggest admin challenge?" (Let them talk)
2. **Minutes 5-15:** Show the dashboard → enter a real student's scores → show AI generates the remark in 3 seconds
3. **Minutes 15-20:** Show the parent portal with "Story Points"
4. **Minutes 20-25:** Show payment tracking and MoMo integration
5. **Minutes 25-30:** Offer the deal (see below)

### The Deal to Close First 3 Schools

**Introductory Offer (Month 1 only):**
- First month FREE (they just need to set up the data)
- Only pay from Term 2: 7,500 UGX per student
- No setup fee for first 5 schools
- 1-hour free training included

**Month 1 Revenue Math:**
Even with this offer, your term 2 pipeline looks like:
- 3 schools × average 80 students × 7,500 UGX = **1,800,000 UGX**
- Plus setup fees when you charge them from school 6+: 50,000 UGX each

---

## PART 6: MARKETING STRATEGIES (Month 1-3)

### Free Marketing Channels

**1. WhatsApp Groups** (Most effective in Uganda)
- Join teacher WhatsApp groups — most districts have them
- Share: "I built a free CBC report writing tool for Ugandan teachers. DM me for free access."

**2. Facebook Groups**
- "Uganda Teachers Forum" — post about CBC automation
- "Ugandan Educators Network"
- "Head Teachers Uganda"

**3. Visit Teacher Training Colleges**
- Reach out to student teachers about to start their careers
- They'll recommend you to their first schools

**4. Church Network**
- Many Ugandan schools are church-founded
- Talk to church administrators

**5. Personal Network**
- Every teacher you know is a potential customer or referral
- Ask: "Do you know 3 schools that struggle with CBC reports?"

### Content Marketing (Free)
Post weekly on Facebook/WhatsApp:
- "5 minutes to write a CBC report vs 5 days manually — watch this"
- "How Kampala Primary School saved 40 teacher-hours with SmartClass"
- Before/after screenshots of report cards

---

## PART 7: REVENUE PROJECTIONS

### Year 1 Conservative Estimate
```
Month 1:  3 schools onboarded (free setup)     = 0 UGX
Month 2:  First payments                        = 1,800,000 UGX
Month 3:  5 schools (2 new)                    = 3,000,000 UGX  
Month 4:  8 schools (3 new + setup fees)       = 4,800,000 + 150,000 = ~5M UGX
Month 6:  15 schools                           = 9,000,000 UGX/term
Month 12: 40 schools                           = 24,000,000 UGX/term (~$6,500 USD)
```

### Year 2: East Africa Expansion
- Kenya: Same CBC curriculum adopted, HUGE market
- Rwanda: Competency-based education
- Tanzania: Growing private school sector

**By Year 2:** 200+ schools across East Africa = 100M+ UGX/term

---

## PART 8: SCALING PLAN

### Phase 1 (Month 1-6): Uganda Kampala
- Target: 30 schools
- Focus: Perfect the product based on real feedback
- Team: Just you

### Phase 2 (Month 6-12): Uganda National
- Target: 100 schools
- Hire: 1 sales person on commission (10% of each school they bring)
- Add: SMS integration with Africa's Talking API (affordable)

### Phase 3 (Year 2): East Africa
- Partner with local resellers in Kenya, Rwanda
- White-label option for NGOs and education organizations
- Target: 500 schools

---

## SURVIVAL BUDGET TRACKER

### Monthly Costs (Once you have 10+ paying schools)
- Supabase Pro: $25/month (upgrade when you exceed free tier)
- Vercel Pro: $20/month (upgrade when traffic grows)
- Domain: ~$10/year
- Google Gemini: Free (1M tokens/day)
- MTN MoMo: 1-2% transaction fee (paid by school)

**Total costs at 10 schools: ~$45/month = ~165,000 UGX**
**Revenue at 10 schools (avg 60 students): 4,500,000 UGX/term = 1,500,000 UGX/month**
**Profit margin: ~90%** ✅

---

## EMERGENCY CONTACTS

If Supabase has issues: support@supabase.io
If Vercel has issues: https://vercel.com/support
Gemini API issues: https://ai.google.dev/gemini-api/docs

---

*Remember Joshua: Your first customer just needs to trust you, not have a perfect product.
Get in front of teachers, show them the time you save, and the money will follow.*
