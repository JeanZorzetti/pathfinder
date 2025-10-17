/**
 * Weekly Challenges Types - Desafios Semanais
 *
 * Sprint 3: Desafio Semanal + Diário Inteligente
 */

/**
 * Desafio Semanal
 */
export interface WeeklyChallenge {
  id: string;
  mbtiType: string;
  title: string;
  description: string;
  howTo: string; // Como fazer (instruções práticas)
  why: string; // Por que isso importa para o tipo
  targetWeakness: string; // Fraqueza que o desafio desenvolve
  xpReward: number;
  badgeReward?: string; // Badge emoji ao completar

  // Tracking de progresso
  weekStartDate: Date | string;
  daysCompleted: boolean[]; // [Mon, Tue, Wed, Thu, Fri]
  isCompleted: boolean;
}

/**
 * Template de desafio (usado para criar desafios semanais)
 */
export interface ChallengeTemplate {
  id: string;
  mbtiType: string;
  title: string;
  description: string;
  howTo: string;
  why: string;
  targetWeakness: string;
  xpReward: number;
  badgeReward?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

/**
 * Progresso de desafio do usuário
 */
export interface UserChallengeProgress {
  userId: string;
  currentChallenge: WeeklyChallenge | null;
  completedChallenges: string[]; // IDs dos desafios completados
  totalChallengesCompleted: number;
  currentStreak: number; // Semanas consecutivas completando desafios
  longestStreak: number;
}

/**
 * Dia da semana
 */
export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

/**
 * Label dos dias da semana
 */
export const WEEKDAY_LABELS: Record<Weekday, string> = {
  monday: 'Seg',
  tuesday: 'Ter',
  wednesday: 'Qua',
  thursday: 'Qui',
  friday: 'Sex',
};

/**
 * Retorna o índice do dia da semana (0-6, onde 0 = domingo)
 */
export function getWeekdayIndex(weekday: Weekday): number {
  const indices: Record<Weekday, number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
  };
  return indices[weekday];
}

/**
 * Verifica se hoje é dia útil (Seg-Sex)
 */
export function isWeekday(): boolean {
  const today = new Date().getDay();
  return today >= 1 && today <= 5; // 1 = Monday, 5 = Friday
}

/**
 * Retorna o dia útil atual (0-4 para Mon-Fri)
 */
export function getCurrentWeekdayIndex(): number | null {
  const today = new Date().getDay();
  if (today === 0 || today === 6) return null; // Weekend
  return today - 1; // 0 = Monday, 4 = Friday
}

/**
 * Verifica se o desafio está completado (todos os 5 dias)
 */
export function isChallengeCompleted(daysCompleted: boolean[]): boolean {
  return daysCompleted.every((day) => day === true);
}

/**
 * Calcula progresso do desafio (%)
 */
export function calculateChallengeProgress(daysCompleted: boolean[]): number {
  const completed = daysCompleted.filter((day) => day).length;
  return Math.round((completed / 5) * 100);
}

/**
 * Verifica se o usuário já marcou hoje
 */
export function hasCompletedToday(
  daysCompleted: boolean[],
  weekStartDate: Date | string
): boolean {
  const weekdayIndex = getCurrentWeekdayIndex();
  if (weekdayIndex === null) return false;

  // Verificar se estamos na mesma semana
  const startDate = new Date(weekStartDate);
  const today = new Date();
  const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  // Se passou mais de 7 dias, não é mais a mesma semana
  if (daysDiff > 7) return false;

  return daysCompleted[weekdayIndex] === true;
}

/**
 * Retorna a data de início da semana atual (segunda-feira)
 */
export function getWeekStartDate(): Date {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Se domingo, volta 6 dias; senão, vai até segunda
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/**
 * Verifica se precisa criar novo desafio (segunda-feira)
 */
export function shouldCreateNewChallenge(
  lastChallengeDate?: Date | string
): boolean {
  if (!lastChallengeDate) return true;

  const lastDate = new Date(lastChallengeDate);
  const weekStart = getWeekStartDate();

  return lastDate < weekStart;
}
