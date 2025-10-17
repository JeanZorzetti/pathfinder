import { ChallengeTemplate } from '../dto/challenge-template.dto';

export const CHALLENGE_TEMPLATES: ChallengeTemplate[] = [
  // Desafios de Crescimento (Growth)
  {
    id: 'growth-001',
    title: 'Aprenda Algo Novo',
    description: 'Dedique 30 minutos por dia para aprender algo novo relacionado ao seu desenvolvimento pessoal ou profissional.',
    emoji: '📚',
    xpReward: 50,
    mbtiTypes: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP'],
    category: 'growth',
    difficulty: 'medium',
  },
  {
    id: 'growth-002',
    title: 'Reflexão Diária',
    description: 'Escreva em seu diário sobre uma lição aprendida ou momento de crescimento do dia.',
    emoji: '✍️',
    xpReward: 50,
    mbtiTypes: ['INFP', 'INFJ', 'ISFP', 'ISFJ', 'INTP', 'INTJ'],
    category: 'growth',
    difficulty: 'easy',
  },
  {
    id: 'growth-003',
    title: 'Zona de Conforto',
    description: 'Faça algo que te deixe levemente desconfortável, mas que contribua para seu crescimento.',
    emoji: '🎯',
    xpReward: 50,
    mbtiTypes: ['ISFJ', 'ISFP', 'ISTJ', 'ISTP', 'INFP'],
    category: 'growth',
    difficulty: 'hard',
  },
  {
    id: 'growth-004',
    title: 'Feedback Construtivo',
    description: 'Peça feedback genuíno a alguém sobre uma área que você quer melhorar.',
    emoji: '💬',
    xpReward: 50,
    mbtiTypes: ['ESTJ', 'ENTJ', 'ISTJ', 'INTJ', 'ESTP', 'ENTP'],
    category: 'growth',
    difficulty: 'medium',
  },

  // Desafios de Produtividade (Productivity)
  {
    id: 'prod-001',
    title: 'Pomodoro Power',
    description: 'Use a técnica Pomodoro (25min foco + 5min pausa) para completar tarefas importantes.',
    emoji: '⏰',
    xpReward: 50,
    mbtiTypes: ['INTJ', 'ENTJ', 'ISTJ', 'ESTJ', 'INTP', 'ENTP'],
    category: 'productivity',
    difficulty: 'medium',
  },
  {
    id: 'prod-002',
    title: 'Top 3 do Dia',
    description: 'Identifique e complete as 3 tarefas mais importantes do dia antes das 12h.',
    emoji: '🎯',
    xpReward: 50,
    mbtiTypes: ['ESTJ', 'ENTJ', 'ISTJ', 'INTJ', 'ESTP', 'ISTP'],
    category: 'productivity',
    difficulty: 'medium',
  },
  {
    id: 'prod-003',
    title: 'Zero Distrações',
    description: 'Trabalhe por 1 hora com todas as notificações desativadas e foco total.',
    emoji: '🔕',
    xpReward: 50,
    mbtiTypes: ['INTJ', 'INTP', 'ISTJ', 'ISTP', 'INFJ', 'INFP'],
    category: 'productivity',
    difficulty: 'easy',
  },
  {
    id: 'prod-004',
    title: 'Organize Seu Espaço',
    description: 'Dedique tempo para organizar e limpar seu espaço de trabalho ou estudo.',
    emoji: '🧹',
    xpReward: 50,
    mbtiTypes: ['ISTJ', 'ESTJ', 'ISFJ', 'ESFJ', 'INTJ'],
    category: 'productivity',
    difficulty: 'easy',
  },
  {
    id: 'prod-005',
    title: 'Batching de Tarefas',
    description: 'Agrupe tarefas similares e execute-as em bloco para ganhar eficiência.',
    emoji: '📦',
    xpReward: 50,
    mbtiTypes: ['ENTJ', 'INTJ', 'ESTJ', 'ISTJ', 'ENTP'],
    category: 'productivity',
    difficulty: 'medium',
  },

  // Desafios Sociais (Social)
  {
    id: 'social-001',
    title: 'Reconexão',
    description: 'Entre em contato com alguém que você não fala há tempos e tenha uma conversa genuína.',
    emoji: '💌',
    xpReward: 50,
    mbtiTypes: ['ENFJ', 'ESFJ', 'ENFP', 'ESFP', 'INFJ', 'ISFJ'],
    category: 'social',
    difficulty: 'medium',
  },
  {
    id: 'social-002',
    title: 'Elogio Genuíno',
    description: 'Dê um elogio autêntico e específico para alguém todos os dias.',
    emoji: '⭐',
    xpReward: 50,
    mbtiTypes: ['ENFJ', 'ESFJ', 'ENFP', 'ESFP', 'INFJ', 'ISFJ'],
    category: 'social',
    difficulty: 'easy',
  },
  {
    id: 'social-003',
    title: 'Escuta Ativa',
    description: 'Pratique escuta ativa: ouça sem interromper, faça perguntas e demonstre interesse genuíno.',
    emoji: '👂',
    xpReward: 50,
    mbtiTypes: ['INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISFJ', 'ESFJ'],
    category: 'social',
    difficulty: 'medium',
  },
  {
    id: 'social-004',
    title: 'Networking Intencional',
    description: 'Converse com alguém novo do seu campo de interesse ou profissão.',
    emoji: '🤝',
    xpReward: 50,
    mbtiTypes: ['ENTJ', 'ENTP', 'ENFJ', 'ENFP', 'ESTJ', 'ESTP'],
    category: 'social',
    difficulty: 'hard',
  },
  {
    id: 'social-005',
    title: 'Vulnerabilidade Autêntica',
    description: 'Compartilhe algo genuíno sobre você com alguém de confiança.',
    emoji: '💝',
    xpReward: 50,
    mbtiTypes: ['INFP', 'INFJ', 'ENFP', 'ENFJ', 'ISFP', 'ISFJ'],
    category: 'social',
    difficulty: 'hard',
  },

  // Desafios de Bem-Estar (Wellness)
  {
    id: 'wellness-001',
    title: 'Movimento Consciente',
    description: 'Faça 30 minutos de exercício físico ou movimento consciente (yoga, caminhada, etc).',
    emoji: '🧘',
    xpReward: 50,
    mbtiTypes: ['ISFP', 'ESFP', 'ISTP', 'ESTP', 'ENFP', 'ESFJ'],
    category: 'wellness',
    difficulty: 'medium',
  },
  {
    id: 'wellness-002',
    title: 'Hidratação Consciente',
    description: 'Beba pelo menos 2 litros de água ao longo do dia.',
    emoji: '💧',
    xpReward: 50,
    mbtiTypes: ['ISTJ', 'ESTJ', 'ISFJ', 'ESFJ', 'INTJ', 'ENTJ'],
    category: 'wellness',
    difficulty: 'easy',
  },
  {
    id: 'wellness-003',
    title: 'Meditação Matinal',
    description: 'Comece o dia com 10 minutos de meditação ou mindfulness.',
    emoji: '🧘‍♀️',
    xpReward: 50,
    mbtiTypes: ['INFJ', 'INFP', 'INTJ', 'INTP', 'ISFJ', 'ISFP'],
    category: 'wellness',
    difficulty: 'medium',
  },
  {
    id: 'wellness-004',
    title: 'Sono Reparador',
    description: 'Vá dormir e acorde no mesmo horário, garantindo 7-8h de sono.',
    emoji: '😴',
    xpReward: 50,
    mbtiTypes: ['ISTJ', 'ISFJ', 'INTJ', 'INFJ', 'ESTJ', 'ESFJ'],
    category: 'wellness',
    difficulty: 'medium',
  },
  {
    id: 'wellness-005',
    title: 'Natureza Diária',
    description: 'Passe pelo menos 15 minutos ao ar livre, conectando-se com a natureza.',
    emoji: '🌳',
    xpReward: 50,
    mbtiTypes: ['ISFP', 'INFP', 'ENFP', 'ESFP', 'ISTP', 'ESTP'],
    category: 'wellness',
    difficulty: 'easy',
  },
  {
    id: 'wellness-006',
    title: 'Alimentação Consciente',
    description: 'Faça pelo menos uma refeição sem telas, prestando atenção no que come.',
    emoji: '🍽️',
    xpReward: 50,
    mbtiTypes: ['ISFJ', 'ESFJ', 'ISTJ', 'ESTJ', 'INFJ', 'ENFJ'],
    category: 'wellness',
    difficulty: 'easy',
  },

  // Desafios de Criatividade (Creativity)
  {
    id: 'creative-001',
    title: 'Brainstorm Livre',
    description: 'Dedique 20 minutos para brainstorming livre sobre um projeto ou ideia sem julgamentos.',
    emoji: '💡',
    xpReward: 50,
    mbtiTypes: ['ENFP', 'ENTP', 'INFP', 'INTP', 'ENFJ', 'INTJ'],
    category: 'creativity',
    difficulty: 'medium',
  },
  {
    id: 'creative-002',
    title: 'Expressão Artística',
    description: 'Crie algo com as mãos: desenhe, escreva, toque um instrumento, ou qualquer expressão artística.',
    emoji: '🎨',
    xpReward: 50,
    mbtiTypes: ['ISFP', 'INFP', 'ENFP', 'ESFP', 'INTP', 'ENTP'],
    category: 'creativity',
    difficulty: 'medium',
  },
  {
    id: 'creative-003',
    title: 'Perspectiva Diferente',
    description: 'Resolva um problema olhando de um ângulo completamente diferente ou oposto ao usual.',
    emoji: '🔄',
    xpReward: 50,
    mbtiTypes: ['INTP', 'ENTP', 'INTJ', 'ENTJ', 'INFP', 'ENFP'],
    category: 'creativity',
    difficulty: 'hard',
  },
  {
    id: 'creative-004',
    title: 'Inspiração Externa',
    description: 'Consuma conteúdo inspirador fora da sua área (arte, música, literatura, ciência).',
    emoji: '✨',
    xpReward: 50,
    mbtiTypes: ['ENFP', 'INFP', 'ENTP', 'INTP', 'ENFJ', 'INFJ'],
    category: 'creativity',
    difficulty: 'easy',
  },
  {
    id: 'creative-005',
    title: 'Conexões Inusitadas',
    description: 'Encontre e documente conexões entre conceitos aparentemente não relacionados.',
    emoji: '🔗',
    xpReward: 50,
    mbtiTypes: ['INTP', 'ENTP', 'INTJ', 'ENTJ', 'INFJ', 'ENFP'],
    category: 'creativity',
    difficulty: 'hard',
  },

  // Desafios Específicos por Tipo
  {
    id: 'intj-001',
    title: 'Pausa Estratégica',
    description: 'Tire uma pausa intencional de 15min para evitar burnout e recarregar.',
    emoji: '⚡',
    xpReward: 50,
    mbtiTypes: ['INTJ', 'ENTJ', 'ISTJ', 'ESTJ'],
    category: 'wellness',
    difficulty: 'hard',
  },
  {
    id: 'enfp-001',
    title: 'Complete Uma Tarefa',
    description: 'Escolha um projeto iniciado e complete-o do início ao fim, sem começar algo novo.',
    emoji: '✅',
    xpReward: 50,
    mbtiTypes: ['ENFP', 'ENTP', 'INFP', 'INTP'],
    category: 'productivity',
    difficulty: 'hard',
  },
  {
    id: 'istj-001',
    title: 'Experimentação Criativa',
    description: 'Tente resolver um problema de forma não convencional ou criativa.',
    emoji: '🎭',
    xpReward: 50,
    mbtiTypes: ['ISTJ', 'ESTJ', 'ISFJ', 'ESFJ'],
    category: 'creativity',
    difficulty: 'hard',
  },
  {
    id: 'infp-001',
    title: 'Ação Prática',
    description: 'Transforme uma ideia ou valor importante em ação concreta hoje.',
    emoji: '🎬',
    xpReward: 50,
    mbtiTypes: ['INFP', 'INFJ', 'ENFP', 'ENFJ'],
    category: 'productivity',
    difficulty: 'medium',
  },
  {
    id: 'estp-001',
    title: 'Planejamento Estratégico',
    description: 'Dedique tempo para planejar a próxima semana com clareza e detalhes.',
    emoji: '📋',
    xpReward: 50,
    mbtiTypes: ['ESTP', 'ESFP', 'ISTP', 'ISFP'],
    category: 'productivity',
    difficulty: 'hard',
  },

  // Desafios Universais
  {
    id: 'universal-001',
    title: 'Gratidão Diária',
    description: 'Liste 3 coisas pelas quais você é grato hoje.',
    emoji: '🙏',
    xpReward: 50,
    mbtiTypes: ['INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISFJ', 'ESFJ', 'ISFP', 'ESFP'],
    category: 'wellness',
    difficulty: 'easy',
  },
  {
    id: 'universal-002',
    title: 'Limite de Telas',
    description: 'Passe 1 hora antes de dormir sem usar telas (celular, computador, TV).',
    emoji: '📵',
    xpReward: 50,
    mbtiTypes: ['INTJ', 'INTP', 'INFJ', 'INFP', 'ISTJ', 'ISTP', 'ISFJ', 'ISFP'],
    category: 'wellness',
    difficulty: 'medium',
  },
  {
    id: 'universal-003',
    title: 'Aprenda com os Erros',
    description: 'Reflita sobre um erro recente e extraia uma lição prática dele.',
    emoji: '📖',
    xpReward: 50,
    mbtiTypes: ['INTJ', 'ENTJ', 'INTP', 'ENTP', 'INFJ', 'ENFJ', 'ISTJ', 'ESTJ'],
    category: 'growth',
    difficulty: 'medium',
  },
  {
    id: 'universal-004',
    title: 'Ato de Gentileza',
    description: 'Faça algo gentil por alguém sem esperar nada em troca.',
    emoji: '💚',
    xpReward: 50,
    mbtiTypes: ['ENFJ', 'ESFJ', 'INFJ', 'ISFJ', 'ENFP', 'ESFP', 'INFP', 'ISFP'],
    category: 'social',
    difficulty: 'easy',
  },
  {
    id: 'universal-005',
    title: 'Momento Presente',
    description: 'Pratique estar totalmente presente em uma atividade, sem multitasking.',
    emoji: '🎯',
    xpReward: 50,
    mbtiTypes: ['INFJ', 'INFP', 'ISFJ', 'ISFP', 'INTJ', 'INTP', 'ISTJ', 'ISTP'],
    category: 'wellness',
    difficulty: 'medium',
  },
];

/**
 * Seleciona um desafio adequado para o tipo MBTI do usuário
 * @param mbtiType Tipo MBTI do usuário
 * @param completedChallengeIds IDs dos desafios já completados
 * @returns Template de desafio selecionado
 */
export function selectChallengeForUser(
  mbtiType: string,
  completedChallengeIds: string[] = [],
): ChallengeTemplate | null {
  // Filtrar desafios não completados
  const availableChallenges = CHALLENGE_TEMPLATES.filter(
    (challenge) => !completedChallengeIds.includes(challenge.id),
  );

  if (availableChallenges.length === 0) {
    return null; // Usuário completou todos os desafios
  }

  // Filtrar desafios adequados para o tipo MBTI
  const suitableChallenges = availableChallenges.filter((challenge) =>
    challenge.mbtiTypes.includes(mbtiType),
  );

  // Se não há desafios específicos, usar qualquer desafio disponível
  const challengePool =
    suitableChallenges.length > 0 ? suitableChallenges : availableChallenges;

  // Selecionar aleatoriamente
  const randomIndex = Math.floor(Math.random() * challengePool.length);
  return challengePool[randomIndex];
}
