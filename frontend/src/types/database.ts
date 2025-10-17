// Custom database types for Supabase tables
export interface TestResult {
  id: string;
  user_id: string;
  test_type: string;
  result_data: any;
  completed_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  content: string;
  mood: string | null;
  created_at: string;
  updated_at: string;
}

export interface DailyInsight {
  id: string;
  personality_type: string;
  category: string;
  insight_text: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
  // Sprint 1: Dashboard Core - Streak tracking
  last_visit?: string | null;
  streak_current?: number;
  streak_longest?: number;
  visit_history?: string[]; // Array de datas de visitas
  // Sprint 2: Gamificação
  level?: number;
  xp?: number;
  achievements?: any[]; // JSON array de conquistas
  last_xp_gain?: string | null;
  // Sprint 3: Desafio Semanal
  current_challenge?: any; // JSON do desafio atual
  completed_challenges?: string[]; // IDs dos desafios completos
  // Sprint 4: Conteúdo + Comparação
  comparison_code?: string; // Código único para comparação (e.g., "ESTJ-A7K9M2")
  consumed_content?: string[]; // IDs de conteúdo consumido
  content_history?: any[]; // Histórico de conteúdo consumido com timestamps
}
