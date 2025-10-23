-- Seed Data: NEO-PI-R 30 Facets (Big Five OCEAN Model)
-- Phase 2.2: Complete facet descriptions in Portuguese and English

-- Clear existing facets (if re-running)
TRUNCATE TABLE bigfive_facets CASCADE;

-- ============================================
-- ABERTURA (O - Openness to Experience)
-- ============================================

-- O1: Fantasia (Fantasy/Imagination)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'O', 'O1', 'Fantasy', 'Fantasia', 1,
  'The tendency to have a vivid imagination and rich fantasy life.',
  'A tendência de ter uma imaginação vívida e uma vida de fantasia rica.',
  'You have a rich inner world filled with imagination and daydreams. You easily envision alternative realities and enjoy creative mental exploration.',
  'Você tem um mundo interior rico, cheio de imaginação e devaneios. Você facilmente imagina realidades alternativas e gosta de exploração mental criativa.',
  'You tend to be more grounded in reality and practical matters. You prefer concrete thinking over abstract imagination.',
  'Você tende a ser mais ancorado na realidade e em questões práticas. Você prefere pensamento concreto em vez de imaginação abstrata.'
);

-- O2: Estética (Aesthetics/Artistic Interests)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'O', 'O2', 'Aesthetics', 'Estética', 2,
  'Appreciation for art, beauty, poetry, and aesthetic experiences.',
  'Apreciação por arte, beleza, poesia e experiências estéticas.',
  'You are deeply moved by beauty in art, music, poetry, and nature. Aesthetic experiences are profoundly meaningful to you.',
  'Você é profundamente tocado pela beleza na arte, música, poesia e natureza. Experiências estéticas são profundamente significativas para você.',
  'You are less interested in artistic pursuits and aesthetic experiences. You may view art as less important than practical matters.',
  'Você tem menos interesse em atividades artísticas e experiências estéticas. Você pode ver a arte como menos importante que questões práticas.'
);

-- O3: Sentimentos (Feelings/Emotional Depth)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'O', 'O3', 'Feelings', 'Sentimentos', 3,
  'Receptivity to inner feelings and emotions; valuing emotional depth.',
  'Receptividade a sentimentos e emoções internas; valorização da profundidade emocional.',
  'You experience emotions deeply and intensely. You are in touch with your inner emotional life and value emotional experiences.',
  'Você vivencia emoções profunda e intensamente. Você está em contato com sua vida emocional interior e valoriza experiências emocionais.',
  'You tend to be less aware of or affected by your emotions. You may view emotional expression as less important.',
  'Você tende a estar menos consciente ou afetado por suas emoções. Você pode ver a expressão emocional como menos importante.'
);

-- O4: Ações (Actions/Trying New Things)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'O', 'O4', 'Actions', 'Ações', 4,
  'Willingness to try new activities, visit new places, and experience variety.',
  'Disposição para experimentar novas atividades, visitar novos lugares e vivenciar variedade.',
  'You actively seek out new experiences and activities. You enjoy variety, trying new foods, traveling to unfamiliar places, and breaking routines.',
  'Você busca ativamente novas experiências e atividades. Você gosta de variedade, experimentar novas comidas, viajar para lugares desconhecidos e quebrar rotinas.',
  'You prefer familiar routines and established patterns. You are more comfortable with the known than the unknown.',
  'Você prefere rotinas familiares e padrões estabelecidos. Você se sente mais confortável com o conhecido do que com o desconhecido.'
);

-- O5: Ideias (Ideas/Intellectual Curiosity)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'O', 'O5', 'Ideas', 'Ideias', 5,
  'Intellectual curiosity and openness to new and complex ideas.',
  'Curiosidade intelectual e abertura para ideias novas e complexas.',
  'You love exploring abstract concepts and intellectual discussions. You enjoy learning for its own sake and contemplating philosophical questions.',
  'Você adora explorar conceitos abstratos e discussões intelectuais. Você gosta de aprender pelo prazer do aprendizado e contemplar questões filosóficas.',
  'You prefer practical knowledge over abstract ideas. You may find theoretical discussions less engaging.',
  'Você prefere conhecimento prático em vez de ideias abstratas. Você pode achar discussões teóricas menos envolventes.'
);

