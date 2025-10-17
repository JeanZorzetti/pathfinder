/**
 * Journal Prompts Database - Prompts para Diário
 *
 * Sprint 3: Desafio Semanal + Diário Inteligente
 *
 * 30 prompts personalizados por tipo MBTI
 */

export interface JournalPrompt {
  id: string;
  mbtiType: string;
  prompt: string;
  category: 'reflection' | 'growth' | 'emotions' | 'relationships' | 'goals';
}

/**
 * Prompts por Tipo MBTI
 * Cada prompt foca em áreas de desenvolvimento específicas do tipo
 */
export const JOURNAL_PROMPTS: Record<string, JournalPrompt[]> = {
  // INTJ
  INTJ: [
    {
      id: 'intj-emotion-1',
      mbtiType: 'INTJ',
      prompt: 'Qual emoção você sentiu mais forte hoje? Como ela influenciou suas decisões?',
      category: 'emotions',
    },
    {
      id: 'intj-connection-1',
      mbtiType: 'INTJ',
      prompt: 'Você se conectou emocionalmente com alguém hoje? Como foi essa experiência?',
      category: 'relationships',
    },
    {
      id: 'intj-vulnerability-1',
      mbtiType: 'INTJ',
      prompt: 'Em que momento hoje você poderia ter sido mais vulnerável? O que te impediu?',
      category: 'growth',
    },
  ],

  // INFP
  INFP: [
    {
      id: 'infp-boundaries-1',
      mbtiType: 'INFP',
      prompt: 'Você disse "sim" a algo que queria dizer "não" hoje? Como se sentiu?',
      category: 'reflection',
    },
    {
      id: 'infp-self-priority-1',
      mbtiType: 'INFP',
      prompt: 'Você priorizou suas necessidades ou as dos outros hoje? Por quê?',
      category: 'growth',
    },
    {
      id: 'infp-practical-1',
      mbtiType: 'INFP',
      prompt: 'Qual tarefa prática você completou hoje? Como se sentiu ao finalizá-la?',
      category: 'goals',
    },
  ],

  // ESTJ
  ESTJ: [
    {
      id: 'estj-flexibility-1',
      mbtiType: 'ESTJ',
      prompt: 'Como você reagiu quando seus planos mudaram hoje? Você se adaptou ou resistiu?',
      category: 'reflection',
    },
    {
      id: 'estj-listening-1',
      mbtiType: 'ESTJ',
      prompt: 'Você realmente ouviu alguém hoje, ou já estava planejando sua resposta?',
      category: 'relationships',
    },
    {
      id: 'estj-delegation-1',
      mbtiType: 'ESTJ',
      prompt: 'Você delegou alguma tarefa hoje, ou tentou fazer tudo sozinho? Por quê?',
      category: 'growth',
    },
  ],

  // ENFP
  ENFP: [
    {
      id: 'enfp-completion-1',
      mbtiType: 'ENFP',
      prompt: 'Você finalizou algo que começou, ou pulou para uma nova ideia? Como se sente sobre isso?',
      category: 'reflection',
    },
    {
      id: 'enfp-focus-1',
      mbtiType: 'ENFP',
      prompt: 'Quantas vezes você se distraiu hoje? O que te ajudaria a manter foco?',
      category: 'growth',
    },
    {
      id: 'enfp-routine-1',
      mbtiType: 'ENFP',
      prompt: 'Você seguiu alguma rotina hoje? Como rotinas poderiam te ajudar?',
      category: 'goals',
    },
  ],

  // INTP
  INTP: [
    {
      id: 'intp-communication-1',
      mbtiType: 'INTP',
      prompt: 'Você explicou uma ideia para alguém hoje? A pessoa entendeu? Como você poderia ter sido mais claro?',
      category: 'reflection',
    },
    {
      id: 'intp-action-1',
      mbtiType: 'INTP',
      prompt: 'Você passou mais tempo pensando ou agindo hoje? Qual ação você poderia ter tomado?',
      category: 'growth',
    },
  ],

  // ENTJ
  ENTJ: [
    {
      id: 'entj-patience-1',
      mbtiType: 'ENTJ',
      prompt: 'Você foi impaciente com alguém hoje? Como você poderia ter reagido diferente?',
      category: 'reflection',
    },
    {
      id: 'entj-empathy-1',
      mbtiType: 'ENTJ',
      prompt: 'Você considerou os sentimentos de alguém antes de tomar uma decisão hoje?',
      category: 'relationships',
    },
  ],

  // ENTP
  ENTP: [
    {
      id: 'entp-commitment-1',
      mbtiType: 'ENTP',
      prompt: 'Você cumpriu todos os compromissos que fez hoje? Se não, por quê?',
      category: 'reflection',
    },
    {
      id: 'entp-follow-through-1',
      mbtiType: 'ENTP',
      prompt: 'Você iniciou algo novo ou finalizou algo antigo hoje? O que importa mais agora?',
      category: 'goals',
    },
  ],

  // INFJ
  INFJ: [
    {
      id: 'infj-self-care-1',
      mbtiType: 'INFJ',
      prompt: 'Você dedicou tempo para você hoje, ou passou o dia cuidando dos outros?',
      category: 'reflection',
    },
    {
      id: 'infj-boundaries-1',
      mbtiType: 'INFJ',
      prompt: 'Você absorveu as emoções de alguém hoje? Como isso te afetou?',
      category: 'emotions',
    },
  ],

  // ENFJ
  ENFJ: [
    {
      id: 'enfj-limits-1',
      mbtiType: 'ENFJ',
      prompt: 'Você se esgotou ajudando outros hoje? Onde você poderia ter estabelecido um limite?',
      category: 'reflection',
    },
    {
      id: 'enfj-self-priority-1',
      mbtiType: 'ENFJ',
      prompt: 'Você priorizou suas necessidades ou sacrificou-as pelos outros? Como se sente sobre isso?',
      category: 'growth',
    },
  ],

  // ISTJ
  ISTJ: [
    {
      id: 'istj-flexibility-1',
      mbtiType: 'ISTJ',
      prompt: 'Você tentou algo diferente da sua rotina hoje? Como foi essa experiência?',
      category: 'reflection',
    },
    {
      id: 'istj-change-1',
      mbtiType: 'ISTJ',
      prompt: 'Uma mudança inesperada aconteceu hoje? Como você lidou com ela?',
      category: 'growth',
    },
  ],

  // ISFJ
  ISFJ: [
    {
      id: 'isfj-voice-1',
      mbtiType: 'ISFJ',
      prompt: 'Você expressou sua opinião genuína hoje, ou concordou para evitar conflito?',
      category: 'reflection',
    },
    {
      id: 'isfj-needs-1',
      mbtiType: 'ISFJ',
      prompt: 'Você comunicou suas necessidades para alguém hoje? O que aconteceu?',
      category: 'relationships',
    },
  ],

  // ESFJ
  ESFJ: [
    {
      id: 'esfj-criticism-1',
      mbtiType: 'ESFJ',
      prompt: 'Alguém te criticou hoje? Você levou para o pessoal ou viu como oportunidade de crescimento?',
      category: 'reflection',
    },
    {
      id: 'esfj-self-care-1',
      mbtiType: 'ESFJ',
      prompt: 'Você cuidou de você hoje, ou apenas dos outros? Como você está se sentindo?',
      category: 'emotions',
    },
  ],

  // ISTP
  ISTP: [
    {
      id: 'istp-planning-1',
      mbtiType: 'ISTP',
      prompt: 'Você planejou algo para o futuro hoje, ou apenas reagiu ao presente?',
      category: 'reflection',
    },
    {
      id: 'istp-emotions-1',
      mbtiType: 'ISTP',
      prompt: 'Você expressou uma emoção hoje? Como foi?',
      category: 'emotions',
    },
  ],

  // ISFP
  ISFP: [
    {
      id: 'isfp-assertion-1',
      mbtiType: 'ISFP',
      prompt: 'Você defendeu suas necessidades hoje, ou evitou conflito? Por quê?',
      category: 'reflection',
    },
    {
      id: 'isfp-voice-1',
      mbtiType: 'ISFP',
      prompt: 'Você expressou o que realmente pensa e sente hoje? O que te impediu ou encorajou?',
      category: 'growth',
    },
  ],

  // ESTP
  ESTP: [
    {
      id: 'estp-reflection-1',
      mbtiType: 'ESTP',
      prompt: 'Você pausou para pensar antes de agir hoje? Qual foi o resultado?',
      category: 'reflection',
    },
    {
      id: 'estp-consequences-1',
      mbtiType: 'ESTP',
      prompt: 'Você considerou as consequências de longo prazo de suas ações hoje?',
      category: 'growth',
    },
  ],

  // ESFP
  ESFP: [
    {
      id: 'esfp-organization-1',
      mbtiType: 'ESFP',
      prompt: 'Você organizou algo hoje? Como isso te fez sentir?',
      category: 'reflection',
    },
    {
      id: 'esfp-planning-1',
      mbtiType: 'ESFP',
      prompt: 'Você seguiu um plano hoje, ou foi totalmente espontâneo? Qual abordagem funcionou melhor?',
      category: 'growth',
    },
  ],
};

/**
 * Retorna um prompt aleatório para o tipo MBTI
 */
export function getDailyPrompt(mbtiType: string): JournalPrompt | null {
  const prompts = JOURNAL_PROMPTS[mbtiType.toUpperCase()];
  if (!prompts || prompts.length === 0) return null;

  // Usar data como seed para mesmo prompt durante o dia
  const today = new Date().toDateString();
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = seed % prompts.length;

  return prompts[index];
}

/**
 * Retorna todos os prompts de um tipo
 */
export function getAllPromptsForType(mbtiType: string): JournalPrompt[] {
  return JOURNAL_PROMPTS[mbtiType.toUpperCase()] || [];
}

/**
 * Retorna prompts por categoria
 */
export function getPromptsByCategory(
  mbtiType: string,
  category: JournalPrompt['category']
): JournalPrompt[] {
  const allPrompts = getAllPromptsForType(mbtiType);
  return allPrompts.filter((p) => p.category === category);
}
