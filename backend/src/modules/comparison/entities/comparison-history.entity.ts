import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('comparison_history')
@Index(['userId'])
@Index(['comparedWithUserId'])
@Index(['createdAt'])
export class ComparisonHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'compared_with_user_id', type: 'uuid', nullable: true })
  comparedWithUserId: string;

  @Column({ name: 'compatibility_score', type: 'int' })
  compatibilityScore: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'compared_with_user_id' })
  comparedWithUser: User;
}
