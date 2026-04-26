-- ============================================================
-- SmartClass Database Schema
-- Migration: 001_initial_schema.sql
-- Run this FIRST in Supabase SQL Editor
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- SCHOOLS TABLE
-- ============================================================
CREATE TABLE public.schools (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  registration_number TEXT UNIQUE,
  address TEXT,
  district TEXT NOT NULL,
  region TEXT DEFAULT 'Central',
  phone TEXT,
  email TEXT,
  head_teacher_name TEXT,
  school_type TEXT CHECK (school_type IN ('Primary', 'Secondary', 'Combined')) DEFAULT 'Primary',
  subscription_plan TEXT CHECK (subscription_plan IN ('trial', 'basic', 'standard', 'premium')) DEFAULT 'trial',
  subscription_expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROFILES (Users - extends Supabase auth.users)
-- ============================================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id),
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT CHECK (role IN ('admin', 'teacher', 'parent', 'super_admin')) NOT NULL,
  class_assigned TEXT, -- for teachers: "P3A", "S2B" etc
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  onboarding_complete BOOLEAN DEFAULT false,
  accepted_terms BOOLEAN DEFAULT false,
  accepted_terms_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CLASSES
-- ============================================================
CREATE TABLE public.classes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) NOT NULL,
  name TEXT NOT NULL, -- "P3A", "S2B"
  level TEXT NOT NULL, -- "P3", "S2"
  section TEXT DEFAULT 'A',
  teacher_id UUID REFERENCES public.profiles(id),
  academic_year TEXT DEFAULT '2025',
  term TEXT CHECK (term IN ('Term 1', 'Term 2', 'Term 3')) DEFAULT 'Term 1',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STUDENTS
-- ============================================================
CREATE TABLE public.students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) NOT NULL,
  class_id UUID REFERENCES public.classes(id),
  admission_number TEXT NOT NULL,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('Male', 'Female')),
  parent_id UUID REFERENCES public.profiles(id),
  parent_phone TEXT,
  parent_email TEXT,
  is_active BOOLEAN DEFAULT true,
  fee_balance BIGINT DEFAULT 0, -- in UGX
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, admission_number)
);

-- ============================================================
-- SUBJECTS
-- ============================================================
CREATE TABLE public.subjects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id),
  name TEXT NOT NULL, -- "Mathematics", "English Language"
  code TEXT, -- "MATH", "ENG"
  level TEXT, -- "Primary", "Junior Secondary", "Senior Secondary"
  is_ncdc_subject BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default NCDC subjects
INSERT INTO public.subjects (school_id, name, code, level, is_ncdc_subject) VALUES
  (NULL, 'Mathematics', 'MATH', 'Primary', true),
  (NULL, 'English Language', 'ENG', 'Primary', true),
  (NULL, 'Science', 'SCI', 'Primary', true),
  (NULL, 'Social Studies', 'SST', 'Primary', true),
  (NULL, 'Religious Education', 'RE', 'Primary', true),
  (NULL, 'Local Language', 'LL', 'Primary', true),
  (NULL, 'Physical Education', 'PE', 'Primary', true),
  (NULL, 'Art & Craft', 'ART', 'Primary', true),
  (NULL, 'Music', 'MUS', 'Primary', true),
  -- Junior Secondary
  (NULL, 'Mathematics', 'MATH', 'Junior Secondary', true),
  (NULL, 'English Language', 'ENG', 'Junior Secondary', true),
  (NULL, 'Integrated Science', 'ISCI', 'Junior Secondary', true),
  (NULL, 'Social Studies', 'SST', 'Junior Secondary', true),
  (NULL, 'Agriculture', 'AGRI', 'Junior Secondary', true),
  (NULL, 'ICT', 'ICT', 'Junior Secondary', true),
  (NULL, 'Business Studies', 'BUS', 'Junior Secondary', true),
  -- Senior Secondary
  (NULL, 'Mathematics', 'MATH', 'Senior Secondary', true),
  (NULL, 'English Language', 'ENG', 'Senior Secondary', true),
  (NULL, 'Biology', 'BIO', 'Senior Secondary', true),
  (NULL, 'Chemistry', 'CHEM', 'Senior Secondary', true),
  (NULL, 'Physics', 'PHY', 'Senior Secondary', true),
  (NULL, 'History', 'HIST', 'Senior Secondary', true),
  (NULL, 'Geography', 'GEO', 'Senior Secondary', true),
  (NULL, 'Economics', 'ECON', 'Senior Secondary', true);

