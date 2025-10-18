import { XpSource } from '../dto/add-xp.dto';

export const XP_VALUES: Record<XpSource, number> = {
  [XpSource.TEST_COMPLETED]: 100,
  [XpSource.JOURNAL_ENTRY]: 10,
  [XpSource.CHALLENGE_DAY]: 20,
  [XpSource.CHALLENGE_COMPLETED]: 50,
  [XpSource.CONTENT_CONSUMED]: 5,
  [XpSource.STREAK_MILESTONE]: 50,
  [XpSource.DAILY_LOGIN]: 5,
  [XpSource.PROFILE_COMPLETED]: 100,
};

// Anti-spam: limitar frequência de alguns eventos
export const XP_COOLDOWNS: Partial<Record<XpSource, number>> = {
  [XpSource.JOURNAL_ENTRY]: 24 * 60 * 60 * 1000, // 1x por dia (ms)
};
