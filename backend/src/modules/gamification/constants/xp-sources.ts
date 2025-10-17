import { XpSource } from '../dto/add-xp.dto';

export const XP_VALUES: Record<XpSource, number> = {
  [XpSource.TEST_COMPLETED]: 100,
  [XpSource.JOURNAL_ENTRY]: 10,
  [XpSource.STREAK_MILESTONE]: 50,
  [XpSource.CONTENT_READ]: 5,
  [XpSource.CHALLENGE_COMPLETED]: 50,
  [XpSource.SHARE_RESULT]: 20,
  [XpSource.ACHIEVEMENT_UNLOCKED]: 0, // XP já vem do achievement
};

// Anti-spam: limitar frequência de alguns eventos
export const XP_COOLDOWNS: Partial<Record<XpSource, number>> = {
  [XpSource.JOURNAL_ENTRY]: 24 * 60 * 60 * 1000, // 1x por dia (ms)
};
