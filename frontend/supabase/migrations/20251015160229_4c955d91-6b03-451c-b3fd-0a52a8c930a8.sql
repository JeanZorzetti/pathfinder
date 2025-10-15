-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create test results table
CREATE TABLE public.test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  test_type TEXT NOT NULL CHECK (test_type IN ('mbti', 'enneagram', 'big-five')),
  result_data JSONB NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on test_results
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

-- Policies for test_results
CREATE POLICY "Users can view own test results"
  ON public.test_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own test results"
  ON public.test_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create daily insights table
CREATE TABLE public.daily_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  personality_type TEXT NOT NULL,
  insight_text TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on daily_insights (read-only for all authenticated users)
ALTER TABLE public.daily_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view daily insights"
  ON public.daily_insights FOR SELECT
  TO authenticated
  USING (true);

-- Create journal entries table
CREATE TABLE public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  mood TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on journal_entries
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- Policies for journal_entries
CREATE POLICY "Users can view own journal entries"
  ON public.journal_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal entries"
  ON public.journal_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries"
  ON public.journal_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries"
  ON public.journal_entries FOR DELETE
  USING (auth.uid() = user_id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_journal_entries_updated_at
  BEFORE UPDATE ON public.journal_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Insert sample daily insights for MBTI types
INSERT INTO public.daily_insights (personality_type, insight_text, category) VALUES
('INTJ', 'Sua capacidade de planejamento estratégico é um dom. Hoje, use-a para mapear não apenas tarefas, mas também emoções. Como você se sente sobre seus objetivos?', 'reflexão'),
('INFJ', 'Você naturalmente percebe as necessidades dos outros. Lembre-se: cuidar de si mesmo não é egoísmo, é necessário para continuar sendo a luz que você é.', 'autocuidado'),
('INFP', 'Seus valores são sua bússola interna. Hoje, honre-os fazendo uma pequena ação alinhada com o que você mais acredita.', 'propósito'),
('INTP', 'Sua mente analítica é poderosa. Mas lembre-se: nem tudo na vida precisa de uma explicação lógica. Às vezes, sentir é suficiente.', 'equilíbrio'),
('ISTJ', 'Sua confiabilidade é admirável. Mas perfeccionismo pode ser uma armadilha. Hoje, permita-se fazer algo "bem o suficiente".', 'flexibilidade'),
('ISFJ', 'Você cuida dos detalhes que outros ignoram. Isso é valioso. Mas não esqueça: você também merece ser cuidado.', 'reciprocidade'),
('ISFP', 'Sua sensibilidade estética enriquece o mundo. Hoje, crie algo - não para os outros, mas para si mesmo.', 'expressão'),
('ISTP', 'Você prospera na ação prática. Mas pausar para refletir sobre por que você faz o que faz pode revelar novos caminhos.', 'introspecção')