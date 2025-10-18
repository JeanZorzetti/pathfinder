import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

export enum XpSource {
  TEST_COMPLETED = 'test_completed',
  JOURNAL_ENTRY = 'journal_entry',
  CHALLENGE_DAY = 'challenge_day',
  CHALLENGE_COMPLETED = 'challenge_completed',
  CONTENT_CONSUMED = 'content_consumed',
  STREAK_MILESTONE = 'streak_milestone',
  DAILY_LOGIN = 'daily_login',
  PROFILE_COMPLETED = 'profile_completed',
}

@Entity('xp_transactions')
@Index(['user_id'])
@Index(['created_at'])
export class XpTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column({
    type: 'enum',
    enum: XpSource,
  })
  source: XpSource;

  @Column('int')
  amount: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn()
  created_at: Date;
}
