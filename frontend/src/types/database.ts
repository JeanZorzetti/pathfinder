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
}
