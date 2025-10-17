export interface JournalPrompt {
  id: string;
  text: string;
  category: string;
  mbtiTypes?: string[]; // Se vazio, é para todos os tipos
}

export const JOURNAL_PROMPTS: JournalPrompt[] = [
  // Prompts Universais (todos os tipos)
  {
    id: 'universal-001',
    text: 'O que você aprendeu sobre si mesmo hoje?',
    category: 'autoconhecimento',
  },
  {
    id: 'universal-002',
    text: 'Descreva um momento em que você se sentiu mais você hoje.',
    category: 'autenticidade',
  },
  {
    id: 'universal-003',
    text: 'Qual decisão importante você está enfrentando? Quais são as opções?',
    category: 'decisões',
  },
  {
    id: 'universal-004',
    text: 'O que te trouxe alegria ou satisfação hoje?',
    category: 'gratidão',
  },
  {
    id: 'universal-005',
    text: 'Que desafio você enfrentou hoje e como lidou com ele?',
    category: 'crescimento',
  },

  // Prompts para Intuitivos (N)
  {
    id: 'intuitive-001',
    text: 'Que padrões ou conexões você notou recentemente?',
    category: 'insights',
    mbtiTypes: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP'],
  },
  {
    id: 'intuitive-002',
    text: 'Como você imagina sua vida daqui a 5 anos? O que precisa fazer para chegar lá?',
    category: 'visão',
    mbtiTypes: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP'],
  },
  {
    id: 'intuitive-003',
    text: 'Que possibilidades você vê em uma situação atual que outros podem não ver?',
    category: 'possibilidades',
    mbtiTypes: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP'],
  },

  // Prompts para Sensores (S)
  {
    id: 'sensor-001',
    text: 'Descreva em detalhes um momento presente que você viveu hoje.',
    category: 'presença',
    mbtiTypes: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'],
  },
  {
    id: 'sensor-002',
    text: 'Que habilidade prática você usou ou gostaria de desenvolver?',
    category: 'prática',
    mbtiTypes: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'],
  },
  {
    id: 'sensor-003',
    text: 'Que experiência sensorial (visão, som, toque, paladar, olfato) marcou seu dia?',
    category: 'experiência',
    mbtiTypes: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'],
  },

  // Prompts para Pensadores (T)
  {
    id: 'thinker-001',
    text: 'Que problema complexo você resolveu ou está trabalhando para resolver?',
    category: 'resolução',
    mbtiTypes: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'ISTJ', 'ISTP', 'ESTJ', 'ESTP'],
  },
  {
    id: 'thinker-002',
    text: 'Analise uma decisão recente: foi lógica? Quais foram os prós e contras?',
    category: 'análise',
    mbtiTypes: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'ISTJ', 'ISTP', 'ESTJ', 'ESTP'],
  },
  {
    id: 'thinker-003',
    text: 'Como você pode otimizar ou melhorar um sistema/processo em sua vida?',
    category: 'otimização',
    mbtiTypes: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'ISTJ', 'ISTP', 'ESTJ', 'ESTP'],
  },

  // Prompts para Sentimentais (F)
  {
    id: 'feeler-001',
    text: 'Como você se sentiu emocionalmente hoje? O que causou esses sentimentos?',
    category: 'emoções',
    mbtiTypes: ['INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISFJ', 'ISFP', 'ESFJ', 'ESFP'],
  },
  {
    id: 'feeler-002',
    text: 'Que relacionamento em sua vida precisa de atenção? Como pode fortalecê-lo?',
    category: 'relacionamentos',
    mbtiTypes: ['INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISFJ', 'ISFP', 'ESFJ', 'ESFP'],
  },
  {
    id: 'feeler-003',
    text: 'Que valor pessoal você expressou através de suas ações hoje?',
    category: 'valores',
    mbtiTypes: ['INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISFJ', 'ISFP', 'ESFJ', 'ESFP'],
  },

  // Prompts específicos por tipo
  {
    id: 'intj-001',
    text: 'Que visão de longo prazo você está desenvolvendo? Quais são os próximos passos práticos?',
    category: 'estratégia',
    mbtiTypes: ['INTJ'],
  },
  {
    id: 'infj-001',
    text: 'Como você equilibrou suas necessidades pessoais com as necessidades dos outros hoje?',
    category: 'equilíbrio',
    mbtiTypes: ['INFJ'],
  },
  {
    id: 'enfp-001',
    text: 'Que nova ideia ou possibilidade te entusiasmou hoje? Como pode explorá-la?',
    category: 'entusiasmo',
    mbtiTypes: ['ENFP'],
  },
  {
    id: 'istj-001',
    text: 'Que responsabilidade você cumpriu com excelência hoje? Como se sente sobre isso?',
    category: 'dever',
    mbtiTypes: ['ISTJ'],
  },
];

/**
 * Seleciona um prompt diário baseado no tipo MBTI do usuário
 */
export function selectDailyPrompt(mbtiType: string): JournalPrompt {
  const today = new Date();
  const dayIndex = today.getDate() % JOURNAL_PROMPTS.length;

  // Filtrar prompts adequados para o tipo MBTI
  const suitablePrompts = JOURNAL_PROMPTS.filter(
    (prompt) => !prompt.mbtiTypes || prompt.mbtiTypes.includes(mbtiType),
  );

  // Retornar prompt baseado no dia (rotação circular)
  return suitablePrompts[dayIndex % suitablePrompts.length];
}
