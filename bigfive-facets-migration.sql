-- Migration: Create bigfive_facets table and update related tables
-- Phase 2.2: NEO-PI-R 30 Facets Data Structure

-- 1. Create bigfive_facets table
CREATE TABLE IF NOT EXISTS bigfive_facets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dimension_code VARCHAR(1) NOT NULL, -- O, C, E, A, N
  facet_code VARCHAR(10) NOT NULL UNIQUE, -- ex: "O1", "O2", "C1", "C2"
  facet_name VARCHAR(100) NOT NULL,
  facet_name_pt VARCHAR(100) NOT NULL,
  facet_description TEXT NOT NULL,
  facet_description_pt TEXT NOT NULL,
  high_score_description TEXT NOT NULL, -- What it means to score high
  high_score_description_pt TEXT NOT NULL,
  low_score_description TEXT NOT NULL, -- What it means to score low
  low_score_description_pt TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (dimension_code) REFERENCES bigfive_dimensions(code)
);

-- 2. Add facet_code column to bigfive_questions
ALTER TABLE bigfive_questions
ADD COLUMN IF NOT EXISTS facet_code VARCHAR(10);

-- 3. Add facet_scores column to bigfive_results
ALTER TABLE bigfive_results
ADD COLUMN IF NOT EXISTS facet_scores JSONB;

-- 4. Create index for faster facet lookups
CREATE INDEX IF NOT EXISTS idx_facets_dimension ON bigfive_facets(dimension_code);
CREATE INDEX IF NOT EXISTS idx_facets_code ON bigfive_facets(facet_code);
CREATE INDEX IF NOT EXISTS idx_questions_facet ON bigfive_questions(facet_code);

-- Verification query
SELECT
  'Migration completed successfully. Tables ready for facet data.' as status,
  COUNT(*) FILTER (WHERE table_name = 'bigfive_facets') as facets_table_exists,
  COUNT(*) FILTER (WHERE table_name = 'bigfive_questions' AND column_name = 'facet_code') as questions_facet_col_exists,
  COUNT(*) FILTER (WHERE table_name = 'bigfive_results' AND column_name = 'facet_scores') as results_facet_col_exists
FROM information_schema.columns
WHERE table_name IN ('bigfive_facets', 'bigfive_questions', 'bigfive_results');
