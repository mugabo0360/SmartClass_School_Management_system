-- ============================================================
-- SmartClass Policy Fixes
-- Migration: 002_auth_and_school_policies_fix.sql
-- Purpose:
-- 1) Allow authenticated users to create their own profile row when missing
-- 2) Allow authenticated users to create a school during onboarding
-- ============================================================

-- PROFILES: allow user to insert own profile row
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile" ON public.profiles
      FOR INSERT
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Required table privileges for authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.schools TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.students TO authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.classes TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.profiles TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.schools TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.students TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.classes TO service_role;

-- STUDENTS: allow school staff to insert/update students in their own school
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'students'
      AND policyname = 'School staff insert students'
  ) THEN
    CREATE POLICY "School staff insert students" ON public.students
      FOR INSERT
      WITH CHECK (
        school_id = get_user_school_id()
        AND get_user_role() IN ('teacher', 'admin', 'super_admin')
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'students'
      AND policyname = 'School staff delete students'
  ) THEN
    CREATE POLICY "School staff delete students" ON public.students
      FOR DELETE
      USING (
        school_id = get_user_school_id()
        AND get_user_role() IN ('teacher', 'admin', 'super_admin')
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'students'
      AND policyname = 'School staff update students'
  ) THEN
    CREATE POLICY "School staff update students" ON public.students
      FOR UPDATE
      USING (
        school_id = get_user_school_id()
        AND get_user_role() IN ('teacher', 'admin', 'super_admin')
      )
      WITH CHECK (
        school_id = get_user_school_id()
        AND get_user_role() IN ('teacher', 'admin', 'super_admin')
      );
  END IF;
END $$;

-- SCHOOLS: allow authenticated users to create a school during signup
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'schools'
      AND policyname = 'Authenticated users can create schools'
  ) THEN
    CREATE POLICY "Authenticated users can create schools" ON public.schools
      FOR INSERT
      WITH CHECK (auth.uid() IS NOT NULL);
  END IF;
END $$;

