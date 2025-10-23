-- Seed: Big Five Compatibility Insights (Phase 4)
-- Insights de compatibilidade em relacionamentos para cada dimensão e faixa de pontuação
-- Baseado em pesquisa científica sobre Big Five e relacionamentos
-- Data: 2025-10-23

-- =========================================
-- ABERTURA (Openness) - O
-- =========================================

-- Alta Abertura (60-100)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'O', 'high',
  'Deep, philosophical, explores abstract ideas and possibilities. Enjoys meaningful conversations and intellectual stimulation.',
  'Profunda, filosófica, explora ideias abstratas e possibilidades. Aprecia conversas significativas e estimulação intelectual.',
  ARRAY[
    'Brings creativity and novelty to the relationship',
    'Open to new experiences together',
    'Intellectually stimulating partner',
    'Flexible and adaptable to change',
    'Appreciates partner''s uniqueness'
  ],
  ARRAY[
    'Traz criatividade e novidade para o relacionamento',
    'Aberto a novas experiências juntos',
    'Parceiro intelectualmente estimulante',
    'Flexível e adaptável a mudanças',
    'Aprecia a singularidade do parceiro'
  ],
  ARRAY[
    'May seek more novelty than partner is comfortable with',
    'Can be seen as impractical or "head in the clouds"',
    'May undervalue routine and stability',
    'Might push partner out of comfort zone too quickly'
  ],
  ARRAY[
    'Pode buscar mais novidade do que o parceiro está confortável',
    'Pode ser visto como impratico ou "cabeça nas nuvens"',
    'Pode desvalorizar rotina e estabilidade',
    'Pode empurrar o parceiro para fora da zona de conforto muito rápido'
  ],
  'Ideal partner: Someone who appreciates intellectual exploration OR someone more grounded who provides stability. High-Low pairing can work if both value each other''s perspectives. High-High pairing thrives on shared curiosity.',
  'Parceiro ideal: Alguém que aprecia exploração intelectual OU alguém mais ancorado que fornece estabilidade. Pareamento Alto-Baixo pode funcionar se ambos valorizam as perspectivas um do outro. Pareamento Alto-Alto prospera na curiosidade compartilhada.',
  'Approaches conflicts creatively, seeks to understand underlying issues. Prefers discussing ideas and exploring multiple solutions. May intellectualize emotions.',
  'Aborda conflitos criativamente, busca entender questões subjacentes. Prefere discutir ideias e explorar múltiplas soluções. Pode intelectualizar emoções.',
  ARRAY[
    'Share new experiences together regularly',
    'Have deep conversations about ideas and possibilities',
    'Balance novelty-seeking with partner''s need for stability',
    'Appreciate when partner grounds you in practical matters',
    'Don''t judge partner for preferring routine'
  ],
  ARRAY[
    'Compartilhem novas experiências juntos regularmente',
    'Tenham conversas profundas sobre ideias e possibilidades',
    'Equilibre busca por novidade com necessidade de estabilidade do parceiro',
    'Aprecie quando o parceiro te ancora em questões práticas',
    'Não julgue o parceiro por preferir rotina'
  ]
);

-- Abertura Média (40-60)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'O', 'medium',
  'Balanced between practical and imaginative. Can discuss both concrete matters and abstract ideas. Adapts communication style to situation.',
  'Equilibrado entre prático e imaginativo. Pode discutir tanto assuntos concretos quanto ideias abstratas. Adapta estilo de comunicação à situação.',
  ARRAY[
    'Versatile and adaptable in relationship',
    'Can appreciate both routine and novelty',
    'Bridges different communication styles',
    'Comfortable with moderate change',
    'Balances stability with excitement'
  ],
  ARRAY[
    'Versátil e adaptável no relacionamento',
    'Pode apreciar tanto rotina quanto novidade',
    'Faz ponte entre diferentes estilos de comunicação',
    'Confortável com mudança moderada',
    'Equilibra estabilidade com emoção'
  ],
  ARRAY[
    'May feel pulled in different directions',
    'Could lack strong identity in relationship dynamics',
    'Might not fully satisfy partners with extreme preferences',
    'Can be indecisive about new experiences'
  ],
  ARRAY[
    'Pode se sentir puxado em diferentes direções',
    'Pode faltar identidade forte na dinâmica do relacionamento',
    'Pode não satisfazer totalmente parceiros com preferências extremas',
    'Pode ser indeciso sobre novas experiências'
  ],
  'Ideal partner: Compatible with most personality types. Can harmonize with high-openness partners who bring adventure, or low-openness partners who bring stability.',
  'Parceiro ideal: Compatível com a maioria dos tipos de personalidade. Pode harmonizar com parceiros de alta abertura que trazem aventura, ou baixa abertura que trazem estabilidade.',
  'Flexible conflict resolution style. Can be practical or creative as needed. Seeks middle ground and compromise.',
  'Estilo flexível de resolução de conflitos. Pode ser prático ou criativo conforme necessário. Busca meio-termo e compromisso.',
  ARRAY[
    'Communicate your need for both stability and variety',
    'Don''t suppress either practical or imaginative sides',
    'Help partner understand your adaptability is a strength',
    'Mix routine activities with occasional new experiences',
    'Be clear about which situations need which approach'
  ],
  ARRAY[
    'Comunique sua necessidade tanto de estabilidade quanto de variedade',
    'Não suprima o lado prático nem o imaginativo',
    'Ajude o parceiro a entender que sua adaptabilidade é uma força',
    'Misture atividades rotineiras com experiências novas ocasionais',
    'Seja claro sobre quais situações precisam de qual abordagem'
  ]
);

