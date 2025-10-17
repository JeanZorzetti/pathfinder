/**
 * AchievementBadge Component - Badge de Conquista
 *
 * Sprint 2: Gamificação
 *
 * Exibe uma conquista (desbloqueada ou bloqueada)
 */

import { Achievement } from '@/types/gamification';
import { RARITY_COLORS, RARITY_GLOW } from '@/data/achievements';
import { Lock } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

export function AchievementBadge({
  achievement,
  size = 'medium',
  showDetails = true
}: AchievementBadgeProps) {
  const isUnlocked = achievement.unlockedAt != null;

  const sizeClasses = {
    small: 'w-12 h-12 text-2xl',
    medium: 'w-16 h-16 text-3xl',
    large: 'w-24 h-24 text-5xl'
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Badge Icon */}
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full
          flex items-center justify-center
          border-2
          transition-all
          ${isUnlocked ? RARITY_GLOW[achievement.rarity] : 'opacity-40 grayscale'}
        `}
        style={{
          borderColor: isUnlocked ? RARITY_COLORS[achievement.rarity] : '#D1D5DB',
          backgroundColor: isUnlocked
            ? `${RARITY_COLORS[achievement.rarity]}15`
            : '#F3F4F6'
        }}
      >
        {isUnlocked ? (
          <span>{achievement.icon}</span>
        ) : (
          <Lock className="w-1/2 h-1/2 text-gray-400" />
        )}
      </div>

      {/* Details */}
      {showDetails && (
        <div className="text-center max-w-[120px]">
          <p
            className={`
              text-sm font-semibold
              ${isUnlocked ? '' : 'text-muted-foreground'}
            `}
          >
            {achievement.title}
          </p>
          {isUnlocked && achievement.unlockedAt && (
            <p className="text-xs text-muted-foreground">
              {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
            </p>
          )}
          {!isUnlocked && achievement.progress && (
            <p className="text-xs text-muted-foreground">
              {achievement.progress.current}/{achievement.progress.total}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Grid de Badges de Conquistas
 */
interface AchievementGridProps {
  achievements: Achievement[];
  columns?: number;
}

export function AchievementGrid({ achievements, columns = 4 }: AchievementGridProps) {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}
    >
      {achievements.map((achievement) => (
        <AchievementBadge key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
}
