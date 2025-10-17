export interface Level {
  level: number;
  title: string;
  xpRequired: number;
  xpForNext: number;
  badge: string;
  color: string;
}

export const LEVELS: Level[] = [
  {
    level: 1,
    title: 'Descobridor',
    xpRequired: 0,
    xpForNext: 100,
    badge: '🌱',
    color: '#10B981',
  },
  {
    level: 2,
    title: 'Explorador',
    xpRequired: 100,
    xpForNext: 300,
    badge: '🧭',
    color: '#3B82F6',
  },
  {
    level: 3,
    title: 'Líder em Formação',
    xpRequired: 300,
    xpForNext: 600,
    badge: '⭐',
    color: '#8B5CF6',
  },
  {
    level: 4,
    title: 'Mestre do Autoconhecimento',
    xpRequired: 600,
    xpForNext: 1000,
    badge: '👑',
    color: '#F59E0B',
  },
  {
    level: 5,
    title: 'Guia Iluminado',
    xpRequired: 1000,
    xpForNext: Infinity,
    badge: '✨',
    color: '#EC4899',
  },
];

export function calculateLevel(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function calculateLevelProgress(xp: number): {
  current: Level;
  next: Level | null;
  progressXP: number;
  requiredXP: number;
  percentage: number;
} {
  const current = calculateLevel(xp);
  const currentIndex = LEVELS.findIndex((l) => l.level === current.level);
  const next = currentIndex < LEVELS.length - 1 ? LEVELS[currentIndex + 1] : null;

  if (!next) {
    return {
      current,
      next: null,
      progressXP: 0,
      requiredXP: 0,
      percentage: 100,
    };
  }

  const progressXP = xp - current.xpRequired;
  const requiredXP = next.xpRequired - current.xpRequired;
  const percentage = Math.min(Math.round((progressXP / requiredXP) * 100), 100);

  return {
    current,
    next,
    progressXP,
    requiredXP,
    percentage,
  };
}
