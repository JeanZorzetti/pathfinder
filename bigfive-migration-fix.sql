-- =====================================================
-- Big Five Migration FIX - Drop and Recreate
-- Execute este SQL completo no pgweb
-- =====================================================

-- 1. DROP EXISTING TABLES (in correct order due to foreign keys)
-- =====================================================

DROP TABLE IF EXISTS bigfive_results CASCADE;
DROP TABLE IF EXISTS bigfive_questions CASCADE;
DROP TABLE IF EXISTS bigfive_dimensions CASCADE;

-- 2. CREATE TABLES (fresh structure)
-- =====================================================

-- Table: bigfive_dimensions
CREATE TABLE bigfive_dimensions (
  code VARCHAR(1) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  name_pt VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  description_pt TEXT NOT NULL,
  low_description TEXT NOT NULL,
  low_description_pt TEXT NOT NULL,
  high_description TEXT NOT NULL,
  high_description_pt TEXT NOT NULL,
  facets TEXT[] NOT NULL,
  facets_pt TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: bigfive_questions
CREATE TABLE bigfive_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dimension_code VARCHAR(1) NOT NULL REFERENCES bigfive_dimensions(code),
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_text_pt TEXT NOT NULL,
  is_reversed BOOLEAN DEFAULT FALSE,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: bigfive_results
CREATE TABLE bigfive_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  openness_score INTEGER NOT NULL,
  conscientiousness_score INTEGER NOT NULL,
  extraversion_score INTEGER NOT NULL,
  agreeableness_score INTEGER NOT NULL,
  neuroticism_score INTEGER NOT NULL,
  answers JSONB NOT NULL,
  completion_time_seconds INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_bigfive_questions_dimension ON bigfive_questions(dimension_code);
CREATE INDEX idx_bigfive_questions_order ON bigfive_questions(order_index);
CREATE INDEX idx_bigfive_results_user ON bigfive_results(user_id);
CREATE INDEX idx_bigfive_results_created ON bigfive_results(created_at);

-- 3. POPULATE DIMENSIONS
-- =====================================================

INSERT INTO bigfive_dimensions (code, name, name_pt, description, description_pt, low_description, low_description_pt, high_description, high_description_pt, facets, facets_pt) VALUES
('O', 'Openness', 'Abertura',
 'Openness to experience involves active imagination, aesthetic sensitivity, attentiveness to inner feelings, preference for variety, and intellectual curiosity.',
 'Abertura à experiência envolve imaginação ativa, sensibilidade estética, atenção aos sentimentos interiores, preferência por variedade e curiosidade intelectual.',
 'Prefers routine and familiar experiences. More conventional and traditional in outlook. Focuses on practical, concrete matters.',
 'Prefere rotina e experiências familiares. Mais convencional e tradicional. Foca em assuntos práticos e concretos.',
 'Curious and wide range of interests. Imaginative and creative. Values art, beauty, and new ideas. Open to trying new things.',
 'Curioso e com ampla gama de interesses. Imaginativo e criativo. Valoriza arte, beleza e novas ideias. Aberto a experimentar coisas novas.',
 ARRAY['Imagination', 'Artistic Interests', 'Emotionality', 'Adventurousness', 'Intellect', 'Liberalism'],
 ARRAY['Imaginação', 'Interesses Artísticos', 'Emocionalidade', 'Aventura', 'Intelecto', 'Liberalismo']),

('C', 'Conscientiousness', 'Conscienciosidade',
 'Conscientiousness is about being careful, diligent, and well-organized. It involves self-discipline, orderliness, and achievement striving.',
 'Conscienciosidade diz respeito a ser cuidadoso, diligente e bem organizado. Envolve autodisciplina, ordem e busca por conquistas.',
 'More spontaneous and flexible. May be disorganized or careless. Prefers to keep options open. May procrastinate.',
 'Mais espontâneo e flexível. Pode ser desorganizado ou descuidado. Prefere manter opções em aberto. Pode procrastinar.',
 'Organized and dependable. Strong sense of duty. Achievement-oriented. Self-disciplined and planful. Strives for excellence.',
 'Organizado e confiável. Forte senso de dever. Orientado para conquistas. Autodisciplinado e planejador. Busca excelência.',
 ARRAY['Self-Efficacy', 'Orderliness', 'Dutifulness', 'Achievement-Striving', 'Self-Discipline', 'Cautiousness'],
 ARRAY['Autoeficácia', 'Organização', 'Senso de Dever', 'Busca por Conquistas', 'Autodisciplina', 'Cautela']),

('E', 'Extraversion', 'Extroversão',
 'Extraversion is marked by pronounced engagement with the external world. High scorers enjoy being with people, are energetic, and often experience positive emotions.',
 'Extroversão é marcada pelo engajamento pronunciado com o mundo externo. Pessoas extrovertidas gostam de estar com outras pessoas, são energéticas e frequentemente experimentam emoções positivas.',
 'Reserved and quiet. Prefers solitude or small groups. Independent and self-contained. Measured and deliberate pace.',
 'Reservado e quieto. Prefere solidão ou grupos pequenos. Independente e autocontido. Ritmo medido e deliberado.',
 'Outgoing and energetic. Enjoys social gatherings. Talkative and assertive. Seeks excitement and stimulation. Cheerful and optimistic.',
 'Extrovertido e energético. Gosta de reuniões sociais. Falante e assertivo. Busca excitação e estimulação. Alegre e otimista.',
 ARRAY['Friendliness', 'Gregariousness', 'Assertiveness', 'Activity Level', 'Excitement-Seeking', 'Cheerfulness'],
 ARRAY['Amigabilidade', 'Gregariedade', 'Assertividade', 'Nível de Atividade', 'Busca por Excitação', 'Alegria']),

('A', 'Agreeableness', 'Amabilidade',
 'Agreeableness reflects individual differences in concern with cooperation and social harmony. Agreeable individuals value getting along with others.',
 'Amabilidade reflete diferenças individuais na preocupação com cooperação e harmonia social. Pessoas amáveis valorizam se dar bem com os outros.',
 'More analytical and detached. Skeptical of others intentions. Competitive and challenging. Direct and frank.',
 'Mais analítico e distante. Cético quanto às intenções dos outros. Competitivo e desafiador. Direto e franco.',
 'Compassionate and cooperative. Trusting and helpful. Values harmony and empathy. Modest and straightforward. Tender-minded.',
 'Compassivo e cooperativo. Confiante e prestativo. Valoriza harmonia e empatia. Modesto e direto. Mente sensível.',
 ARRAY['Trust', 'Morality', 'Altruism', 'Cooperation', 'Modesty', 'Sympathy'],
 ARRAY['Confiança', 'Moralidade', 'Altruísmo', 'Cooperação', 'Modéstia', 'Simpatia']),

('N', 'Neuroticism', 'Neuroticismo',
 'Neuroticism refers to the tendency to experience negative emotions. High scorers may experience anxiety, anger, or depression more frequently.',
 'Neuroticismo refere-se à tendência de experimentar emoções negativas. Pessoas com alta pontuação podem experimentar ansiedade, raiva ou depressão com mais frequência.',
 'Emotionally stable and resilient. Calm and even-tempered. Less reactive to stress. Confident in handling difficulties.',
 'Emocionalmente estável e resiliente. Calmo e equilibrado. Menos reativo ao estresse. Confiante em lidar com dificuldades.',
 'Prone to psychological stress. May experience anxiety, worry, or sadness more easily. Self-conscious and sensitive. Emotionally reactive.',
 'Propenso a estresse psicológico. Pode experimentar ansiedade, preocupação ou tristeza mais facilmente. Autoconsciente e sensível. Emocionalmente reativo.',
 ARRAY['Anxiety', 'Anger', 'Depression', 'Self-Consciousness', 'Immoderation', 'Vulnerability'],
 ARRAY['Ansiedade', 'Raiva', 'Depressão', 'Autoconsciência', 'Imoderação', 'Vulnerabilidade']);

-- 4. POPULATE QUESTIONS (60 questions, 12 per dimension)
-- =====================================================

-- OPENNESS (O) - 12 questions
INSERT INTO bigfive_questions (dimension_code, question_number, question_text, question_text_pt, is_reversed, order_index) VALUES
('O', 1, 'I have a vivid imagination.', 'Eu tenho uma imaginação vívida.', false, 1),
('O', 2, 'I am not interested in abstract ideas.', 'Não me interesso por ideias abstratas.', true, 2),
('O', 3, 'I have difficulty understanding abstract ideas.', 'Tenho dificuldade em entender ideias abstratas.', true, 3),
('O', 4, 'I do not have a good imagination.', 'Não tenho uma boa imaginação.', true, 4),
('O', 5, 'I enjoy hearing new ideas.', 'Gosto de ouvir novas ideias.', false, 5),
('O', 6, 'I am interested in many things.', 'Me interesso por muitas coisas.', false, 6),
('O', 7, 'I love to think up new ways of doing things.', 'Adoro pensar em novas formas de fazer as coisas.', false, 7),
('O', 8, 'I avoid philosophical discussions.', 'Evito discussões filosóficas.', true, 8),
('O', 9, 'I enjoy wild flights of fantasy.', 'Gosto de viagens selvagens da fantasia.', false, 9),
('O', 10, 'I tend to vote for conservative political candidates.', 'Tendo a votar em candidatos políticos conservadores.', true, 10),
('O', 11, 'I carry the conversation to a higher level.', 'Levo a conversa para um nível mais elevado.', false, 11),
('O', 12, 'I enjoy contemplating the nature of the universe.', 'Gosto de contemplar a natureza do universo.', false, 12),

-- CONSCIENTIOUSNESS (C) - 12 questions
('C', 13, 'I am always prepared.', 'Estou sempre preparado.', false, 13),
('C', 14, 'I leave my belongings around.', 'Deixo meus pertences espalhados.', true, 14),
('C', 15, 'I pay attention to details.', 'Presto atenção aos detalhes.', false, 15),
('C', 16, 'I make a mess of things.', 'Faço bagunça com as coisas.', true, 16),
('C', 17, 'I get chores done right away.', 'Faço as tarefas imediatamente.', false, 17),
('C', 18, 'I often forget to put things back in their proper place.', 'Frequentemente esqueço de colocar as coisas de volta no lugar.', true, 18),
('C', 19, 'I like order.', 'Gosto de ordem.', false, 19),
('C', 20, 'I shirk my duties.', 'Fujo das minhas obrigações.', true, 20),
('C', 21, 'I follow a schedule.', 'Sigo uma programação.', false, 21),
('C', 22, 'I am exacting in my work.', 'Sou exigente no meu trabalho.', false, 22),
('C', 23, 'I waste my time.', 'Desperdiço meu tempo.', true, 23),
('C', 24, 'I do things according to a plan.', 'Faço as coisas de acordo com um plano.', false, 24),

-- EXTRAVERSION (E) - 12 questions
('E', 25, 'I am the life of the party.', 'Sou a alma da festa.', false, 25),
('E', 26, 'I don''t talk a lot.', 'Não falo muito.', true, 26),
('E', 27, 'I feel comfortable around people.', 'Me sinto confortável perto de pessoas.', false, 27),
('E', 28, 'I keep in the background.', 'Fico no segundo plano.', true, 28),
('E', 29, 'I start conversations.', 'Inicio conversas.', false, 29),
('E', 30, 'I have little to say.', 'Tenho pouco a dizer.', true, 30),
('E', 31, 'I talk to a lot of different people at parties.', 'Falo com muitas pessoas diferentes em festas.', false, 31),
('E', 32, 'I don''t like to draw attention to myself.', 'Não gosto de chamar atenção para mim.', true, 32),
('E', 33, 'I don''t mind being the center of attention.', 'Não me importo de ser o centro das atenções.', false, 33),
('E', 34, 'I am quiet around strangers.', 'Sou quieto perto de estranhos.', true, 34),
('E', 35, 'I make friends easily.', 'Faço amigos facilmente.', false, 35),
('E', 36, 'I take charge.', 'Assumo o comando.', false, 36),

-- AGREEABLENESS (A) - 12 questions
('A', 37, 'I am interested in people.', 'Me interesso por pessoas.', false, 37),
('A', 38, 'I insult people.', 'Insulto pessoas.', true, 38),
('A', 39, 'I sympathize with others'' feelings.', 'Simpatizo com os sentimentos dos outros.', false, 39),
('A', 40, 'I am not interested in other people''s problems.', 'Não me interesso pelos problemas dos outros.', true, 40),
('A', 41, 'I have a soft heart.', 'Tenho um coração mole.', false, 41),
('A', 42, 'I am not really interested in others.', 'Não estou realmente interessado nos outros.', true, 42),
('A', 43, 'I take time out for others.', 'Tiro tempo para os outros.', false, 43),
('A', 44, 'I feel little concern for others.', 'Sinto pouca preocupação pelos outros.', true, 44),
('A', 45, 'I make people feel at ease.', 'Faço as pessoas se sentirem à vontade.', false, 45),
('A', 46, 'I am hard to satisfy.', 'Sou difícil de satisfazer.', true, 46),
('A', 47, 'I treat all people equally.', 'Trato todas as pessoas igualmente.', false, 47),
('A', 48, 'I trust what people say.', 'Confio no que as pessoas dizem.', false, 48),

-- NEUROTICISM (N) - 12 questions
('N', 49, 'I get stressed out easily.', 'Fico estressado facilmente.', false, 49),
('N', 50, 'I am relaxed most of the time.', 'Estou relaxado na maior parte do tempo.', true, 50),
('N', 51, 'I worry about things.', 'Me preocupo com as coisas.', false, 51),
('N', 52, 'I seldom feel blue.', 'Raramente me sinto triste.', true, 52),
('N', 53, 'I am easily disturbed.', 'Sou facilmente perturbado.', false, 53),
('N', 54, 'I get upset easily.', 'Fico chateado facilmente.', false, 54),
('N', 55, 'I change my mood a lot.', 'Mudo de humor muito.', false, 55),
('N', 56, 'I have frequent mood swings.', 'Tenho mudanças frequentes de humor.', false, 56),
('N', 57, 'I get irritated easily.', 'Fico irritado facilmente.', false, 57),
('N', 58, 'I often feel blue.', 'Frequentemente me sinto triste.', false, 58),
('N', 59, 'I panic easily.', 'Entro em pânico facilmente.', false, 59),
('N', 60, 'I am calm in tense situations.', 'Sou calmo em situações tensas.', true, 60);

-- =====================================================
-- VERIFICATION QUERIES
-- Execute estas queries para verificar se tudo foi populado corretamente
-- =====================================================

-- Verificar dimensões (deve retornar 5)
SELECT code, name_pt FROM bigfive_dimensions ORDER BY code;

-- Verificar questões (deve retornar 60)
SELECT COUNT(*) as total_questions FROM bigfive_questions;

-- Verificar questões por dimensão (deve retornar 12 para cada)
SELECT dimension_code, COUNT(*) as count
FROM bigfive_questions
GROUP BY dimension_code
ORDER BY dimension_code;

-- Verificar questões reversas (deve retornar 30 reversas, 30 normais)
SELECT is_reversed, COUNT(*) as count
FROM bigfive_questions
GROUP BY is_reversed
ORDER BY is_reversed;
