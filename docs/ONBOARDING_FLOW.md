# SmartClass Onboarding Flow

This document explains how a new school can register from the browser and start using SmartClass without manual SQL steps.

## Goal

When a user signs up and logs in:

1. Their auth account exists in Supabase Auth.
2. A `profiles` row exists in `public.profiles`.
3. A `schools` row exists in `public.schools`.
4. `profiles.school_id` is linked.
5. Default classes are auto-created:
   - Primary: `P1` to `P7`
   - Secondary: `S1` to `S6`

## Current Implementation

- Endpoint: `POST /api/onboarding/complete`
- File: `web/app/api/onboarding/complete/route.ts`
- Admin client: `web/lib/supabase/admin.ts`

The endpoint:

- checks current logged-in user via server-side Supabase session
- creates missing profile (if needed)
- creates missing school (if needed)
- links profile to school
- creates default class structure for that school
- returns final profile payload

## Trigger Points

- Login page calls this endpoint after successful sign-in:
  - `web/app/(auth)/login/page.tsx`
- Teacher setup page also calls this endpoint:
  - `web/app/(dashboard)/teacher/setup/page.tsx`
- Parent signup uses school selection from public schools API:
  - `GET /api/public/schools`
  - `web/app/(auth)/signup/page.tsx`

## Parent Role Flow

When role is `parent`:

1. Parent selects an existing school during signup.
2. Parent account stores `school_id` in auth user metadata.
3. On first login, onboarding API creates profile and links it to selected school.
4. Parent is redirected to `/parent/dashboard`.

## Required Environment Variables

In `web/.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

After updating env values, restart:

```bash
cd web
npm run dev
```

## Verification Checklist

1. Register a new school account in browser.
2. Login with the new account.
3. Open `teacher/students`.
4. Confirm:
   - school name appears
   - classes (`P1-P7`, `S1-S6`) are available in class dropdown
   - student create/edit/delete works

## Notes

- Student "delete" is soft delete (`is_active = false`) to avoid FK conflicts.
- If actions fail due to permissions, re-run:
  - `supabase/migrations/001_initial_schema.sql`
  - `supabase/migrations/002_auth_and_school_policies_fix.sql`