-- ============================================================
-- ASSESSMENTS (CBC: competency scores 1, 2, 3)
-- ============================================================
CREATE TABLE public.assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) NOT NULL,
  class_id UUID REFERENCES public.classes(id) NOT NULL,
  student_id UUID REFERENCES public.students(id) NOT NULL,
  subject_id UUID REFERENCES public.subjects(id) NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id) NOT NULL,
  assessment_type TEXT CHECK (assessment_type IN ('BOT', 'MOT', 'EOT', 'Continuous', 'Project')) DEFAULT 'Continuous',
  term TEXT CHECK (term IN ('Term 1', 'Term 2', 'Term 3')) NOT NULL,
  academic_year TEXT NOT NULL DEFAULT '2025',
  -- CBC Competency Scores (1=Beginning, 2=Developing, 3=Achieved)
  score INTEGER CHECK (score BETWEEN 1 AND 3),
  -- For numerical marks (optional, used for S4/S6)
  raw_mark DECIMAL(5,2),
  max_mark DECIMAL(5,2) DEFAULT 100,
  competency_area TEXT, -- "Knowledge", "Skills", "Values/Attitudes"
  -- AI generated fields
  ai_remark TEXT, -- AI-generated descriptive remark
  teacher_remark TEXT, -- Teacher's override
  ai_remark_generated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ATTENDANCE
-- ============================================================
CREATE TABLE public.attendance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) NOT NULL,
  class_id UUID REFERENCES public.classes(id) NOT NULL,
  student_id UUID REFERENCES public.students(id) NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id) NOT NULL,
  date DATE NOT NULL,
  status TEXT CHECK (status IN ('Present', 'Absent', 'Late', 'Excused')) DEFAULT 'Present',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, date)
);

-- ============================================================
-- LESSON PLANS (AI generated)
-- ============================================================
CREATE TABLE public.lesson_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id) NOT NULL,
  class_id UUID REFERENCES public.classes(id) NOT NULL,
  subject_id UUID REFERENCES public.subjects(id) NOT NULL,
  title TEXT NOT NULL,
  week_number INTEGER,
  term TEXT CHECK (term IN ('Term 1', 'Term 2', 'Term 3')),
  academic_year TEXT DEFAULT '2025',
  objectives TEXT,
  content TEXT, -- Full lesson plan content (AI generated)
  activities TEXT,
  assessment_criteria TEXT,
  resources_needed TEXT,
  duration_minutes INTEGER DEFAULT 40,
  is_ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- FEE PAYMENTS
-- ============================================================
CREATE TABLE public.fee_payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) NOT NULL,
  student_id UUID REFERENCES public.students(id) NOT NULL,
  parent_id UUID REFERENCES public.profiles(id),
  amount BIGINT NOT NULL, -- in UGX (smallest unit)
  payment_method TEXT CHECK (payment_method IN ('MTN_MOMO', 'AIRTEL_MONEY', 'Cash', 'Bank')) NOT NULL,
  transaction_reference TEXT UNIQUE,
  momo_transaction_id TEXT,
  phone_number TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  term TEXT CHECK (term IN ('Term 1', 'Term 2', 'Term 3')) NOT NULL,
  academic_year TEXT NOT NULL DEFAULT '2025',
  fee_category TEXT DEFAULT 'School Fees', -- "School Fees", "PTA", "Uniform"
  notes TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id),
  user_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('assessment', 'payment', 'attendance', 'report', 'general')) DEFAULT 'general',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- REPORTS (Generated PDFs)
