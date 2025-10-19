import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('user_challenges')
@Index(['user_id'])
@Index(['week_start_date'])
@Index(['completed'])
export class UserChallenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'challenge_id', type: 'varchar', length: 100 })
  challengeId: string;

  @Column({ name: 'week_start_date', type: 'date' })
  weekStartDate: Date;

  @Column({ name: 'days_completed', type: 'jsonb', default: '[]' })
  daysCompleted: boolean[];

  @Column({ name: 'completed', type: 'boolean', default: false })
  completed: boolean;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