-- Baixa Abertura (0-40)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'O', 'low',
  'Practical, straightforward, prefers concrete topics. Values clear, direct communication. Focuses on facts and proven methods.',
  'Prático, direto, prefere tópicos concretos. Valoriza comunicação clara e direta. Foca em fatos e métodos comprovados.',
  ARRAY[
    'Provides stability and predictability',
    'Reliable and consistent in relationship',
    'Values traditional relationship structures',
    'Practical problem-solver',
    'Creates comfortable routines together'
  ],
  ARRAY[
    'Fornece estabilidade e previsibilidade',
    'Confiável e consistente no relacionamento',
    'Valoriza estruturas tradicionais de relacionamento',
    'Solucionador de problemas prático',
    'Cria rotinas confortáveis juntos'
  ],
  ARRAY[
    'May resist partner''s desire for novelty',
    'Could be seen as rigid or set in ways',
    'Might miss opportunities for growth through new experiences',
    'May not understand partner''s need for intellectual stimulation'
  ],
  ARRAY[
    'Pode resistir ao desejo do parceiro por novidade',
    'Pode ser visto como rígido ou preso aos costumes',
    'Pode perder oportunidades de crescimento através de novas experiências',
    'Pode não entender necessidade do parceiro por estimulação intelectual'
  ],
  'Ideal partner: Someone who values stability and tradition OR someone more open who gently introduces new perspectives. Low-Low pairing enjoys shared routines. Low-High pairing works when both respect differences.',
  'Parceiro ideal: Alguém que valoriza estabilidade e tradição OU alguém mais aberto que gentilmente introduz novas perspectivas. Pareamento Baixo-Baixo aprecia rotinas compartilhadas. Pareamento Baixo-Alto funciona quando ambos respeitam diferenças.',
  'Prefers practical, concrete solutions. Relies on what has worked before. May need time to process abstract conflicts. Values clear action steps.',
  'Prefere soluções práticas e concretas. Confia no que funcionou antes. Pode precisar de tempo para processar conflitos abstratos. Valoriza passos de ação claros.',
  ARRAY[
    'Appreciate your partner''s stability and reliability',
    'Try new experiences occasionally to show flexibility',
    'Communicate when you need routine and predictability',
    'Value your practical approach to relationship challenges',
    'Don''t dismiss partner''s imaginative ideas too quickly'
  ],
  ARRAY[
    'Aprecie a estabilidade e confiabilidade do seu parceiro',
    'Experimente coisas novas ocasionalmente para mostrar flexibilidade',
    'Comunique quando você precisa de rotina e previsibilidade',
    'Valorize sua abordagem prática para desafios do relacionamento',
    'Não descarte ideias imaginativas do parceiro muito rapidamente'
  ]
);

-- =========================================
-- CONSCIENCIOSIDADE (Conscientiousness) - C
-- =========================================

-- Alta Conscienciosidade (60-100)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'C', 'high',
  'Organized, plans ahead, follows through on commitments. Clear about expectations and responsibilities. Values punctuality and reliability.',
  'Organizado, planeja com antecedência, cumpre compromissos. Claro sobre expectativas e responsabilidades. Valoriza pontualidade e confiabilidade.',
  ARRAY[
    'Highly reliable and dependable partner',
    'Takes relationship commitments seriously',
    'Plans for the future together',
    'Manages household tasks efficiently',
    'Sets and achieves relationship goals'
  ],
  ARRAY[
    'Parceiro altamente confiável e dependente',
    'Leva compromissos do relacionamento a sério',
    'Planeja o futuro juntos',
    'Gerencia tarefas domésticas eficientemente',
    'Define e alcança objetivos do relacionamento'
  ],
  ARRAY[
    'May be too rigid or perfectionistic',
    'Could criticize partner''s spontaneity or messiness',
    'Might have difficulty relaxing and being spontaneous',
    'Can be judgmental about partner''s disorganization'
  ],
  ARRAY[
    'Pode ser muito rígido ou perfeccionista',
    'Pode criticar espontaneidade ou bagunça do parceiro',
    'Pode ter dificuldade em relaxar e ser espontâneo',
    'Pode julgar desorganização do parceiro'
  ],
  'Ideal partner: Someone equally organized who shares planning mindset OR someone spontaneous who helps loosen up. High-High pairing achieves goals together. High-Low pairing balances structure with flexibility.',
  'Parceiro ideal: Alguém igualmente organizado que compartilha mentalidade de planejamento OU alguém espontâneo que ajuda a relaxar. Pareamento Alto-Alto alcança objetivos juntos. Pareamento Alto-Baixo equilibra estrutura com flexibilidade.',
  'Systematic, solution-focused approach. Creates action plans to resolve issues. May need to work on flexibility. Values following through on agreements.',
  'Abordagem sistemática e focada em soluções. Cria planos de ação para resolver problemas. Pode precisar trabalhar na flexibilidade. Valoriza cumprir acordos.',
  ARRAY[
    'Allow room for spontaneity in the relationship',
    'Don''t let perfectionism harm connection',
    'Appreciate partner''s strengths even if different',
    'Schedule time for unstructured quality time',
    'Communicate standards without being controlling'
  ],
  ARRAY[
    'Permita espaço para espontaneidade no relacionamento',
    'Não deixe o perfeccionismo prejudicar a conexão',
    'Aprecie os pontos fortes do parceiro mesmo se diferentes',
    'Agende tempo para tempo de qualidade não estruturado',
    'Comunique padrões sem ser controlador'
  ]
);

