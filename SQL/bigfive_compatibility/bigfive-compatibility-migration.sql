-- Migration: Big Five Compatibility Insights (Phase 4)
-- Tabela para armazenar insights de compatibilidade em relacionamentos baseados nos traços Big Five
-- Data: 2025-10-23

CREATE TABLE IF NOT EXISTS bigfive_compatibility_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dimension_code VARCHAR(1) NOT NULL, -- O, C, E, A, N
  score_range VARCHAR(20) NOT NULL, -- 'high' (60-100), 'medium' (40-60), 'low' (0-40)

  -- Estilo de comunicação
  communication_style TEXT NOT NULL,
  communication_style_pt TEXT NOT NULL,

  -- Forças no relacionamento
  relationship_strengths TEXT[] NOT NULL,
  relationship_strengths_pt TEXT[] NOT NULL,

  -- Desafios potenciais
  relationship_challenges TEXT[] NOT NULL,
  relationship_challenges_pt TEXT[] NOT NULL,

  -- Características de parceiro ideal
  ideal_partner_traits TEXT NOT NULL,
  ideal_partner_traits_pt TEXT NOT NULL,

  -- Estilo de resolução de conflitos
  conflict_resolution TEXT NOT NULL,
  conflict_resolution_pt TEXT NOT NULL,

  -- Dicas para relacionamento saudável
  relationship_tips TEXT[] NOT NULL,
  relationship_tips_pt TEXT[] NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_dimension
    FOREIGN KEY (dimension_code)
    REFERENCES bigfive_dimensions(code),

  CONSTRAINT unique_dimension_range
    UNIQUE (dimension_code, score_range),

  CONSTRAINT check_score_range
    CHECK (score_range IN ('high', 'medium', 'low'))
);

-- Índices para melhorar performance de consultas
CREATE INDEX idx_compatibility_dimension ON bigfive_compatibility_insights(dimension_code);
CREATE INDEX idx_compatibility_range ON bigfive_compatibility_insights(score_range);

-- Comentários da tabela
COMMENT ON TABLE bigfive_compatibility_insights IS 'Insights de compatibilidade em relacionamentos baseados nos traços Big Five';
COMMENT ON COLUMN bigfive_compatibility_insights.dimension_code IS 'Código da dimensão Big Five (O, C, E, A, N)';
COMMENT ON COLUMN bigfive_compatibility_insights.score_range IS 'Faixa de pontuação: high (60-100), medium (40-60), low (0-40)';
COMMENT ON COLUMN bigfive_compatibility_insights.communication_style IS 'Como essa pessoa se comunica em relacionamentos';
COMMENT ON COLUMN bigfive_compatibility_insights.relationship_strengths IS 'Forças que essa pessoa traz para relacionamentos';
COMMENT ON COLUMN bigfive_compatibility_insights.relationship_challenges IS 'Desafios potenciais em relacionamentos';
COMMENT ON COLUMN bigfive_compatibility_insights.ideal_partner_traits IS 'Características de parceiro ideal para complementar ou alinhar';
COMMENT ON COLUMN bigfive_compatibility_insights.conflict_resolution IS 'Como essa pessoa tende a resolver conflitos';
COMMENT ON COLUMN bigfive_compatibility_insights.relationship_tips IS 'Dicas práticas para relacionamento saudável';