-- O6: Valores (Values/Open-mindedness)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'O', 'O6', 'Values', 'Valores', 6,
  'Readiness to re-examine social, political, and religious values.',
  'Prontidão para reexaminar valores sociais, políticos e religiosos.',
  'You question traditional values and are open to reconsidering beliefs. You are tolerant of different viewpoints and lifestyles.',
  'Você questiona valores tradicionais e está aberto a reconsiderar crenças. Você é tolerante com diferentes pontos de vista e estilos de vida.',
  'You tend to accept traditional values and are more conservative in your beliefs. You value stability in social and moral norms.',
  'Você tende a aceitar valores tradicionais e é mais conservador em suas crenças. Você valoriza estabilidade em normas sociais e morais.'
);

-- ============================================
-- CONSCIENCIOSIDADE (C - Conscientiousness)
-- ============================================

-- C1: Competência (Competence/Self-Efficacy)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'C', 'C1', 'Competence', 'Competência', 1,
  'Belief in one\'s own ability to accomplish tasks and handle situations.',
  'Crença na própria capacidade de realizar tarefas e lidar com situações.',
  'You feel well-prepared and capable of handling life\'s challenges. You have confidence in your ability to think things through and succeed.',
  'Você se sente bem preparado e capaz de lidar com os desafios da vida. Você tem confiança em sua capacidade de pensar bem as coisas e ter sucesso.',
  'You may doubt your abilities and feel unprepared for challenges. You may be more self-critical about your capabilities.',
  'Você pode duvidar de suas habilidades e se sentir despreparado para desafios. Você pode ser mais autocrítico sobre suas capacidades.'
);

-- C2: Ordem (Order/Organization)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'C', 'C2', 'Order', 'Ordem', 2,
  'Preference for organization, tidiness, and structure in one\'s environment.',
  'Preferência por organização, arrumação e estrutura no ambiente.',
  'You keep things neat, organized, and in their proper place. You have systems and structure in your physical and mental spaces.',
  'Você mantém as coisas arrumadas, organizadas e em seus devidos lugares. Você tem sistemas e estrutura em seus espaços físicos e mentais.',
  'You are more comfortable with clutter and disorganization. You may find rigid organization less important or constraining.',
  'Você se sente mais confortável com bagunça e desorganização. Você pode achar organização rígida menos importante ou restritiva.'
);

-- C3: Senso de Dever (Dutifulness/Sense of Duty)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'C', 'C3', 'Dutifulness', 'Senso de Dever', 3,
  'Adherence to ethical principles and commitment to obligations.',
  'Adesão a princípios éticos e comprometimento com obrigações.',
  'You take your obligations seriously and feel a strong sense of duty. You are reliable and keep your promises even when it\'s difficult.',
  'Você leva suas obrigações a sério e sente um forte senso de dever. Você é confiável e mantém suas promessas mesmo quando é difícil.',
  'You are more flexible about rules and obligations. You may prioritize personal freedom over strict adherence to duties.',
  'Você é mais flexível sobre regras e obrigações. Você pode priorizar liberdade pessoal em vez de adesão estrita a deveres.'
);

-- C4: Busca por Realização (Achievement Striving/Ambition)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'C', 'C4', 'Achievement Striving', 'Busca por Realização', 4,
  'Drive to achieve goals, excel, and be recognized for accomplishments.',
  'Impulso para alcançar objetivos, se destacar e ser reconhecido por conquistas.',
  'You set high goals for yourself and work hard to achieve them. You are ambitious and strive for excellence in what you do.',
  'Você estabelece metas elevadas para si mesmo e trabalha duro para alcançá-las. Você é ambicioso e busca excelência no que faz.',
  'You are more laid-back about achievements and success. You may be content with "good enough" rather than striving for excellence.',
  'Você é mais descontraído sobre conquistas e sucesso. Você pode se contentar com "bom o suficiente" em vez de buscar excelência.'
);

