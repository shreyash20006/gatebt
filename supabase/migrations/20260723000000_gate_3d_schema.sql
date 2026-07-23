-- ========================================================
-- GATE 3D PREP WEB APP - COMPLETE SUPABASE DATABASE SCHEMA
-- PROMPTS 1, 2 & 3 COMBINED (IDEMPOTENT & SAFE FOR ALL PROJECTS)
-- ========================================================

-- 1. USER PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.user_profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    selected_paper VARCHAR(10) DEFAULT 'CE',
    last_subject_id TEXT,
    daily_goal_hours NUMERIC(3,1) DEFAULT 4.0,
    target_score INT DEFAULT 700,
    streak_days JSONB DEFAULT '{"mon": true, "tue": true, "wed": true, "thu": false, "fri": false, "sat": false, "sun": false}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = user_id);


-- 2. SUBJECTS TABLE (Ensures columns exist even if subjects table pre-existed)
CREATE TABLE IF NOT EXISTS public.subjects (
    id TEXT PRIMARY KEY,
    paper_code VARCHAR(10) DEFAULT 'CE',
    subject_name TEXT NOT NULL,
    weightage TEXT NOT NULL,
    weightage_percent INT NOT NULL DEFAULT 10,
    icon_name TEXT DEFAULT 'BookOpen',
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure missing columns are added if an older subjects table already existed
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS paper_code VARCHAR(10) DEFAULT 'CE';
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS subject_name TEXT DEFAULT 'Core Subject';
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS weightage TEXT DEFAULT '10%';
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS weightage_percent INT DEFAULT 10;
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS icon_name TEXT DEFAULT 'BookOpen';
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS description TEXT;

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to subjects" ON public.subjects;
CREATE POLICY "Allow public read access to subjects" ON public.subjects
    FOR SELECT USING (true);


-- 3. TOPICS TABLE
CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_name TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, subject_id, topic_name)
);

ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own topics" ON public.topics;
CREATE POLICY "Users can view own topics" ON public.topics
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert/update own topics" ON public.topics;
CREATE POLICY "Users can insert/update own topics" ON public.topics
    FOR ALL USING (auth.uid() = user_id);


-- 4. PERSONAL NOTES TABLE
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id TEXT NOT NULL,
    content TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, topic_id)
);

ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own notes" ON public.notes;
CREATE POLICY "Users can manage own notes" ON public.notes
    FOR ALL USING (auth.uid() = user_id);


-- 5. MOCK TEST QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_code VARCHAR(10) NOT NULL,
    subject TEXT NOT NULL,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer INT NOT NULL,
    marks INT NOT NULL DEFAULT 1,
    negative_marks NUMERIC(4,2) NOT NULL DEFAULT 0.33,
    explanation TEXT
);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to questions" ON public.questions;
CREATE POLICY "Allow public read access to questions" ON public.questions
    FOR SELECT USING (true);


-- 6. TEST ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS public.test_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    paper_code VARCHAR(10) NOT NULL,
    score NUMERIC(5,2) NOT NULL,
    max_score INT NOT NULL,
    accuracy NUMERIC(5,2) NOT NULL,
    subject_breakdown JSONB DEFAULT '{}'::jsonb,
    taken_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own test attempts" ON public.test_attempts;
CREATE POLICY "Users can manage own test attempts" ON public.test_attempts
    FOR ALL USING (auth.uid() = user_id);


-- 7. STUDY SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.study_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject_id TEXT NOT NULL,
    minutes INT NOT NULL DEFAULT 0,
    session_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own study sessions" ON public.study_sessions;
CREATE POLICY "Users can manage own study sessions" ON public.study_sessions
    FOR ALL USING (auth.uid() = user_id);


-- 8. USER GOALS TABLE
CREATE TABLE IF NOT EXISTS public.user_goals (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    daily_hours_target NUMERIC(3,1) DEFAULT 4.0,
    target_gate_score INT DEFAULT 700,
    notifications_enabled BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own goals" ON public.user_goals;
CREATE POLICY "Users can manage own goals" ON public.user_goals
    FOR ALL USING (auth.uid() = user_id);


-- ========================================================
-- SEED DATA
-- ========================================================

INSERT INTO public.subjects (id, paper_code, subject_name, weightage, weightage_percent, icon_name, description)
VALUES
('ce-structural', 'CE', 'Structural Engineering', '20–25%', 25, 'Building2', 'Engineering Mechanics, SOM, Structural Analysis, RCC & Steel Structures.'),
('ce-geotech', 'CE', 'Geotechnical Engineering', '15–18%', 18, 'Layers', 'Soil Mechanics, Permeability, Shear Strength, Consolidation & Foundations.'),
('ce-water', 'CE', 'Water Resources Engineering', '12–16%', 15, 'Zap', 'Fluid Mechanics, Hydraulics, Open Channel Flow, Hydrology & Irrigation.'),
('bt-biochem', 'BT', 'Biochemistry', '15–18%', 18, 'Dna', 'Structure of Biomolecules, Enzyme Kinetics & Metabolic Pathways.'),
('bt-bioprocess', 'BT', 'Bioprocess Engineering', '20–25%', 22, 'Cog', 'Mass & Energy Balances, Bioreactor Design, Sterilization & Downstream.')
ON CONFLICT (id) DO UPDATE SET
    paper_code = EXCLUDED.paper_code,
    subject_name = EXCLUDED.subject_name,
    weightage = EXCLUDED.weightage,
    weightage_percent = EXCLUDED.weightage_percent,
    icon_name = EXCLUDED.icon_name,
    description = EXCLUDED.description;


INSERT INTO public.questions (paper_code, subject, question, options, correct_answer, marks, negative_marks, explanation)
VALUES
('CE', 'Structural Engineering', 'What is the maximum shear stress in a circular shaft subjected to torque T and diameter D?', '["16T / (π D³)", "32T / (π D³)", "8T / (π D³)", "64T / (π D³)"]'::jsonb, 0, 1, 0.33, 'The maximum shear stress τ_max in a circular solid shaft under torsion is given by τ = 16T / (π D³).'),

('CE', 'Structural Engineering', 'In a simply supported beam of span L with a central point load W, the maximum bending moment is:', '["W L / 8", "W L / 4", "W L / 2", "W L"]'::jsonb, 1, 2, 0.67, 'Maximum bending moment occurs at center and equals W L / 4.'),

('CE', 'Geotechnical Engineering', 'According to Terzaghi, the ultimate bearing capacity for a continuous strip footing is:', '["c N_c + q N_q + 0.5 γ B N_γ", "1.3 c N_c + q N_q + 0.4 γ B N_γ", "c N_c + q N_q + 0.3 γ B N_γ", "1.3 c N_c + q N_q + 0.3 γ B N_γ"]'::jsonb, 0, 1, 0.33, 'Terzaghi ultimate bearing capacity equation for strip footing: q_u = c N_c + q N_q + 0.5 γ B N_γ.'),

('BT', 'Biochemistry', 'The Km value of an enzyme represents:', '["Substrate concentration at Vmax", "Substrate concentration at half Vmax", "Maximum reaction velocity", "Enzyme concentration"]'::jsonb, 1, 1, 0.33, 'Michaelis constant Km equals the substrate concentration at which reaction rate is half of Vmax.')
ON CONFLICT DO NOTHING;