-- Conscienciosidade Média (40-60)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'C', 'medium',
  'Balanced between organized and spontaneous. Plans important things but stays flexible. Reliable in major commitments.',
  'Equilibrado entre organizado e espontâneo. Planeja coisas importantes mas permanece flexível. Confiável em compromissos importantes.',
  ARRAY[
    'Flexible and adaptable in daily life',
    'Can be organized when it matters',
    'Balances planning with spontaneity',
    'Not overly rigid about household rules',
    'Comfortable with moderate structure'
  ],
  ARRAY[
    'Flexível e adaptável no dia a dia',
    'Pode ser organizado quando necessário',
    'Equilibra planejamento com espontaneidade',
    'Não excessivamente rígido sobre regras domésticas',
    'Confortável com estrutura moderada'
  ],
  ARRAY[
    'May lack consistency in some areas',
    'Could frustrate highly organized partners',
    'Might procrastinate on less urgent matters',
    'Can struggle with follow-through on long-term plans'
  ],
  ARRAY[
    'Pode faltar consistência em algumas áreas',
    'Pode frustrar parceiros altamente organizados',
    'Pode procrastinar em assuntos menos urgentes',
    'Pode ter dificuldade em dar seguimento a planos de longo prazo'
  ],
  'Ideal partner: Adapts well to various personality types. Can provide structure for spontaneous partners or flexibility for rigid partners.',
  'Parceiro ideal: Adapta-se bem a vários tipos de personalidade. Pode fornecer estrutura para parceiros espontâneos ou flexibilidade para parceiros rígidos.',
  'Pragmatic and situational. Can create plans or go with flow depending on issue. Seeks practical compromises.',
  'Pragmático e situacional. Pode criar planos ou seguir o fluxo dependendo do problema. Busca compromissos práticos.',
  ARRAY[
    'Be clear about which commitments are priorities',
    'Don''t use flexibility as excuse for unreliability',
    'Communicate when you need structure vs. spontaneity',
    'Find shared organizational systems that work for both',
    'Balance planning ahead with leaving room for adventure'
  ],
  ARRAY[
    'Seja claro sobre quais compromissos são prioridades',
    'Não use flexibilidade como desculpa para falta de confiabilidade',
    'Comunique quando você precisa de estrutura vs. espontaneidade',
    'Encontre sistemas organizacionais compartilhados que funcionem para ambos',
    'Equilibre planejamento com deixar espaço para aventura'
  ]
);

-- Baixa Conscienciosidade (0-40)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'C', 'low',
  'Spontaneous, flexible, goes with the flow. Prefers informal communication. May struggle with structured planning discussions.',
  'Espontâneo, flexível, vai com o fluxo. Prefere comunicação informal. Pode ter dificuldade com discussões de planejamento estruturadas.',
  ARRAY[
    'Brings spontaneity and adventure to relationship',
    'Flexible and easygoing',
    'Doesn''t sweat the small stuff',
    'Creative problem-solver',
    'Keeps relationship fun and lighthearted'
  ],
  ARRAY[
    'Traz espontaneidade e aventura para o relacionamento',
    'Flexível e tranquilo',
    'Não se preocupa com pequenos detalhes',
    'Solucionador criativo de problemas',
    'Mantém o relacionamento divertido e leve'
  ],
  ARRAY[
    'May be unreliable or miss commitments',
    'Could struggle with household responsibilities',
    'Might frustrate organized partners',
    'May procrastinate on important tasks',
    'Could have difficulty with long-term planning'
  ],
  ARRAY[
    'Pode ser não confiável ou perder compromissos',
    'Pode ter dificuldade com responsabilidades domésticas',
    'Pode frustrar parceiros organizados',
    'Pode procrastinar em tarefas importantes',
    'Pode ter dificuldade com planejamento de longo prazo'
  ],
  'Ideal partner: Someone who handles organization OR someone equally spontaneous for adventure together. Low-High pairing works if organized partner doesn''t become resentful of unequal task load.',
  'Parceiro ideal: Alguém que cuida da organização OU alguém igualmente espontâneo para aventura juntos. Pareamento Baixo-Alto funciona se parceiro organizado não se ressentir da carga desigual de tarefas.',
  'Prefers addressing issues in the moment. May avoid structured problem-solving. Values flexibility and going with feelings. Can struggle with follow-through.',
  'Prefere abordar problemas no momento. Pode evitar resolução estruturada de problemas. Valoriza flexibilidade e seguir os sentimentos. Pode ter dificuldade com dar seguimento.',
  ARRAY[
    'Work on reliability in key relationship areas',
    'Use systems (apps, reminders) to track commitments',
    'Appreciate partner who handles organizational tasks',
    'Don''t let spontaneity become irresponsibility',
    'Set realistic expectations about what you can commit to'
  ],
  ARRAY[
    'Trabalhe na confiabilidade em áreas-chave do relacionamento',
    'Use sistemas (apps, lembretes) para rastrear compromissos',
    'Aprecie parceiro que cuida de tarefas organizacionais',
    'Não deixe espontaneidade virar irresponsabilidade',
    'Defina expectativas realistas sobre o que você pode se comprometer'
  ]
);

