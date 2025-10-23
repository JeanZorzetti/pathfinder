-- Migration: Create bigfive_career_profiles table
-- Phase 3: Career Recommendations (Week 4)

CREATE TABLE IF NOT EXISTS bigfive_career_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Career identification
  career_name VARCHAR(200) NOT NULL,
  career_name_pt VARCHAR(200) NOT NULL,
  category VARCHAR(100), -- e.g., "Creative", "Technical", "Social", "Business"

  -- Ideal Big Five trait scores (0-100)
  -- These represent the typical personality profile for success in this career
  ideal_openness INTEGER CHECK (ideal_openness >= 0 AND ideal_openness <= 100),
  ideal_conscientiousness INTEGER CHECK (ideal_conscientiousness >= 0 AND ideal_conscientiousness <= 100),
  ideal_extraversion INTEGER CHECK (ideal_extraversion >= 0 AND ideal_extraversion <= 100),
  ideal_agreeableness INTEGER CHECK (ideal_agreeableness >= 0 AND ideal_agreeableness <= 100),
  ideal_neuroticism INTEGER CHECK (ideal_neuroticism >= 0 AND ideal_neuroticism <= 100),

  -- Career details
  description TEXT,
  description_pt TEXT,
  work_environment TEXT,
  work_environment_pt TEXT,

  -- Brazilian market data
  salary_range_brl VARCHAR(100), -- e.g., "R$ 3.000 - R$ 8.000"
  education_required VARCHAR(200),
  education_required_pt VARCHAR(200),
  growth_outlook VARCHAR(100), -- e.g., "High", "Medium", "Stable"
  growth_outlook_pt VARCHAR(100),

  -- Why it matches explanation
  why_good_fit TEXT,
  why_good_fit_pt TEXT,

  -- Additional metadata
  remote_friendly BOOLEAN DEFAULT false,
  requires_certification BOOLEAN DEFAULT false,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster career matching
CREATE INDEX IF NOT EXISTS idx_careers_category ON bigfive_career_profiles(category);
CREATE INDEX IF NOT EXISTS idx_careers_openness ON bigfive_career_profiles(ideal_openness);
CREATE INDEX IF NOT EXISTS idx_careers_conscientiousness ON bigfive_career_profiles(ideal_conscientiousness);
CREATE INDEX IF NOT EXISTS idx_careers_extraversion ON bigfive_career_profiles(ideal_extraversion);
CREATE INDEX IF NOT EXISTS idx_careers_agreeableness ON bigfive_career_profiles(ideal_agreeableness);
CREATE INDEX IF NOT EXISTS idx_careers_neuroticism ON bigfive_career_profiles(ideal_neuroticism);

-- Verification
SELECT
  'Migration completed successfully!' as status,
  COUNT(*) FILTER (WHERE table_name = 'bigfive_career_profiles') as table_exists
FROM information_schema.tables
WHERE table_name = 'bigfive_career_profiles';
