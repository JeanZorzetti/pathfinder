import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('challenge_templates')
@Index(['mbti_type'])
@Index(['challenge_id'], { unique: true })
export class ChallengeTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'challenge_id', type: 'varchar', length: 100, unique: true })
  challengeId: string;

  @Column({ name: 'mbti_type', type: 'varchar', length: 4 })
  mbtiType: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'how_to', type: 'text' })
  howTo: string;

  @Column({ type: 'text' })
  why: string;

  @Column({ name: 'xp_reward', type: 'int', default: 50 })
  xpReward: number;

  @Column({ name: 'badge_reward', type: 'varchar', length: 100, nullable: true })
  badgeReward?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