-- =========================================
-- EXTROVERSÃO (Extraversion) - E
-- =========================================

-- Alta Extroversão (60-100)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'E', 'high',
  'Outgoing, expressive, thinks out loud. Enjoys frequent interaction and social activities. Energized by conversation and togetherness.',
  'Extrovertido, expressivo, pensa em voz alta. Aprecia interação frequente e atividades sociais. Energizado por conversa e estar junto.',
  ARRAY[
    'Brings energy and excitement to relationship',
    'Creates vibrant social life',
    'Expressive and warm partner',
    'Good at meeting new people together',
    'Keeps relationship active and engaging'
  ],
  ARRAY[
    'Traz energia e emoção para o relacionamento',
    'Cria vida social vibrante',
    'Parceiro expressivo e caloroso',
    'Bom em conhecer novas pessoas juntos',
    'Mantém relacionamento ativo e envolvente'
  ],
  ARRAY[
    'May need more social interaction than partner',
    'Could overwhelm introverted partners',
    'Might struggle with quiet alone time',
    'May not give partner enough solitude',
    'Could dominate conversations'
  ],
  ARRAY[
    'Pode precisar de mais interação social que o parceiro',
    'Pode sobrecarregar parceiros introvertidos',
    'Pode ter dificuldade com tempo quieto sozinho',
    'Pode não dar ao parceiro solidão suficiente',
    'Pode dominar conversas'
  ],
  'Ideal partner: Someone equally social who enjoys activities together OR someone introverted who appreciates your energy but sets boundaries. Respect partner''s need for recharge time.',
  'Parceiro ideal: Alguém igualmente social que aprecia atividades juntos OU alguém introvertido que aprecia sua energia mas define limites. Respeite necessidade do parceiro por tempo de recarga.',
  'Direct, immediate, wants to talk things through. Processes emotions verbally. May need to give partner space before discussions. Values open dialogue.',
  'Direto, imediato, quer conversar sobre as coisas. Processa emoções verbalmente. Pode precisar dar espaço ao parceiro antes de discussões. Valoriza diálogo aberto.',
  ARRAY[
    'Respect partner''s need for alone time',
    'Don''t take it personally if partner needs space',
    'Balance social activities with quiet time together',
    'Let partner process internally before discussing issues',
    'Appreciate introvert partner''s listening skills'
  ],
  ARRAY[
    'Respeite necessidade do parceiro por tempo sozinho',
    'Não leve para o lado pessoal se parceiro precisa de espaço',
    'Equilibre atividades sociais com tempo quieto juntos',
    'Deixe o parceiro processar internamente antes de discutir problemas',
    'Aprecie habilidades de escuta do parceiro introvertido'
  ]
);

-- Extroversão Média (40-60)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'E', 'medium',
  'Ambivert - flexible between social and solitary. Can engage socially or recharge alone. Adapts to partner''s energy level.',
  'Ambivertido - flexível entre social e solitário. Pode se envolver socialmente ou recarregar sozinho. Adapta-se ao nível de energia do parceiro.',
  ARRAY[
    'Versatile in social situations',
    'Can enjoy both parties and quiet nights',
    'Understands both extrovert and introvert needs',
    'Flexible about social calendar',
    'Bridges different social preferences'
  ],
  ARRAY[
    'Versátil em situações sociais',
    'Pode aproveitar tanto festas quanto noites tranquilas',
    'Entende necessidades tanto de extrovertidos quanto introvertidos',
    'Flexível sobre calendário social',
    'Faz ponte entre diferentes preferências sociais'
  ],
  ARRAY[
    'May struggle to define social needs clearly',
    'Could feel torn between socializing and recharging',
    'Might not fully satisfy extreme extrovert/introvert partners',
    'May change preference based on mood'
  ],
  ARRAY[
    'Pode ter dificuldade em definir necessidades sociais claramente',
    'Pode se sentir dividido entre socializar e recarregar',
    'Pode não satisfazer totalmente parceiros extrovertidos/introvertidos extremos',
    'Pode mudar preferência baseado no humor'
  ],
  'Ideal partner: Highly compatible with most types. Can energize introverts or calm extroverts. Appreciate your adaptability.',
  'Parceiro ideal: Altamente compatível com a maioria dos tipos. Pode energizar introvertidos ou acalmar extrovertidos. Aprecie sua adaptabilidade.',
  'Flexible approach - can talk through issues or take time to think. Balances immediate discussion with reflection. Adapts to partner''s style.',
  'Abordagem flexível - pode conversar sobre problemas ou tirar tempo para pensar. Equilibra discussão imediata com reflexão. Adapta-se ao estilo do parceiro.',
  ARRAY[
    'Communicate your current energy level',
    'Don''t suppress need for either socializing or solitude',
    'Help partner understand your flexibility',
    'Alternate between social and quiet activities',
    'Check in about social plans together'
  ],
  ARRAY[
    'Comunique seu nível de energia atual',
    'Não suprima necessidade de socializar ou solidão',
    'Ajude parceiro a entender sua flexibilidade',
    'Alterne entre atividades sociais e tranquilas',
    'Verifique sobre planos sociais juntos'
  ]
);

