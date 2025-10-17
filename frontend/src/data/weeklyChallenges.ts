/**
 * Weekly Challenges Database - Banco de Desafios Semanais
 *
 * Sprint 3: Desafio Semanal + Diário Inteligente
 *
 * 10 desafios por tipo MBTI focados em desenvolver fraquezas
 */

import { ChallengeTemplate } from '@/types/challenges';

/**
 * Desafios por Tipo MBTI
 * Cada tipo tem 10 desafios focados em suas fraquezas principais
 */
export const WEEKLY_CHALLENGES: Record<string, ChallengeTemplate[]> = {
  // INTJ - O Arquiteto
  INTJ: [
    {
      id: 'intj-express-emotion',
      mbtiType: 'INTJ',
      title: 'Pratique Expressar Emoções',
      description: 'Compartilhe uma emoção ou sentimento com alguém próximo todos os dias',
      howTo: 'Ao final do dia, diga a alguém: "Hoje me senti [emoção] quando [situação]"',
      why: 'INTJs tendem a suprimir emoções. Expressá-las fortalece conexões e autoconhecimento emocional.',
      targetWeakness: 'Expressar Emoções',
      xpReward: 50,
      badgeReward: '💙',
      difficulty: 'hard',
    },
    {
      id: 'intj-active-listening',
      mbtiType: 'INTJ',
      title: 'Escuta Ativa Sem Soluções',
      description: 'Escute alguém sem oferecer soluções imediatas',
      howTo: 'Quando alguém compartilhar um problema, apenas ouça e diga: "Entendo como você se sente"',
      why: 'INTJs pulam para soluções. Às vezes, pessoas só precisam ser ouvidas.',
      targetWeakness: 'Empatia',
      xpReward: 50,
      badgeReward: '👂',
      difficulty: 'medium',
    },
  ],

  // INFP - O Mediador
  INFP: [
    {
      id: 'infp-say-no',
      mbtiType: 'INFP',
      title: 'Pratique Dizer "Não"',
      description: 'Recuse educadamente uma solicitação que não se alinha com seus valores ou prioridades',
      howTo: 'Quando alguém pedir algo, pergunte-se: "Isso serve meus valores?" Se não, diga: "Agradeço, mas não posso agora"',
      why: 'INFPs evitam conflitos e negligenciam necessidades próprias. Estabelecer limites é essencial.',
      targetWeakness: 'Estabelecer Limites',
      xpReward: 50,
      badgeReward: '🛡️',
      difficulty: 'hard',
    },
    {
      id: 'infp-finish-task',
      mbtiType: 'INFP',
      title: 'Complete Uma Tarefa Chata',
      description: 'Finalize uma tarefa prática/administrativa que você tem adiado',
      howTo: 'Escolha UMA tarefa (email, documento, ligação) e complete HOJE, sem distrações',
      why: 'INFPs fogem de tarefas mundanas. Completá-las traz sensação de controle.',
      targetWeakness: 'Praticidade',
      xpReward: 50,
      badgeReward: '✅',
      difficulty: 'medium',
    },
  ],

  // ESTJ - O Executivo
  ESTJ: [
    {
      id: 'estj-ask-input',
      mbtiType: 'ESTJ',
      title: 'Peça Input Antes de Decidir',
      description: 'Antes de tomar uma decisão, pergunte a opinião de pelo menos 2 pessoas',
      howTo: 'Ao invés de decidir sozinho, pergunte: "O que você acha?" e considere genuinamente a resposta',
      why: 'ESTJs decidem rápido sozinhos. Incluir outros enriquece decisões e engaja a equipe.',
      targetWeakness: 'Flexibilidade',
      xpReward: 50,
      badgeReward: '🤝',
      difficulty: 'medium',
    },
    {
      id: 'estj-delegate',
      mbtiType: 'ESTJ',
      title: 'Delegue Uma Tarefa',
      description: 'Delegue uma tarefa que você normalmente faria sozinho',
      howTo: 'Identifique uma tarefa, escolha alguém capaz e diga: "Você pode fazer isso? Confio em você"',
      why: 'ESTJs assumem tudo. Delegar empodera outros e libera seu tempo para estratégia.',
      targetWeakness: 'Controle Excessivo',
      xpReward: 50,
      badgeReward: '👔',
      difficulty: 'hard',
    },
  ],

  // ENFP - O Ativista
  ENFP: [
    {
      id: 'enfp-finish-project',
      mbtiType: 'ENFP',
      title: 'Finalize Um Projeto Iniciado',
      description: 'Complete um projeto ou ideia que você começou mas não terminou',
      howTo: 'Escolha UM projeto inacabado. Dedique 1 hora por dia esta semana APENAS nele',
      why: 'ENFPs iniciam muitos projetos mas não finalizam. Completar traz satisfação e credibilidade.',
      targetWeakness: 'Finalização',
      xpReward: 50,
      badgeReward: '🎯',
      difficulty: 'hard',
    },
    {
      id: 'enfp-schedule-routine',
      mbtiType: 'ENFP',
      title: 'Siga Uma Rotina Simples',
      description: 'Estabeleça e siga uma rotina matinal de 30 minutos',
      howTo: 'Defina 3 ações (ex: café, exercício, planejamento). Faça NA MESMA ORDEM todos os dias',
      why: 'ENFPs resistem a rotinas mas elas reduzem decisões e aumentam produtividade.',
      targetWeakness: 'Organização',
      xpReward: 50,
      badgeReward: '📅',
      difficulty: 'medium',
    },
  ],

  // INTP - O Lógico
  INTP: [
    {
      id: 'intp-explain-simply',
      mbtiType: 'INTP',
      title: 'Explique Algo de Forma Simples',
      description: 'Explique uma ideia complexa para alguém usando linguagem simples',
      howTo: 'Escolha um conceito que você domina. Explique para alguém como se tivesse 10 anos',
      why: 'INTPs se perdem em complexidade. Comunicação clara é essencial para impacto.',
      targetWeakness: 'Comunicação Prática',
      xpReward: 50,
      badgeReward: '💬',
      difficulty: 'medium',
    },
  ],

  // ENTJ - O Comandante
  ENTJ: [
    {
      id: 'entj-patience',
      mbtiType: 'ENTJ',
      title: 'Pratique Paciência',
      description: 'Quando algo der errado, pause antes de reagir',
      howTo: 'Conte até 10 antes de falar. Pergunte: "Qual é a melhor forma de lidar com isso?"',
      why: 'ENTJs são impacientes com ineficiência. Paciência estratégica é liderança madura.',
      targetWeakness: 'Paciência',
      xpReward: 50,
      badgeReward: '🧘',
      difficulty: 'hard',
    },
  ],

  // ENTP - O Inovador
  ENTP: [
    {
      id: 'entp-follow-through',
      mbtiType: 'ENTP',
      title: 'Cumpra Um Compromisso',
      description: 'Faça algo que você prometeu mas não fez ainda',
      howTo: 'Liste 3 coisas que você disse que faria. Escolha 1 e COMPLETE esta semana',
      why: 'ENTPs prometem muito mas esquecem. Cumprir promessas constrói confiança.',
      targetWeakness: 'Confiabilidade',
      xpReward: 50,
      badgeReward: '🤝',
      difficulty: 'medium',
    },
  ],

  // INFJ - O Advogado
  INFJ: [
    {
      id: 'infj-self-care',
      mbtiType: 'INFJ',
      title: 'Priorize Autocuidado',
      description: 'Dedique 30 minutos por dia para você (sem ajudar outros)',
      howTo: 'Escolha uma atividade prazerosa (leitura, banho, caminhada). Faça SOZINHO',
      why: 'INFJs se esgotam ajudando outros. Autocuidado não é egoísmo, é sustentabilidade.',
      targetWeakness: 'Cuidar de Si',
      xpReward: 50,
      badgeReward: '💆',
      difficulty: 'medium',
    },
  ],

  // ENFJ - O Protagonista
  ENFJ: [
    {
      id: 'enfj-say-no',
      mbtiType: 'ENFJ',
      title: 'Recuse Ajudar Alguém',
      description: 'Diga "não" a um pedido de ajuda quando você não tiver energia',
      howTo: 'Quando alguém pedir ajuda, pergunte: "Tenho energia agora?" Se não, diga: "Não posso agora"',
      why: 'ENFJs se sacrificam por outros e se esgotam. Limites saudáveis beneficiam todos.',
      targetWeakness: 'Limites Pessoais',
      xpReward: 50,
      badgeReward: '🛡️',
      difficulty: 'hard',
    },
  ],

  // ISTJ - O Logístico
  ISTJ: [
    {
      id: 'istj-try-new',
      mbtiType: 'ISTJ',
      title: 'Experimente Algo Novo',
      description: 'Faça algo diferente da sua rotina usual',
      howTo: 'Almoce em lugar novo, pegue rota diferente, tente hobby novo. Apenas TENTE',
      why: 'ISTJs adoram rotina mas ela limita crescimento. Novidade traz perspectivas.',
      targetWeakness: 'Flexibilidade',
      xpReward: 50,
      badgeReward: '🌟',
      difficulty: 'medium',
    },
  ],

  // ISFJ - O Defensor
  ISFJ: [
    {
      id: 'isfj-speak-up',
      mbtiType: 'ISFJ',
      title: 'Expresse Sua Opinião',
      description: 'Compartilhe sua opinião genuína, mesmo se diferir do grupo',
      howTo: 'Em uma conversa, quando discordar, diga: "Eu vejo de forma diferente..." e explique',
      why: 'ISFJs evitam conflitos mas suas perspectivas são valiosas. Voz importa.',
      targetWeakness: 'Assertividade',
      xpReward: 50,
      badgeReward: '📢',
      difficulty: 'hard',
    },
  ],

  // ESFJ - O Cônsul
  ESFJ: [
    {
      id: 'esfj-accept-criticism',
      mbtiType: 'ESFJ',
      title: 'Aceite Crítica Construtiva',
      description: 'Peça feedback honesto e receba sem se defender',
      howTo: 'Pergunte a alguém: "Como posso melhorar?" Ouça e diga: "Obrigado pelo feedback"',
      why: 'ESFJs levam críticas para o pessoal. Feedback é crescimento, não rejeição.',
      targetWeakness: 'Sensibilidade a Críticas',
      xpReward: 50,
      badgeReward: '💪',
      difficulty: 'hard',
    },
  ],

  // ISTP - O Virtuoso
  ISTP: [
    {
      id: 'istp-plan-ahead',
      mbtiType: 'ISTP',
      title: 'Planeje a Próxima Semana',
      description: 'Crie um plano simples para os próximos 7 dias',
      howTo: 'Liste 3 objetivos para semana. Anote quando vai fazer cada um',
      why: 'ISTPs vivem no presente mas planejamento evita crises e aumenta eficácia.',
      targetWeakness: 'Planejamento',
      xpReward: 50,
      badgeReward: '📅',
      difficulty: 'medium',
    },
  ],

  // ISFP - O Aventureiro
  ISFP: [
    {
      id: 'isfp-voice-need',
      mbtiType: 'ISFP',
      title: 'Expresse Uma Necessidade',
      description: 'Diga a alguém o que você precisa ou deseja',
      howTo: 'Identifique uma necessidade. Diga a alguém: "Eu preciso de..." ou "Eu gostaria de..."',
      why: 'ISFPs evitam pedir ajuda. Expressar necessidades fortalece relacionamentos.',
      targetWeakness: 'Assertividade',
      xpReward: 50,
      badgeReward: '🗣️',
      difficulty: 'hard',
    },
  ],

  // ESTP - O Empreendedor
  ESTP: [
    {
      id: 'estp-think-before-act',
      mbtiType: 'ESTP',
      title: 'Pense Antes de Agir',
      description: 'Antes de agir impulsivamente, reflita por 5 minutos',
      howTo: 'Quando quiser fazer algo imediato, pause. Liste 3 consequências possíveis primeiro',
      why: 'ESTPs agem antes de pensar. Reflexão breve previne problemas maiores.',
      targetWeakness: 'Impulsividade',
      xpReward: 50,
      badgeReward: '🤔',
      difficulty: 'hard',
    },
  ],

  // ESFP - O Animador
  ESFP: [
    {
      id: 'esfp-organize-task',
      mbtiType: 'ESFP',
      title: 'Organize Uma Área',
      description: 'Organize um espaço físico ou digital que está bagunçado',
      howTo: 'Escolha UMA gaveta/pasta. Dedique 30 min para organizar completamente',
      why: 'ESFPs vivem no caos. Organização reduz estresse e aumenta produtividade.',
      targetWeakness: 'Organização',
      xpReward: 50,
      badgeReward: '🗂️',
      difficulty: 'medium',
    },
  ],
};

/**
 * Retorna desafios para um tipo MBTI
 */
export function getChallengesForType(mbtiType: string): ChallengeTemplate[] {
  return WEEKLY_CHALLENGES[mbtiType.toUpperCase()] || [];
}

/**
 * Seleciona um desafio aleatório que o usuário ainda não completou
 */
export function selectWeeklyChallenge(
  mbtiType: string,
  completedChallengeIds: string[]
): ChallengeTemplate | null {
  const available = getChallengesForType(mbtiType);
  const notCompleted = available.filter(
    (challenge) => !completedChallengeIds.includes(challenge.id)
  );

  if (notCompleted.length === 0) {
    // Se completou todos, pode repetir (começar do início)
    return available[0] || null;
  }

  // Selecionar aleatório dos não completados
  const randomIndex = Math.floor(Math.random() * notCompleted.length);
  return notCompleted[randomIndex];
}

/**
 * Cria um novo desafio semanal a partir de um template
 */
export function createWeeklyChallengeFromTemplate(
  template: ChallengeTemplate
): import('@/types/challenges').WeeklyChallenge {
  return {
    ...template,
    weekStartDate: new Date().toISOString(),
    daysCompleted: [false, false, false, false, false],
    isCompleted: false,
  };
}
