import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { AchievementCatalog } from './achievement-catalog.entity';

@Entity('user_achievements')
@Index(['userId'])
@Index(['achievementId'])
@Index(['unlockedAt'])
@Index(['userId', 'achievementId'], { unique: true })
export class UserAchievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'achievement_id', type: 'varchar', length: 100 })
  achievementId: string;

  @ManyToOne(() => AchievementCatalog, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'achievement_id', referencedColumnName: 'achievementId' })
  achievement: AchievementCatalog;

  @CreateDateColumn({ name: 'unlocked_at' })
  unlockedAt: Date;

  @Column({ name: 'progress_current', type: 'int', default: 0 })
  progressCurrent: number;

  @Column({ name: 'progress_total', type: 'int', default: 0 })
  progressTotal: number;
}