-- Baixa Extroversão (0-40) - Introversão
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'E', 'low',
  'Reserved, thoughtful, prefers one-on-one interactions. Needs time alone to recharge. Communicates more through actions than words.',
  'Reservado, pensativo, prefere interações um-a-um. Precisa de tempo sozinho para recarregar. Comunica mais através de ações que palavras.',
  ARRAY[
    'Deep, meaningful one-on-one connection',
    'Excellent listener',
    'Provides calm, stable presence',
    'Thoughtful and reflective partner',
    'Values quality time over quantity'
  ],
  ARRAY[
    'Conexão profunda e significativa um-a-um',
    'Excelente ouvinte',
    'Fornece presença calma e estável',
    'Parceiro pensativo e reflexivo',
    'Valoriza tempo de qualidade sobre quantidade'
  ],
  ARRAY[
    'May not meet extrovert partner''s social needs',
    'Could be seen as distant or unengaged',
    'Might avoid social situations partner enjoys',
    'May need to communicate need for alone time',
    'Could withdraw when stressed'
  ],
  ARRAY[
    'Pode não atender necessidades sociais do parceiro extrovertido',
    'Pode ser visto como distante ou desengajado',
    'Pode evitar situações sociais que parceiro aprecia',
    'Pode precisar comunicar necessidade de tempo sozinho',
    'Pode se retirar quando estressado'
  ],
  'Ideal partner: Another introvert for quiet companionship OR an extrovert who respects boundaries and handles social coordination. Low-Low pairing enjoys peaceful home life.',
  'Parceiro ideal: Outro introvertido para companhia tranquila OU extrovertido que respeita limites e cuida da coordenação social. Pareamento Baixo-Baixo aprecia vida doméstica pacífica.',
  'Needs time to process before discussing. Prefers writing or delayed conversations. May need space during conflicts. Values thoughtful resolution over quick fixes.',
  'Precisa de tempo para processar antes de discutir. Prefere escrever ou conversas atrasadas. Pode precisar de espaço durante conflitos. Valoriza resolução pensada sobre soluções rápidas.',
  ARRAY[
    'Clearly communicate need for alone time',
    'Don''t interpret extrovert partner''s energy as criticism',
    'Plan recharge time after social events',
    'Appreciate partner who handles social obligations',
    'Make effort to engage in activities partner enjoys',
    'Express affection in ways comfortable for you'
  ],
  ARRAY[
    'Comunique claramente necessidade de tempo sozinho',
    'Não interprete energia do parceiro extrovertido como crítica',
    'Planeje tempo de recarga após eventos sociais',
    'Aprecie parceiro que cuida de obrigações sociais',
    'Faça esforço para se envolver em atividades que parceiro aprecia',
    'Expresse afeto de maneiras confortáveis para você'
  ]
);

-- =========================================
-- AMABILIDADE (Agreeableness) - A
-- =========================================

-- Alta Amabilidade (60-100)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'A', 'high',
  'Warm, empathetic, cooperative. Prioritizes harmony and partner''s feelings. Diplomatic and tactful in discussions.',
  'Caloroso, empático, cooperativo. Prioriza harmonia e sentimentos do parceiro. Diplomático e tático em discussões.',
  ARRAY[
    'Highly empathetic and understanding',
    'Creates harmonious relationship environment',
    'Excellent at compromise and cooperation',
    'Supportive and encouraging partner',
    'Easy to get along with'
  ],
  ARRAY[
    'Altamente empático e compreensivo',
    'Cria ambiente de relacionamento harmonioso',
    'Excelente em compromisso e cooperação',
    'Parceiro apoiador e encorajador',
    'Fácil de conviver'
  ],
  ARRAY[
    'May avoid necessary conflicts',
    'Could suppress own needs for partner',
    'Might be taken advantage of',
    'May struggle to set boundaries',
    'Could enable partner''s bad behavior'
  ],
  ARRAY[
    'Pode evitar conflitos necessários',
    'Pode suprimir próprias necessidades pelo parceiro',
    'Pode ser aproveitado',
    'Pode ter dificuldade em estabelecer limites',
    'Pode permitir mau comportamento do parceiro'
  ],
  'Ideal partner: Someone who appreciates kindness and reciprocates care OR someone more assertive who protects your interests. High-High pairing is very harmonious. High-Low needs respect.',
  'Parceiro ideal: Alguém que aprecia bondade e retribui cuidado OU alguém mais assertivo que protege seus interesses. Pareamento Alto-Alto é muito harmonioso. Alto-Baixo precisa de respeito.',
  'Cooperative, seeks win-win solutions. May avoid confrontation too long. Focuses on partner''s feelings. Needs to work on assertiveness.',
  'Cooperativo, busca soluções ganha-ganha. Pode evitar confronto por muito tempo. Foca nos sentimentos do parceiro. Precisa trabalhar na assertividade.',
  ARRAY[
    'Learn to express needs even when uncomfortable',
    'Set healthy boundaries without guilt',
    'Don''t confuse kindness with being a doormat',
    'Address issues before resentment builds',
    'Value your own feelings as much as partner''s'
  ],
  ARRAY[
    'Aprenda a expressar necessidades mesmo quando desconfortável',
    'Estabeleça limites saudáveis sem culpa',
    'Não confunda bondade com ser capacho',
    'Aborde problemas antes que ressentimento se acumule',
    'Valorize seus próprios sentimentos tanto quanto os do parceiro'
  ]
);

