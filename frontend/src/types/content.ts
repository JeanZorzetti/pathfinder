/**
 * Types for Content Recommendation System
 * Sprint 4: Content + Comparison
 */

export type ContentType = 'article' | 'video' | 'book' | 'exercise';

export type ContentCategory =
  | 'leadership'
  | 'relationships'
  | 'career'
  | 'personal-growth'
  | 'communication'
  | 'mindfulness'
  | 'decision-making'
  | 'conflict-resolution';

export interface Content {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  url?: string;
  author?: string;
  duration?: string; // "5 min", "12 min", etc.
  category: ContentCategory;
  mbtiTypes: string[]; // Which MBTI types this content is recommended for
  targetWeakness?: string; // Which weakness this content addresses
  thumbnail?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
}

export interface UserContentProgress {
  contentId: string;
  consumed: boolean;
  consumedAt?: Date | string;
  rating?: number; // 1-5 stars
  timeSpent?: number; // in seconds
}

/**
 * Get content type icon
 */
export function getContentTypeIcon(type: ContentType): string {
  const icons: Record<ContentType, string> = {
    article: '📰',
    video: '🎥',
    book: '📚',
    exercise: '🧘',
  };
  return icons[type];
}

/**
 * Get content type label in Portuguese
 */
export function getContentTypeLabel(type: ContentType): string {
  const labels: Record<ContentType, string> = {
    article: 'Artigo',
    video: 'Vídeo',
    book: 'Livro',
    exercise: 'Exercício',
  };
  return labels[type];
}

/**
 * Get category label in Portuguese
 */
export function getCategoryLabel(category: ContentCategory): string {
  const labels: Record<ContentCategory, string> = {
    leadership: 'Liderança',
    relationships: 'Relacionamentos',
    career: 'Carreira',
    'personal-growth': 'Crescimento Pessoal',
    communication: 'Comunicação',
    mindfulness: 'Mindfulness',
    'decision-making': 'Tomada de Decisão',
    'conflict-resolution': 'Resolução de Conflitos',
  };
  return labels[category];
}

/**
 * Filter content by type
 */
export function filterContentByType(content: Content[], type?: ContentType): Content[] {
  if (!type) return content;
  return content.filter((c) => c.type === type);
}

/**
 * Filter content by category
 */
export function filterContentByCategory(content: Content[], category?: ContentCategory): Content[] {
  if (!category) return content;
  return content.filter((c) => c.category === category);
}

/**
 * Get recommended content for a specific MBTI type
 */
export function getRecommendedContent(
  allContent: Content[],
  mbtiType: string,
  limit?: number
): Content[] {
  const recommended = allContent.filter((c) => c.mbtiTypes.includes(mbtiType));

  if (limit) {
    return recommended.slice(0, limit);
  }

  return recommended;
}

/**
 * Get content not yet consumed by user
 */
export function getUnconsumedContent(
  allContent: Content[],
  userProgress: UserContentProgress[]
): Content[] {
  const consumedIds = userProgress
    .filter((p) => p.consumed)
    .map((p) => p.contentId);

  return allContent.filter((c) => !consumedIds.includes(c.id));
}