-- ============================================================
CREATE TABLE public.reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) NOT NULL,
  student_id UUID REFERENCES public.students(id) NOT NULL,
  term TEXT NOT NULL,
  academic_year TEXT NOT NULL DEFAULT '2025',
  report_data JSONB, -- full report data
  pdf_url TEXT, -- Supabase storage URL
  generated_by UUID REFERENCES public.profiles(id),
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) - CRITICAL FOR MULTI-TENANT
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- PROFILES: Users can read their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Helper function: get user's school_id
CREATE OR REPLACE FUNCTION get_user_school_id()
RETURNS UUID AS $$
  SELECT school_id FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function: get user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER;

-- SCHOOLS: Users can only see their own school
CREATE POLICY "Users see own school" ON public.schools
  FOR SELECT USING (id = get_user_school_id());

-- CLASSES: School staff see their school's classes
CREATE POLICY "School staff see classes" ON public.classes
  FOR SELECT USING (school_id = get_user_school_id());

CREATE POLICY "Teachers manage classes" ON public.classes
  FOR ALL USING (
    school_id = get_user_school_id() 
    AND get_user_role() IN ('teacher', 'admin', 'super_admin')
  );

-- STUDENTS: Teachers see all students in their school, parents see only their children
CREATE POLICY "Teachers see school students" ON public.students
  FOR SELECT USING (
    school_id = get_user_school_id()
    AND get_user_role() IN ('teacher', 'admin', 'super_admin')
  );

CREATE POLICY "Parents see own children" ON public.students
  FOR SELECT USING (
    parent_id = auth.uid()
    AND get_user_role() = 'parent'
  );

-- ASSESSMENTS: Teachers see/manage their school; parents see their children's
CREATE POLICY "Teachers manage assessments" ON public.assessments
  FOR ALL USING (
    school_id = get_user_school_id()
    AND get_user_role() IN ('teacher', 'admin', 'super_admin')
  );

CREATE POLICY "Parents see children assessments" ON public.assessments
  FOR SELECT USING (
    get_user_role() = 'parent'
    AND student_id IN (
      SELECT id FROM public.students WHERE parent_id = auth.uid()
    )
  );

-- ATTENDANCE: Teachers manage, parents view
CREATE POLICY "Teachers manage attendance" ON public.attendance
  FOR ALL USING (
    school_id = get_user_school_id()
    AND get_user_role() IN ('teacher', 'admin', 'super_admin')
  );

CREATE POLICY "Parents view children attendance" ON public.attendance
  FOR SELECT USING (
    get_user_role() = 'parent'
    AND student_id IN (
      SELECT id FROM public.students WHERE parent_id = auth.uid()
    )
  );

-- FEE PAYMENTS: School admin manages, parents see own
CREATE POLICY "School manages payments" ON public.fee_payments
  FOR ALL USING (
    school_id = get_user_school_id()
    AND get_user_role() IN ('admin', 'super_admin')
  );

CREATE POLICY "Parents see own payments" ON public.fee_payments
  FOR SELECT USING (
    get_user_role() = 'parent'
    AND parent_id = auth.uid()
  );

-- NOTIFICATIONS: Users see their own
CREATE POLICY "Users see own notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'teacher')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON public.schools
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX idx_students_school ON public.students(school_id);
CREATE INDEX idx_students_class ON public.students(class_id);
CREATE INDEX idx_students_parent ON public.students(parent_id);
CREATE INDEX idx_assessments_student ON public.assessments(student_id);
CREATE INDEX idx_assessments_class ON public.assessments(class_id);
CREATE INDEX idx_assessments_term ON public.assessments(term, academic_year);
CREATE INDEX idx_attendance_student ON public.attendance(student_id);
CREATE INDEX idx_attendance_date ON public.attendance(date);
CREATE INDEX idx_fee_payments_student ON public.fee_payments(student_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read);