-- Amabilidade Média (40-60)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'A', 'medium',
  'Balanced between compassionate and assertive. Can be cooperative but also stand ground when needed. Situationally empathetic.',
  'Equilibrado entre compassivo e assertivo. Pode ser cooperativo mas também firme quando necessário. Empatia situacional.',
  ARRAY[
    'Balances kindness with self-advocacy',
    'Can be supportive without losing self',
    'Knows when to compromise vs. stand firm',
    'Neither pushover nor overly critical',
    'Realistic about relationship dynamics'
  ],
  ARRAY[
    'Equilibra bondade com autodefesa',
    'Pode ser apoiador sem se perder',
    'Sabe quando comprometer vs. permanecer firme',
    'Nem capacho nem excessivamente crítico',
    'Realista sobre dinâmicas do relacionamento'
  ],
  ARRAY[
    'May struggle to be consistent in approach',
    'Could confuse partner with varying responses',
    'Might not fully satisfy highly agreeable partners',
    'May be seen as unpredictable in conflicts'
  ],
  ARRAY[
    'Pode ter dificuldade em ser consistente na abordagem',
    'Pode confundir parceiro com respostas variadas',
    'Pode não satisfazer totalmente parceiros muito amigáveis',
    'Pode ser visto como imprevisível em conflitos'
  ],
  'Ideal partner: Compatible with most types. Can soften disagreeable partners or ground overly agreeable ones. Your balance is strength.',
  'Parceiro ideal: Compatível com a maioria dos tipos. Pode suavizar parceiros difíceis ou ancorar parceiros muito amigáveis. Seu equilíbrio é força.',
  'Pragmatic, case-by-case approach. Can be accommodating or firm as situation requires. Seeks fair outcomes that consider both partners.',
  'Pragmático, abordagem caso a caso. Pode ser acomodatício ou firme conforme situação requer. Busca resultados justos que consideram ambos os parceiros.',
  ARRAY[
    'Trust your instincts about when to cooperate vs. assert',
    'Communicate reasoning behind different approaches',
    'Don''t second-guess your balanced perspective',
    'Help partner understand context matters in your responses',
    'Value both harmony and honesty'
  ],
  ARRAY[
    'Confie em seus instintos sobre quando cooperar vs. afirmar',
    'Comunique raciocínio por trás de diferentes abordagens',
    'Não questione sua perspectiva equilibrada',
    'Ajude parceiro a entender que contexto importa em suas respostas',
    'Valorize tanto harmonia quanto honestidade'
  ]
);

-- Baixa Amabilidade (0-40)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'A', 'low',
  'Direct, honest, straightforward. Values truth over tact. Not afraid of conflict. Focuses on logic over emotions in discussions.',
  'Direto, honesto, franco. Valoriza verdade sobre tato. Não tem medo de conflito. Foca em lógica sobre emoções em discussões.',
  ARRAY[
    'Brutally honest and authentic',
    'Doesn''t play games or manipulate',
    'Strong advocate for own needs',
    'Challenges partner to grow',
    'Clear about boundaries and expectations'
  ],
  ARRAY[
    'Brutalmente honesto e autêntico',
    'Não joga jogos ou manipula',
    'Defensor forte das próprias necessidades',
    'Desafia parceiro a crescer',
    'Claro sobre limites e expectativas'
  ],
  ARRAY[
    'May be too blunt or insensitive',
    'Could hurt partner''s feelings unintentionally',
    'Might prioritize being right over relationship harmony',
    'May be seen as cold or uncaring',
    'Could create unnecessary conflicts'
  ],
  ARRAY[
    'Pode ser muito direto ou insensível',
    'Pode ferir sentimentos do parceiro não intencionalmente',
    'Pode priorizar estar certo sobre harmonia do relacionamento',
    'Pode ser visto como frio ou indiferente',
    'Pode criar conflitos desnecessários'
  ],
  'Ideal partner: Someone who values honesty and can handle directness OR someone highly agreeable who softens your edges. Low-Low pairing needs empathy work. Low-High balances honesty with care.',
  'Parceiro ideal: Alguém que valoriza honestidade e pode lidar com franqueza OU alguém muito amigável que suaviza suas arestas. Pareamento Baixo-Baixo precisa trabalhar empatia. Baixo-Alto equilibra honestidade com cuidado.',
  'Direct confrontation, focuses on facts and solutions. May need to work on empathy and tact. Values getting to the point. Can be argumentative.',
  'Confronto direto, foca em fatos e soluções. Pode precisar trabalhar em empatia e tato. Valoriza ir direto ao ponto. Pode ser argumentativo.',
  ARRAY[
    'Practice delivering truth with kindness',
    'Consider partner''s feelings before speaking',
    'Honesty without empathy can be cruelty',
    'Not every battle needs to be fought',
    'Appreciate partner''s emotional sensitivity',
    'Work on softening delivery of criticism'
  ],
  ARRAY[
    'Pratique entregar verdade com bondade',
    'Considere sentimentos do parceiro antes de falar',
    'Honestidade sem empatia pode ser crueldade',
    'Nem toda batalha precisa ser lutada',
    'Aprecie sensibilidade emocional do parceiro',
    'Trabalhe em suavizar entrega de críticas'
  ]
);

