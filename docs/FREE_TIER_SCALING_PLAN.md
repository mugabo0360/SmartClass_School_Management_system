# SmartClass Free-Tier Scaling Plan (0 to 1,000 Users)

This guide keeps monthly cost at zero (or near zero) early on while preparing the system to scale.

## 1) Free-first architecture

- Web app: Vercel free plan (`web`)
- Database/Auth/Storage: Supabase free plan (`supabase`)
- API: existing Node backend (`backend`) on free host when needed
- AI: Gemini free tier with strict quotas and fallback templates

## 2) Scaling targets by stage

### Stage A: 0 to 100 active users
- Run `web` + `backend` with light logging.
- Keep AI optional (`AI_MODE=free` or `off`).
- Enable caching for repeated report/remark requests.

### Stage B: 100 to 400 active users
- Add request throttling on auth and AI endpoints.
- Use pagination for students/assessments endpoints.
- Move heavy report generation to background jobs.

### Stage C: 400 to 1,000 active users
- Keep most reads on Supabase with indexed queries.
- Use role-based API responses to reduce payload size.
- Add queue-based jobs for AI/report generation.
- Track daily quotas and disable non-critical AI near limits.

## 3) Non-negotiable engineering rules

- Database access must use Row Level Security.
- Every list endpoint must support page + limit.
- Every expensive endpoint must support cache.
- AI endpoints must return fallback output if quota is reached.
- Webhooks and payment callbacks must be idempotent.

## 4) Operational limits for free plan

- AI defaults:
  - `AI_MODE=free`
  - `AI_MAX_REQUESTS_PER_MINUTE=20`
  - `AI_MAX_REQUESTS_PER_DAY=500`
- Cache defaults:
  - `CACHE_TTL_SECONDS=300`
- Payment defaults:
  - MTN/Airtel sandbox only until production readiness.

## 5) Upgrade triggers (only when revenue supports it)

Upgrade from free tier only when any threshold is crossed for 2+ weeks:
- sustained > 70% database/storage usage
- AI quota exhausted before school day ends
- API response time > 1.5s at normal peak
- active users > 1,000

## 6) First implementation checklist

- [ ] Add per-endpoint rate limiting for auth + AI routes
- [ ] Add pagination to assessment/student list APIs
- [ ] Add response caching for report + AI endpoints
- [ ] Add background job pattern for heavy generation tasks
- [ ] Add usage metrics dashboard (requests/day, AI calls/day)
