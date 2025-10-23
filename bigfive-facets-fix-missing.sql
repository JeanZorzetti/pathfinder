-- Fix: Add missing facets that failed to insert
-- This will add the 12 missing facets to complete all 30 NEO-PI-R facets

-- Missing from Amabilidade (A): A1, A3, A5, A6

-- A1: Confiança (Trust/Belief in Others)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'A', 'A1', 'Trust', 'Confiança', 1,
  'Belief in the honesty and good intentions of others.',
  'Crença na honestidade e boas intenções dos outros.',
  'You tend to believe others are honest and well-intentioned. You give people the benefit of the doubt and trust easily.',
  'Você tende a acreditar que os outros são honestos e bem-intencionados. Você dá o benefício da dúvida às pessoas e confia facilmente.',
  'You are more skeptical and cautious about others'' motives. You may be suspicious or cynical about people''s intentions.',
  'Você é mais cético e cauteloso sobre os motivos dos outros. Você pode ser desconfiado ou cínico sobre as intenções das pessoas.'
)
ON CONFLICT (facet_code) DO NOTHING;

-- A3: Altruísmo (Altruism/Generosity)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'A', 'A3', 'Altruism', 'Altruísmo', 3,
  'Active concern for others'' welfare and willingness to help.',
  'Preocupação ativa com o bem-estar dos outros e disposição para ajudar.',
  'You find genuine satisfaction in helping others. You are generous with your time and resources to support those in need.',
  'Você encontra satisfação genuína em ajudar os outros. Você é generoso com seu tempo e recursos para apoiar quem precisa.',
  'You are less focused on helping others and may prioritize self-interest. You expect reciprocity when you do help.',
  'Você é menos focado em ajudar os outros e pode priorizar interesse próprio. Você espera reciprocidade quando ajuda.'
)
ON CONFLICT (facet_code) DO NOTHING;

-- A5: Modéstia (Modesty/Humility)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'A', 'A5', 'Modesty', 'Modéstia', 5,
  'Humility and reluctance to claim superiority over others.',
  'Humildade e relutância em reivindicar superioridade sobre os outros.',
  'You are humble and don''t seek the spotlight. You are uncomfortable with praise and don''t see yourself as superior to others.',
  'Você é humilde e não busca os holofotes. Você se sente desconfortável com elogios e não se vê como superior aos outros.',
  'You are more confident in your abilities and comfortable with self-promotion. You may see yourself as better than average.',
  'Você é mais confiante em suas habilidades e confortável com autopromoção. Você pode se ver como acima da média.'
)
ON CONFLICT (facet_code) DO NOTHING;

-- A6: Sensibilidade (Tender-Mindedness/Empathy)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'A', 'A6', 'Tender-Mindedness', 'Sensibilidade', 6,
  'Empathy, sympathy, and compassion for others.',
  'Empatia, simpatia e compaixão pelos outros.',
  'You are moved by others'' needs and are compassionate. You feel sympathy and concern for those who are suffering.',
  'Você é tocado pelas necessidades dos outros e é compassivo. Você sente simpatia e preocupação por aqueles que estão sofrendo.',
  'You are more tough-minded and less swayed by emotional appeals. You prioritize logic and objectivity over sentiment.',
  'Você é mais pragmático e menos influenciado por apelos emocionais. Você prioriza lógica e objetividade em vez de sentimento.'
)
ON CONFLICT (facet_code) DO NOTHING;

-- Missing from Conscienciosidade (C): C1, C2, C3, C5

-- C1: Competência (Competence/Self-Efficacy)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'C', 'C1', 'Competence', 'Competência', 1,
  'Belief in one''s own ability to accomplish tasks and handle situations.',
  'Crença na própria capacidade de realizar tarefas e lidar com situações.',
  'You feel well-prepared and capable of handling life''s challenges. You have confidence in your ability to think things through and succeed.',
  'Você se sente bem preparado e capaz de lidar com os desafios da vida. Você tem confiança em sua capacidade de pensar bem as coisas e ter sucesso.',
  'You may doubt your abilities and feel unprepared for challenges. You may be more self-critical about your capabilities.',
  'Você pode duvidar de suas habilidades e se sentir despreparado para desafios. Você pode ser mais autocrítico sobre suas capacidades.'
)
ON CONFLICT (facet_code) DO NOTHING;

-- C2: Ordem (Order/Organization)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'C', 'C2', 'Order', 'Ordem', 2,
  'Preference for organization, tidiness, and structure in one''s environment.',
  'Preferência por organização, arrumação e estrutura no ambiente.',
  'You keep things neat, organized, and in their proper place. You have systems and structure in your physical and mental spaces.',
  'Você mantém as coisas arrumadas, organizadas e em seus devidos lugares. Você tem sistemas e estrutura em seus espaços físicos e mentais.',
  'You are more comfortable with clutter and disorganization. You may find rigid organization less important or constraining.',
  'Você se sente mais confortável com bagunça e desorganização. Você pode achar organização rígida menos importante ou restritiva.'
)
ON CONFLICT (facet_code) DO NOTHING;