-- =========================================
-- NEUROTICISMO (Neuroticism) - N
-- =========================================

-- Alto Neuroticismo (60-100)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'N', 'high',
  'Emotionally expressive, may be anxious or reactive. Communicates feelings intensely. Needs reassurance and emotional support.',
  'Emocionalmente expressivo, pode ser ansioso ou reativo. Comunica sentimentos intensamente. Precisa de reasseguração e suporte emocional.',
  ARRAY[
    'Deeply emotionally connected',
    'Highly attuned to partner''s feelings',
    'Passionate and intense bond',
    'Takes relationship very seriously',
    'Communicates emotions openly'
  ],
  ARRAY[
    'Profundamente conectado emocionalmente',
    'Altamente sintonizado com sentimentos do parceiro',
    'Vínculo apaixonado e intenso',
    'Leva relacionamento muito a sério',
    'Comunica emoções abertamente'
  ],
  ARRAY[
    'May be overly anxious about relationship',
    'Could create drama or conflicts unnecessarily',
    'Might need constant reassurance',
    'May be emotionally draining for partner',
    'Could catastrophize minor issues'
  ],
  ARRAY[
    'Pode ser excessivamente ansioso sobre relacionamento',
    'Pode criar drama ou conflitos desnecessariamente',
    'Pode precisar de reasseguração constante',
    'Pode ser emocionalmente esgotante para parceiro',
    'Pode catastrofizar problemas menores'
  ],
  'Ideal partner: Someone emotionally stable who provides grounding and reassurance. High-High pairing can be volatile. High-Low works well with patient, stable partner.',
  'Parceiro ideal: Alguém emocionalmente estável que fornece ancoragem e reasseguração. Pareamento Alto-Alto pode ser volátil. Alto-Baixo funciona bem com parceiro paciente e estável.',
  'Emotionally reactive, may escalate conflicts. Needs to calm down before productive discussion. Benefits from partner''s patience. Should work on emotional regulation.',
  'Emocionalmente reativo, pode escalar conflitos. Precisa se acalmar antes de discussão produtiva. Beneficia-se da paciência do parceiro. Deve trabalhar na regulação emocional.',
  ARRAY[
    'Develop emotional regulation skills (therapy, mindfulness)',
    'Don''t let anxiety sabotage good relationship',
    'Communicate needs without being demanding',
    'Appreciate partner''s stability',
    'Work on self-soothing rather than seeking constant reassurance',
    'Challenge catastrophic thinking patterns'
  ],
  ARRAY[
    'Desenvolva habilidades de regulação emocional (terapia, mindfulness)',
    'Não deixe ansiedade sabotar bom relacionamento',
    'Comunique necessidades sem ser exigente',
    'Aprecie estabilidade do parceiro',
    'Trabalhe em auto-acalmar em vez de buscar reasseguração constante',
    'Desafie padrões de pensamento catastrófico'
  ]
);

