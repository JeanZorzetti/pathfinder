/**
 * Gamification Types - Sistema de XP, Níveis e Conquistas
 *
 * Sprint 2: Gamificação + Jornada de Crescimento
 */

/**
 * Nível do usuário
 */
export interface Level {
  level: number;
  title: string;
  xpRequired: number;
  xpForNext: number;
  badge: string;
  color: string;
}

/**
 * Conquista (Achievement)
 */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date | string | null;
  progress?: {
    current: number;
    total: number;
  };
  // Para conquistas específicas de tipo MBTI
  mbtiTypes?: string[];
}

export type AchievementCategory =
  | 'tests' // Completar testes
  | 'streak' // Dias consecutivos
  | 'journal' // Entradas no diário
  | 'content' // Consumir conteúdo
  | 'social' // Compartilhar, comparar
  | 'growth'; // Desenvolvimento pessoal

/**
 * Progresso do usuário
 */
export interface UserProgress {
  userId: string;
  level: number;
  xp: number;
  achievements: Achievement[];
  streakCurrent: number;
  streakLongest: number;
  testsCompleted: number;
  journalEntries: number;
  contentConsumed: number;
  lastXpGain?: Date | string;
}

/**
 * Evento de ganho de XP
 */
export interface XPGainEvent {
  amount: number;
  source: XPSource;
  timestamp: Date | string;
  achievementUnlocked?: Achievement;
}

export type XPSource =
  | 'test_completed' // +100 XP
  | 'journal_entry' // +10 XP
  | 'streak_milestone' // +50 XP (3, 7, 14, 30 dias)
  | 'content_read' // +5 XP
  | 'challenge_completed' // +50 XP
  | 'share_result' // +20 XP
  | 'achievement_unlocked'; // Variável

/**
 * Tabela de XP por fonte
 */
export const XP_VALUES: Record<XPSource, number> = {
  test_completed: 100,
  journal_entry: 10,
  streak_milestone: 50,
  content_read: 5,
  challenge_completed: 50,
  share_result: 20,
  achievement_unlocked: 0, // Variável baseado na conquista
};

/**
 * Sistema de níveis (5 níveis)
 */
export const LEVELS: Level[] = [
  {
    level: 1,
    title: 'Descobridor',
    xpRequired: 0,
    xpForNext: 100,
    badge: '🌱',
    color: '#10B981', // Verde
  },
  {
    level: 2,
    title: 'Explorador',
    xpRequired: 100,
    xpForNext: 300,
    badge: '🧭',
    color: '#3B82F6', // Azul
  },
  {
    level: 3,
    title: 'Líder em Formação',
    xpRequired: 300,
    xpForNext: 600,
    badge: '⭐',
    color: '#8B5CF6', // Roxo
  },
  {
    level: 4,
    title: 'Mestre do Autoconhecimento',
    xpRequired: 600,
    xpForNext: 1000,
    badge: '👑',
    color: '#F59E0B', // Dourado
  },
  {
    level: 5,
    title: 'Guia Iluminado',
    xpRequired: 1000,
    xpForNext: Infinity,
    badge: '✨',
    color: '#EC4899', // Rosa
  },
];

/**
 * Calcula o nível baseado no XP atual
 */
export function calculateLevel(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

/**
 * Calcula progresso para o próximo nível
 */
export function calculateLevelProgress(xp: number): {
  current: Level;
  next: Level | null;
  progressXP: number;
  requiredXP: number;
  percentage: number;
} {
  const currentLevel = calculateLevel(xp);
  const nextLevel = LEVELS.find((l) => l.level === currentLevel.level + 1) || null;

  if (!nextLevel) {
    return {
      current: currentLevel,
      next: null,
      progressXP: 0,
      requiredXP: 0,
      percentage: 100,
    };
  }

  const progressXP = xp - currentLevel.xpRequired;
  const requiredXP = nextLevel.xpRequired - currentLevel.xpRequired;
  const percentage = Math.round((progressXP / requiredXP) * 100);

  return {
    current: currentLevel,
    next: nextLevel,
    progressXP,
    requiredXP,
    percentage: Math.min(percentage, 100),
  };
}

/**
 * Verifica se deve ganhar XP por uma ação
 */
export function shouldGainXP(
  source: XPSource,
  lastXpGain?: Date | string
): boolean {
  // Para journal_entry, permitir apenas 1 XP por dia
  if (source === 'journal_entry' && lastXpGain) {
    const last = new Date(lastXpGain);
    const now = new Date();
    const isSameDay =
      last.getDate() === now.getDate() &&
      last.getMonth() === now.getMonth() &&
      last.getFullYear() === now.getFullYear();

    if (isSameDay) {
      return false; // Já ganhou XP hoje
    }
  }

  return true;
}