-- C3: Senso de Dever (Dutifulness/Sense of Duty)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'C', 'C3', 'Dutifulness', 'Senso de Dever', 3,
  'Adherence to ethical principles and commitment to obligations.',
  'Adesão a princípios éticos e comprometimento com obrigações.',
  'You take your obligations seriously and feel a strong sense of duty. You are reliable and keep your promises even when it''s difficult.',
  'Você leva suas obrigações a sério e sente um forte senso de dever. Você é confiável e mantém suas promessas mesmo quando é difícil.',
  'You are more flexible about rules and obligations. You may prioritize personal freedom over strict adherence to duties.',
  'Você é mais flexível sobre regras e obrigações. Você pode priorizar liberdade pessoal em vez de adesão estrita a deveres.'
)
ON CONFLICT (facet_code) DO NOTHING;

-- C5: Autodisciplina (Self-Discipline/Follow-through)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'C', 'C5', 'Self-Discipline', 'Autodisciplina', 5,
  'Ability to begin tasks and follow through despite distractions or boredom.',
  'Capacidade de iniciar tarefas e perseverar apesar de distrações ou tédio.',
  'You can motivate yourself to complete tasks even when they''re boring or difficult. You follow through on commitments and finish what you start.',
  'Você consegue se motivar para completar tarefas mesmo quando são chatas ou difíceis. Você cumpre compromissos e termina o que começa.',
  'You may struggle to start or complete tasks, especially if they''re uninteresting. You are more easily distracted or tempted to procrastinate.',
  'Você pode ter dificuldade para começar ou completar tarefas, especialmente se não são interessantes. Você é mais facilmente distraído ou tentado a procrastinar.'
)
ON CONFLICT (facet_code) DO NOTHING;

-- Missing from Extroversão (E): E2

-- E2: Gregarismo (Gregariousness/Sociability)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'E', 'E2', 'Gregariousness', 'Gregarismo', 2,
  'Preference for company of others and being part of a crowd.',
  'Preferência pela companhia de outros e fazer parte de um grupo.',
  'You enjoy being around people and seek out social gatherings. You prefer the company of others to being alone.',
  'Você gosta de estar perto de pessoas e busca reuniões sociais. Você prefere a companhia de outros a estar sozinho.',
  'You are comfortable spending time alone and may prefer solitude. You don''t feel the need to constantly be around others.',
  'Você se sente confortável passando tempo sozinho e pode preferir a solidão. Você não sente necessidade de estar constantemente perto de outros.'
)
ON CONFLICT (facet_code) DO NOTHING;

-- Missing from Neuroticismo (N): N1, N2, N4

-- N1: Ansiedade (Anxiety/Worry)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'N', 'N1', 'Anxiety', 'Ansiedade', 1,
  'Tendency to worry, feel apprehensive, and experience nervousness.',
  'Tendência de se preocupar, sentir apreensão e vivenciar nervosismo.',
  'You often feel anxious, nervous, or worried. You tend to anticipate that things might go wrong and experience apprehension.',
  'Você frequentemente se sente ansioso, nervoso ou preocupado. Você tende a antecipar que as coisas podem dar errado e vivencia apreensão.',
  'You are generally calm and relaxed. You don''t worry much and feel secure most of the time.',
  'Você é geralmente calmo e relaxado. Você não se preocupa muito e se sente seguro na maior parte do tempo.'
)
ON CONFLICT (facet_code) DO NOTHING;

-- N2: Raiva/Hostilidade (Angry Hostility/Irritability)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'N', 'N2', 'Angry Hostility', 'Raiva/Hostilidade', 2,
  'Tendency to experience anger, frustration, and bitterness.',
  'Tendência de vivenciar raiva, frustração e amargura.',
  'You are prone to feeling angry, frustrated, or bitter when things don''t go your way. You may experience resentment easily.',
  'Você é propenso a sentir raiva, frustração ou amargura quando as coisas não saem do seu jeito. Você pode vivenciar ressentimento facilmente.',
  'You are even-tempered and slow to anger. You don''t easily get irritated or hold grudges.',
  'Você tem temperamento equilibrado e demora para ficar com raiva. Você não se irrita facilmente nem guarda rancor.'
)
ON CONFLICT (facet_code) DO NOTHING;

-- N4: Autoconsciência (Self-Consciousness/Shyness)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'N', 'N4', 'Self-Consciousness', 'Autoconsciência', 4,
  'Sensitivity to what others think; shyness and social anxiety.',
  'Sensibilidade ao que os outros pensam; timidez e ansiedade social.',
  'You are very aware of what others might think of you. You feel self-conscious, shy, or embarrassed in social situations.',
  'Você é muito consciente do que os outros podem pensar de você. Você se sente envergonhado, tímido ou constrangido em situações sociais.',
  'You are comfortable being the center of attention. You don''t worry much about what others think or feel embarrassed easily.',
  'Você se sente confortável sendo o centro das atenções. Você não se preocupa muito com o que os outros pensam ou se envergonha facilmente.'
)
ON CONFLICT (facet_code) DO NOTHING;

-- Verification: Count facets per dimension
SELECT
  dimension_code,
  COUNT(*) as facet_count,
  STRING_AGG(facet_code, ', ' ORDER BY order_index) as facets
FROM bigfive_facets
GROUP BY dimension_code
ORDER BY dimension_code;

-- Final verification - should show 30 total facets
SELECT
  'Fix completed! All 30 facets should now be present.' as status,
  COUNT(*) as total_facets,
  COUNT(DISTINCT dimension_code) as dimensions_covered,
  CASE
    WHEN COUNT(*) = 30 THEN '✅ COMPLETE - All 30 facets loaded!'
    ELSE '⚠️ INCOMPLETE - Expected 30, got ' || COUNT(*) || ' facets'
  END as completion_status
FROM bigfive_facets;
