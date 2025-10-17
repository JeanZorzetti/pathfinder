/**
 * Achievements Database - Banco de Conquistas
 *
 * Sprint 2: Gamificação + Jornada de Crescimento
 *
 * 20 conquistas iniciais (10 universais + 10 específicas por tipo)
 */

import { Achievement } from '@/types/gamification';

/**
 * Conquistas Universais (10)
 * Disponíveis para todos os tipos
 */
export const UNIVERSAL_ACHIEVEMENTS: Achievement[] = [
  // Testes
  {
    id: 'first-test',
    title: 'Primeira Descoberta',
    description: 'Complete seu primeiro teste de personalidade',
    icon: '🎯',
    category: 'tests',
    xpReward: 100,
    rarity: 'common',
    progress: { current: 0, total: 1 },
  },
  {
    id: 'three-tests',
    title: 'Explorador Completo',
    description: 'Complete 3 testes diferentes (MBTI, Eneagrama, Big Five)',
    icon: '🧠',
    category: 'tests',
    xpReward: 150,
    rarity: 'rare',
    progress: { current: 0, total: 3 },
  },

  // Streak
  {
    id: 'streak-3',
    title: 'Início da Jornada',
    description: 'Mantenha um streak de 3 dias consecutivos',
    icon: '🔥',
    category: 'streak',
    xpReward: 50,
    rarity: 'common',
    progress: { current: 0, total: 3 },
  },
  {
    id: 'streak-7',
    title: 'Semana de Fogo',
    description: 'Mantenha um streak de 7 dias consecutivos',
    icon: '🔥',
    category: 'streak',
    xpReward: 100,
    rarity: 'rare',
    progress: { current: 0, total: 7 },
  },
  {
    id: 'streak-30',
    title: 'Mestre da Consistência',
    description: 'Mantenha um streak de 30 dias consecutivos',
    icon: '🔥',
    category: 'streak',
    xpReward: 200,
    rarity: 'epic',
    progress: { current: 0, total: 30 },
  },
  {
    id: 'streak-100',
    title: 'Lenda Imortal',
    description: 'Mantenha um streak de 100 dias consecutivos',
    icon: '👑',
    category: 'streak',
    xpReward: 500,
    rarity: 'legendary',
    progress: { current: 0, total: 100 },
  },

  // Diário
  {
    id: 'journal-10',
    title: 'Reflexivo',
    description: 'Escreva 10 entradas no diário',
    icon: '📝',
    category: 'journal',
    xpReward: 50,
    rarity: 'common',
    progress: { current: 0, total: 10 },
  },
  {
    id: 'journal-50',
    title: 'Autor Dedicado',
    description: 'Escreva 50 entradas no diário',
    icon: '📚',
    category: 'journal',
    xpReward: 150,
    rarity: 'rare',
    progress: { current: 0, total: 50 },
  },

  // Conteúdo
  {
    id: 'content-10',
    title: 'Leitor Ávido',
    description: 'Leia 10 artigos recomendados',
    icon: '📖',
    category: 'content',
    xpReward: 50,
    rarity: 'common',
    progress: { current: 0, total: 10 },
  },

  // Social
  {
    id: 'share-first',
    title: 'Compartilhador',
    description: 'Compartilhe seu resultado pela primeira vez',
    icon: '🔗',
    category: 'social',
    xpReward: 30,
    rarity: 'common',
    progress: { current: 0, total: 1 },
  },
];

/**
 * Conquistas Específicas por Tipo MBTI
 * Focam em desenvolver fraquezas ou maximizar forças
 */
