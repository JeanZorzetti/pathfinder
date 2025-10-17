export interface ChallengeTemplate {
  id: string;
  title: string;
  description: string;
  emoji: string;
  xpReward: number;
  mbtiTypes: string[]; // Tipos MBTI para os quais o desafio é mais adequado
  category: 'growth' | 'productivity' | 'social' | 'wellness' | 'creativity';
  difficulty: 'easy' | 'medium' | 'hard';
}
