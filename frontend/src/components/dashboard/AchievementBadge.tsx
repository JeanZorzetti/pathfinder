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

  // Responsive size classes - larger on mobile for touch
  const sizeClasses = {
    small: 'w-14 h-14 sm:w-12 sm:h-12 text-2xl sm:text-xl',
    medium: 'w-20 h-20 sm:w-16 sm:h-16 text-4xl sm:text-3xl',
    large: 'w-28 h-28 sm:w-24 sm:h-24 text-6xl sm:text-5xl'
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
          cursor-pointer
          hover:scale-105
          active:scale-95
          ${isUnlocked ? RARITY_GLOW[achievement.rarity] : 'opacity-40 grayscale'}
        `}
        style={{
          borderColor: isUnlocked ? RARITY_COLORS[achievement.rarity] : '#D1D5DB',
          backgroundColor: isUnlocked
            ? `${RARITY_COLORS[achievement.rarity]}15`
            : '#F3F4F6'
        }}
        title={achievement.description} // Tooltip on hover/long press
      >
        {isUnlocked ? (
          <span>{achievement.icon}</span>
        ) : (
          <Lock className="w-1/2 h-1/2 text-gray-400" />
        )}
      </div>

      {/* Details */}
      {showDetails && (
        <div className="text-center max-w-[140px] sm:max-w-[120px]">
          <p
            className={`
              text-xs sm:text-sm font-semibold
              line-clamp-2
              ${isUnlocked ? '' : 'text-muted-foreground'}
            `}
          >
            {achievement.title}
          </p>
          {isUnlocked && achievement.unlockedAt && (
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
            </p>
          )}
          {!isUnlocked && achievement.progress && (
            <p className="text-[10px] sm:text-xs text-muted-foreground">
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
      className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
    >
      {achievements.map((achievement) => (
        <AchievementBadge key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
}
