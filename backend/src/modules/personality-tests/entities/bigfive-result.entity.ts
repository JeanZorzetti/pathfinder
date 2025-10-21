import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('bigfive_results')
export class BigFiveResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'openness_score', type: 'integer' })
  opennessScore: number; // 0-100

  @Column({ name: 'conscientiousness_score', type: 'integer' })
  conscientiousnessScore: number; // 0-100

  @Column({ name: 'extraversion_score', type: 'integer' })
  extraversionScore: number; // 0-100

  @Column({ name: 'agreeableness_score', type: 'integer' })
  agreeablenessScore: number; // 0-100

  @Column({ name: 'neuroticism_score', type: 'integer' })
  neuroticismScore: number; // 0-100

  @Column({ type: 'jsonb' })
  answers: { questionId: string; answer: number }[]; // Raw answers for audit

  @Column({ name: 'completion_time_seconds', type: 'integer', nullable: true })
  completionTimeSeconds: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
