import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum AchievementRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

@Entity('achievements_catalog')
@Index(['achievement_id'], { unique: true })
@Index(['rarity'])
export class AchievementCatalog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'achievement_id', type: 'varchar', length: 100, unique: true })
  achievementId: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 100 })
  icon: string;

  @Column({ name: 'xp_reward', type: 'int', default: 0 })
  xpReward: number;

  @Column({
    type: 'enum',
    enum: AchievementRarity,
    default: AchievementRarity.COMMON,
  })
  rarity: AchievementRarity;

  @Column({ name: 'mbti_types', type: 'jsonb', nullable: true })
  mbtiTypes?: string[]; // null = universal

  @Column({ name: 'requirement_type', type: 'varchar', length: 50 })
  requirementType: string; // 'streak', 'journal_count', 'tests_completed', etc.

  @Column({ name: 'requirement_value', type: 'int' })
  requirementValue: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