export const TYPE_SPECIFIC_ACHIEVEMENTS: Record<string, Achievement[]> = {
  // INTJ - O Arquiteto
  INTJ: [
    {
      id: 'intj-express-emotions',
      title: 'Vulnerável',
      description: 'Complete 5 reflexões sobre expressar emoções',
      icon: '💙',
      category: 'growth',
      xpReward: 100,
      rarity: 'rare',
      mbtiTypes: ['INTJ'],
      progress: { current: 0, total: 5 },
    },
    {
      id: 'intj-social-connection',
      title: 'Conectado',
      description: 'Complete desafio de conexão social',
      icon: '🤝',
      category: 'growth',
      xpReward: 80,
      rarity: 'rare',
      mbtiTypes: ['INTJ'],
      progress: { current: 0, total: 1 },
    },
  ],

  // INFP - O Mediador
  INFP: [
    {
      id: 'infp-boundaries',
      title: 'Guardião de Limites',
      description: 'Complete 5 reflexões sobre estabelecer limites',
      icon: '🛡️',
      category: 'growth',
      xpReward: 100,
      rarity: 'rare',
      mbtiTypes: ['INFP'],
      progress: { current: 0, total: 5 },
    },
    {
      id: 'infp-assertiveness',
      title: 'Voz Firme',
      description: 'Complete desafio de assertividade',
      icon: '📢',
      category: 'growth',
      xpReward: 80,
      rarity: 'rare',
      mbtiTypes: ['INFP'],
      progress: { current: 0, total: 1 },
    },
  ],

  // ESTJ - O Executivo
  ESTJ: [
    {
      id: 'estj-flexibility',
      title: 'Flexível',
      description: 'Complete 10 reflexões sobre adaptação e flexibilidade',
      icon: '🌊',
      category: 'growth',
      xpReward: 100,
      rarity: 'rare',
      mbtiTypes: ['ESTJ'],
      progress: { current: 0, total: 10 },
    },
    {
      id: 'estj-delegation',
      title: 'Delegador Mestre',
      description: 'Complete desafio de delegação 5 vezes',
      icon: '👔',
      category: 'growth',
      xpReward: 150,
      rarity: 'epic',
      mbtiTypes: ['ESTJ'],
      progress: { current: 0, total: 5 },
    },
  ],

  // ENFP - O Ativista
  ENFP: [
    {
      id: 'enfp-focus',
      title: 'Focado',
      description: 'Complete 10 reflexões sobre foco e organização',
      icon: '🎯',
      category: 'growth',
      xpReward: 100,
      rarity: 'rare',
      mbtiTypes: ['ENFP'],
      progress: { current: 0, total: 10 },
    },
    {
      id: 'enfp-completion',
      title: 'Finalizador',
      description: 'Complete 5 desafios semanais',
      icon: '✅',
      category: 'growth',
      xpReward: 150,
      rarity: 'epic',
      mbtiTypes: ['ENFP'],
      progress: { current: 0, total: 5 },
    },
  ],

  // Adicionar mais tipos conforme necessário
  // Por enquanto, usar conquistas genéricas para tipos não especificados
};

/**
 * Conquistas genéricas para tipos sem conquistas específicas ainda
 */
const GENERIC_TYPE_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'type-growth-1',
    title: 'Em Desenvolvimento',
    description: 'Complete 5 reflexões sobre sua área de foco',
    icon: '🌱',
    category: 'growth',
    xpReward: 100,
    rarity: 'rare',
    progress: { current: 0, total: 5 },
  },
  {
    id: 'type-growth-2',
    title: 'Autoconhecimento Profundo',
    description: 'Complete 10 desafios personalizados',
    icon: '🧘',
    category: 'growth',
    xpReward: 150,
    rarity: 'epic',
    progress: { current: 0, total: 10 },
  },
];

/**
 * Retorna todas as conquistas disponíveis para um tipo MBTI
 */
export function getAchievementsForType(mbtiType: string): Achievement[] {
  const typeSpecific = TYPE_SPECIFIC_ACHIEVEMENTS[mbtiType] || GENERIC_TYPE_ACHIEVEMENTS;
  return [...UNIVERSAL_ACHIEVEMENTS, ...typeSpecific];
}

/**
 * Retorna conquistas desbloqueadas
 */
export function getUnlockedAchievements(achievements: Achievement[]): Achievement[] {
  return achievements.filter((a) => a.unlockedAt != null);
}

/**
 * Retorna conquistas bloqueadas (ainda não conquistadas)
 */
export function getLockedAchievements(achievements: Achievement[]): Achievement[] {
  return achievements.filter((a) => a.unlockedAt == null);
}

/**
 * Retorna próximas N conquistas desbloqueáveis
 * (aquelas mais próximas de serem completadas)
 */
export function getNextAchievements(
  achievements: Achievement[],
  count: number = 3
): Achievement[] {
  return getLockedAchievements(achievements)
    .filter((a) => a.progress != null)
    .sort((a, b) => {
      const progressA = a.progress ? a.progress.current / a.progress.total : 0;
      const progressB = b.progress ? b.progress.current / b.progress.total : 0;
      return progressB - progressA; // Maior progresso primeiro
    })
    .slice(0, count);
}

/**
 * Calcula total de XP ganho com conquistas
 */
export function calculateAchievementXP(achievements: Achievement[]): number {
  return getUnlockedAchievements(achievements).reduce(
    (total, achievement) => total + achievement.xpReward,
    0
  );
}

/**
 * Cor por raridade
 */
export const RARITY_COLORS: Record<Achievement['rarity'], string> = {
  common: '#9CA3AF', // Cinza
  rare: '#3B82F6', // Azul
  epic: '#8B5CF6', // Roxo
  legendary: '#F59E0B', // Dourado
};

/**
 * Ícone de brilho por raridade
 */
export const RARITY_GLOW: Record<Achievement['rarity'], string> = {
  common: 'shadow-sm',
  rare: 'shadow-md shadow-blue-200',
  epic: 'shadow-lg shadow-purple-300',
  legendary: 'shadow-xl shadow-yellow-300 animate-pulse',
};