-- Neuroticismo Médio (40-60)
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'N', 'medium',
  'Emotionally balanced, experiences normal range of emotions. Can be stressed but recovers reasonably. Neither overly anxious nor completely unflappable.',
  'Emocionalmente equilibrado, experimenta faixa normal de emoções. Pode ficar estressado mas se recupera razoavelmente. Nem excessivamente ansioso nem completamente imperturbável.',
  ARRAY[
    'Emotionally stable in most situations',
    'Can handle relationship stress reasonably',
    'Empathetic to partner''s emotional state',
    'Recovers from conflicts relatively quickly',
    'Neither too intense nor too detached'
  ],
  ARRAY[
    'Emocionalmente estável na maioria das situações',
    'Pode lidar com estresse do relacionamento razoavelmente',
    'Empático ao estado emocional do parceiro',
    'Recupera-se de conflitos relativamente rápido',
    'Nem muito intenso nem muito desapegado'
  ],
  ARRAY[
    'May struggle with highly emotional partner',
    'Could be overwhelmed in very stressful periods',
    'Might not fully understand extreme anxiety or calmness',
    'May have occasional emotional reactivity'
  ],
  ARRAY[
    'Pode ter dificuldade com parceiro altamente emocional',
    'Pode ser sobrecarregado em períodos muito estressantes',
    'Pode não entender completamente ansiedade extrema ou calma',
    'Pode ter reatividade emocional ocasional'
  ],
  'Ideal partner: Compatible with most types. Can provide stability to anxious partners or emotional depth to very stable ones.',
  'Parceiro ideal: Compatível com a maioria dos tipos. Pode fornecer estabilidade para parceiros ansiosos ou profundidade emocional para muito estáveis.',
  'Generally calm but can become emotional under stress. Takes breaks when needed. Seeks rational solutions while acknowledging feelings.',
  'Geralmente calmo mas pode ficar emocional sob estresse. Faz pausas quando necessário. Busca soluções racionais enquanto reconhece sentimentos.',
  ARRAY[
    'Recognize when stress is building',
    'Use healthy coping mechanisms',
    'Communicate emotional state to partner',
    'Don''t judge self for normal emotional responses',
    'Support partner through their emotional experiences'
  ],
  ARRAY[
    'Reconheça quando estresse está aumentando',
    'Use mecanismos saudáveis de enfrentamento',
    'Comunique estado emocional ao parceiro',
    'Não se julgue por respostas emocionais normais',
    'Apoie parceiro através de suas experiências emocionais'
  ]
);

-- Baixo Neuroticismo (0-40) - Alta Estabilidade Emocional
INSERT INTO bigfive_compatibility_insights (
  dimension_code, score_range,
  communication_style, communication_style_pt,
  relationship_strengths, relationship_strengths_pt,
  relationship_challenges, relationship_challenges_pt,
  ideal_partner_traits, ideal_partner_traits_pt,
  conflict_resolution, conflict_resolution_pt,
  relationship_tips, relationship_tips_pt
) VALUES (
  'N', 'low',
  'Calm, even-tempered, emotionally stable. Doesn''t overreact to stress. Communicates rationally even in difficult situations.',
  'Calmo, equilibrado, emocionalmente estável. Não reage excessivamente ao estresse. Comunica racionalmente mesmo em situações difíceis.',
  ARRAY[
    'Provides emotional stability and grounding',
    'Stays calm during relationship challenges',
    'Doesn''t create unnecessary drama',
    'Resilient and adaptable',
    'Creates peaceful relationship environment'
  ],
  ARRAY[
    'Fornece estabilidade emocional e ancoragem',
    'Permanece calmo durante desafios do relacionamento',
    'Não cria drama desnecessário',
    'Resiliente e adaptável',
    'Cria ambiente de relacionamento pacífico'
  ],
  ARRAY[
    'May seem emotionally detached or cold',
    'Could underestimate partner''s emotional needs',
    'Might not provide enough emotional validation',
    'May dismiss partner''s anxiety as irrational',
    'Could come across as uncaring'
  ],
  ARRAY[
    'Pode parecer emocionalmente desapegado ou frio',
    'Pode subestimar necessidades emocionais do parceiro',
    'Pode não fornecer validação emocional suficiente',
    'Pode descartar ansiedade do parceiro como irracional',
    'Pode parecer indiferente'
  ],
  'Ideal partner: Anyone benefits from your stability. Especially valuable for anxious partners who need grounding. Low-Low pairing is very peaceful.',
  'Parceiro ideal: Qualquer um se beneficia de sua estabilidade. Especialmente valioso para parceiros ansiosos que precisam de ancoragem. Pareamento Baixo-Baixo é muito pacífico.',
  'Calm, rational, solution-focused. Doesn''t let emotions derail problem-solving. May need to work on validating partner''s feelings before jumping to solutions.',
  'Calmo, racional, focado em soluções. Não deixa emoções descarrilarem resolução de problemas. Pode precisar trabalhar em validar sentimentos do parceiro antes de pular para soluções.',
  ARRAY[
    'Validate partner''s emotions even if they seem irrational',
    'Don''t dismiss anxiety as weakness',
    'Show more emotional expression and vulnerability',
    'Appreciate your stability as strength',
    'Partner may need emotional support, not just solutions',
    'Balance logic with empathy'
  ],
  ARRAY[
    'Valide emoções do parceiro mesmo que pareçam irracionais',
    'Não descarte ansiedade como fraqueza',
    'Mostre mais expressão emocional e vulnerabilidade',
    'Aprecie sua estabilidade como força',
    'Parceiro pode precisar de suporte emocional, não apenas soluções',
    'Equilibre lógica com empatia'
  ]
);

-- Índice para melhorar consultas por dimensão e range
CREATE INDEX IF NOT EXISTS idx_compatibility_dimension_range
ON bigfive_compatibility_insights(dimension_code, score_range);

-- Verificar quantos registros foram inseridos
DO $$
DECLARE
  record_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO record_count FROM bigfive_compatibility_insights;
  RAISE NOTICE 'Total de insights de compatibilidade inseridos: %', record_count;

  IF record_count = 15 THEN
    RAISE NOTICE '✅ Seed completo: 5 dimensões × 3 faixas = 15 registros';
  ELSE
    RAISE WARNING '⚠️ Esperado 15 registros, encontrado: %', record_count;
  END IF;
END $$;