-- C5: Autodisciplina (Self-Discipline/Follow-through)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'C', 'C5', 'Self-Discipline', 'Autodisciplina', 5,
  'Ability to begin tasks and follow through despite distractions or boredom.',
  'Capacidade de iniciar tarefas e perseverar apesar de distrações ou tédio.',
  'You can motivate yourself to complete tasks even when they\'re boring or difficult. You follow through on commitments and finish what you start.',
  'Você consegue se motivar para completar tarefas mesmo quando são chatas ou difíceis. Você cumpre compromissos e termina o que começa.',
  'You may struggle to start or complete tasks, especially if they\'re uninteresting. You are more easily distracted or tempted to procrastinate.',
  'Você pode ter dificuldade para começar ou completar tarefas, especialmente se não são interessantes. Você é mais facilmente distraído ou tentado a procrastinar.'
);

-- C6: Deliberação (Deliberation/Cautiousness)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'C', 'C6', 'Deliberation', 'Deliberação', 6,
  'Tendency to think carefully before acting; cautiousness in decision-making.',
  'Tendência de pensar cuidadosamente antes de agir; cautela na tomada de decisões.',
  'You think things through carefully before making decisions. You consider consequences and plan ahead to avoid mistakes.',
  'Você pensa bem as coisas antes de tomar decisões. Você considera consequências e planeja com antecedência para evitar erros.',
  'You tend to act more spontaneously and make quick decisions. You may speak or act without extensive deliberation.',
  'Você tende a agir mais espontaneamente e tomar decisões rápidas. Você pode falar ou agir sem deliberação extensa.'
);

-- ============================================
-- EXTROVERSÃO (E - Extraversion)
-- ============================================

-- E1: Acolhimento (Warmth/Friendliness)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'E', 'E1', 'Warmth', 'Acolhimento', 1,
  'Friendliness and affection toward others; forming close attachments.',
  'Cordialidade e afeição em relação aos outros; formação de vínculos próximos.',
  'You are genuinely warm, friendly, and affectionate. You easily form close bonds and show care for others.',
  'Você é genuinamente caloroso, amigável e afetuoso. Você facilmente forma vínculos próximos e demonstra cuidado pelos outros.',
  'You are more reserved and formal in relationships. You may keep more emotional distance and be less openly affectionate.',
  'Você é mais reservado e formal nos relacionamentos. Você pode manter mais distância emocional e ser menos abertamente afetuoso.'
);

-- E2: Gregarismo (Gregariousness/Sociability)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'E', 'E2', 'Gregariousness', 'Gregarismo', 2,
  'Preference for company of others and being part of a crowd.',
  'Preferência pela companhia de outros e fazer parte de um grupo.',
  'You enjoy being around people and seek out social gatherings. You prefer the company of others to being alone.',
  'Você gosta de estar perto de pessoas e busca reuniões sociais. Você prefere a companhia de outros a estar sozinho.',
  'You are comfortable spending time alone and may prefer solitude. You don\'t feel the need to constantly be around others.',
  'Você se sente confortável passando tempo sozinho e pode preferir a solidão. Você não sente necessidade de estar constantemente perto de outros.'
);

-- E3: Assertividade (Assertiveness/Leadership)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'E', 'E3', 'Assertiveness', 'Assertividade', 3,
  'Tendency to take charge, speak up, and assume leadership roles.',
  'Tendência de assumir o controle, se expressar e assumir papéis de liderança.',
  'You are comfortable taking charge and speaking your mind. You naturally step into leadership roles and express your opinions confidently.',
  'Você se sente confortável assumindo o controle e expressando sua opinião. Você naturalmente assume papéis de liderança e expressa suas opiniões com confiança.',
  'You tend to let others lead and prefer to stay in the background. You may be less comfortable speaking up or taking charge.',
  'Você tende a deixar outros liderarem e prefere ficar em segundo plano. Você pode se sentir menos confortável se expressando ou assumindo o controle.'
);

-- E4: Atividade (Activity/Energy Level)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'E', 'E4', 'Activity', 'Atividade', 4,
  'Pace of living; energy level and preference for keeping busy.',
  'Ritmo de vida; nível de energia e preferência por se manter ocupado.',
  'You live at a fast pace and are always on the go. You have high energy and like to stay busy with activities.',
  'Você vive num ritmo acelerado e está sempre em movimento. Você tem alta energia e gosta de se manter ocupado com atividades.',
  'You prefer a slower, more leisurely pace. You are comfortable with relaxation and downtime.',
  'Você prefere um ritmo mais lento e tranquilo. Você se sente confortável com relaxamento e tempo livre.'
);

-- E5: Busca por Excitação (Excitement-Seeking/Thrill-seeking)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'E', 'E5', 'Excitement-Seeking', 'Busca por Excitação', 5,
  'Desire for stimulation, thrills, and exciting experiences.',
  'Desejo por estimulação, emoções fortes e experiências excitantes.',
  'You crave excitement, bright colors, noise, and stimulation. You enjoy taking risks and seeking thrilling experiences.',
  'Você deseja excitação, cores vibrantes, barulho e estimulação. Você gosta de correr riscos e buscar experiências emocionantes.',
  'You prefer calm, quiet environments. You are less drawn to loud, stimulating, or risky activities.',
  'Você prefere ambientes calmos e silenciosos. Você é menos atraído por atividades barulhentas, estimulantes ou arriscadas.'
);

-- E6: Emoções Positivas (Positive Emotions/Cheerfulness)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'E', 'E6', 'Positive Emotions', 'Emoções Positivas', 6,
  'Tendency to experience joy, happiness, love, and enthusiasm.',
  'Tendência de vivenciar alegria, felicidade, amor e entusiasmo.',
  'You frequently experience positive emotions like joy, enthusiasm, and happiness. You often feel upbeat and cheerful.',
  'Você frequentemente vivencia emoções positivas como alegria, entusiasmo e felicidade. Você frequentemente se sente animado e alegre.',
  'You experience positive emotions less intensely or frequently. You tend to be more serious or emotionally neutral.',
  'Você vivencia emoções positivas com menos intensidade ou frequência. Você tende a ser mais sério ou emocionalmente neutro.'
);

-- ============================================
-- AMABILIDADE (A - Agreeableness)
-- ============================================

-- A1: Confiança (Trust/Belief in Others)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'A', 'A1', 'Trust', 'Confiança', 1,
  'Belief in the honesty and good intentions of others.',
  'Crença na honestidade e boas intenções dos outros.',
  'You tend to believe others are honest and well-intentioned. You give people the benefit of the doubt and trust easily.',
  'Você tende a acreditar que os outros são honestos e bem-intencionados. Você dá o benefício da dúvida às pessoas e confia facilmente.',
  'You are more skeptical and cautious about others\' motives. You may be suspicious or cynical about people\'s intentions.',
  'Você é mais cético e cauteloso sobre os motivos dos outros. Você pode ser desconfiado ou cínico sobre as intenções das pessoas.'
);

-- A2: Franqueza (Straightforwardness/Honesty)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'A', 'A2', 'Straightforwardness', 'Franqueza', 2,
  'Frankness and sincerity in expression; genuine and authentic communication.',
  'Franqueza e sinceridade na expressão; comunicação genuína e autêntica.',
  'You are frank, sincere, and genuine in your interactions. You value honesty and directness in communication.',
  'Você é franco, sincero e genuíno em suas interações. Você valoriza honestidade e comunicação direta.',
  'You are more willing to use flattery or manipulation when needed. You may be more strategic or guarded in what you say.',
  'Você está mais disposto a usar bajulação ou manipulação quando necessário. Você pode ser mais estratégico ou cauteloso no que diz.'
);

-- A3: Altruísmo (Altruism/Generosity)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'A', 'A3', 'Altruism', 'Altruísmo', 3,
  'Active concern for others\' welfare and willingness to help.',
  'Preocupação ativa com o bem-estar dos outros e disposição para ajudar.',
  'You find genuine satisfaction in helping others. You are generous with your time and resources to support those in need.',
  'Você encontra satisfação genuína em ajudar os outros. Você é generoso com seu tempo e recursos para apoiar quem precisa.',
  'You are less focused on helping others and may prioritize self-interest. You expect reciprocity when you do help.',
  'Você é menos focado em ajudar os outros e pode priorizar interesse próprio. Você espera reciprocidade quando ajuda.'
);

-- A4: Complacência (Compliance/Cooperation)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'A', 'A4', 'Compliance', 'Complacência', 4,
  'Response to interpersonal conflict; preference for cooperation over competition.',
  'Resposta a conflitos interpessoais; preferência por cooperação em vez de competição.',
  'You avoid confrontation and prefer to defer or compromise in conflicts. You prioritize harmony over winning.',
  'Você evita confronto e prefere ceder ou fazer acordos em conflitos. Você prioriza harmonia em vez de vencer.',
  'You are more willing to argue, compete, or intimidate to get your way. You stand your ground in conflicts.',
  'Você está mais disposto a discutir, competir ou intimidar para conseguir o que quer. Você mantém sua posição em conflitos.'
);

-- A5: Modéstia (Modesty/Humility)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'A', 'A5', 'Modesty', 'Modéstia', 5,
  'Humility and reluctance to claim superiority over others.',
  'Humildade e relutância em reivindicar superioridade sobre os outros.',
  'You are humble and don\'t seek the spotlight. You are uncomfortable with praise and don\'t see yourself as superior to others.',
  'Você é humilde e não busca os holofotes. Você se sente desconfortável com elogios e não se vê como superior aos outros.',
  'You are more confident in your abilities and comfortable with self-promotion. You may see yourself as better than average.',
  'Você é mais confiante em suas habilidades e confortável com autopromoção. Você pode se ver como acima da média.'
);

-- A6: Sensibilidade (Tender-Mindedness/Empathy)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'A', 'A6', 'Tender-Mindedness', 'Sensibilidade', 6,
  'Empathy, sympathy, and compassion for others.',
  'Empatia, simpatia e compaixão pelos outros.',
  'You are moved by others\' needs and are compassionate. You feel sympathy and concern for those who are suffering.',
  'Você é tocado pelas necessidades dos outros e é compassivo. Você sente simpatia e preocupação por aqueles que estão sofrendo.',
  'You are more tough-minded and less swayed by emotional appeals. You prioritize logic and objectivity over sentiment.',
  'Você é mais pragmático e menos influenciado por apelos emocionais. Você prioriza lógica e objetividade em vez de sentimento.'
);

-- ============================================
-- NEUROTICISMO (N - Neuroticism)
-- ============================================

-- N1: Ansiedade (Anxiety/Worry)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'N', 'N1', 'Anxiety', 'Ansiedade', 1,
  'Tendency to worry, feel apprehensive, and experience nervousness.',
  'Tendência de se preocupar, sentir apreensão e vivenciar nervosismo.',
  'You often feel anxious, nervous, or worried. You tend to anticipate that things might go wrong and experience apprehension.',
  'Você frequentemente se sente ansioso, nervoso ou preocupado. Você tende a antecipar que as coisas podem dar errado e vivencia apreensão.',
  'You are generally calm and relaxed. You don\'t worry much and feel secure most of the time.',
  'Você é geralmente calmo e relaxado. Você não se preocupa muito e se sente seguro na maior parte do tempo.'
);

-- N2: Raiva/Hostilidade (Angry Hostility/Irritability)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'N', 'N2', 'Angry Hostility', 'Raiva/Hostilidade', 2,
  'Tendency to experience anger, frustration, and bitterness.',
  'Tendência de vivenciar raiva, frustração e amargura.',
  'You are prone to feeling angry, frustrated, or bitter when things don\'t go your way. You may experience resentment easily.',
  'Você é propenso a sentir raiva, frustração ou amargura quando as coisas não saem do seu jeito. Você pode vivenciar ressentimento facilmente.',
  'You are even-tempered and slow to anger. You don\'t easily get irritated or hold grudges.',
  'Você tem temperamento equilibrado e demora para ficar com raiva. Você não se irrita facilmente nem guarda rancor.'
);

-- N3: Depressão (Depression/Sadness)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'N', 'N3', 'Depression', 'Depressão', 3,
  'Tendency to feel sad, lonely, dejected, and discouraged.',
  'Tendência de se sentir triste, solitário, abatido e desanimado.',
  'You are prone to feelings of sadness, loneliness, and discouragement. You may experience periods of low mood and hopelessness.',
  'Você é propenso a sentimentos de tristeza, solidão e desânimo. Você pode vivenciar períodos de humor baixo e desesperança.',
  'You rarely feel sad or dejected. You generally feel content and optimistic about life.',
  'Você raramente se sente triste ou abatido. Você geralmente se sente satisfeito e otimista sobre a vida.'
);

-- N4: Autoconsciência (Self-Consciousness/Shyness)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'N', 'N4', 'Self-Consciousness', 'Autoconsciência', 4,
  'Sensitivity to what others think; shyness and social anxiety.',
  'Sensibilidade ao que os outros pensam; timidez e ansiedade social.',
  'You are very aware of what others might think of you. You feel self-conscious, shy, or embarrassed in social situations.',
  'Você é muito consciente do que os outros podem pensar de você. Você se sente envergonhado, tímido ou constrangido em situações sociais.',
  'You are comfortable being the center of attention. You don\'t worry much about what others think or feel embarrassed easily.',
  'Você se sente confortável sendo o centro das atenções. Você não se preocupa muito com o que os outros pensam ou se envergonha facilmente.'
);

-- N5: Impulsividade (Impulsiveness/Self-Control Issues)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'N', 'N5', 'Impulsiveness', 'Impulsividade', 5,
  'Tendency to act on cravings and urges without considering consequences.',
  'Tendência de agir por desejos e impulsos sem considerar consequências.',
  'You often act on impulse without thinking through the consequences. You have difficulty resisting cravings and temptations.',
  'Você frequentemente age por impulso sem pensar nas consequências. Você tem dificuldade em resistir a desejos e tentações.',
  'You have strong self-control and resist temptations easily. You think before acting on urges.',
  'Você tem forte autocontrole e resiste facilmente a tentações. Você pensa antes de agir por impulsos.'
);

-- N6: Vulnerabilidade (Vulnerability/Stress Sensitivity)
INSERT INTO bigfive_facets (dimension_code, facet_code, facet_name, facet_name_pt, order_index, facet_description, facet_description_pt, high_score_description, high_score_description_pt, low_score_description, low_score_description_pt)
VALUES (
  'N', 'N6', 'Vulnerability', 'Vulnerabilidade', 6,
  'Susceptibility to stress and inability to cope with pressure.',
  'Suscetibilidade ao estresse e incapacidade de lidar com pressão.',
  'You feel overwhelmed and unable to cope when under stress or pressure. You may panic or feel helpless in difficult situations.',
  'Você se sente sobrecarregado e incapaz de lidar quando sob estresse ou pressão. Você pode entrar em pânico ou se sentir desamparado em situações difíceis.',
  'You remain calm and clear-headed under pressure. You feel capable of handling emergencies and stressful situations.',
  'Você permanece calmo e com a cabeça no lugar sob pressão. Você se sente capaz de lidar com emergências e situações estressantes.'
);

-- Verification: Count facets per dimension
SELECT
  dimension_code,
  COUNT(*) as facet_count,
  STRING_AGG(facet_code, ', ' ORDER BY order_index) as facets
FROM bigfive_facets
GROUP BY dimension_code
ORDER BY dimension_code;

-- Final verification
SELECT
  'Seed completed successfully!' as status,
  COUNT(*) as total_facets,
  COUNT(DISTINCT dimension_code) as dimensions_covered
FROM bigfive_facets;
