import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PersonalityType } from './personality-type.entity';
import { PersonalityFramework } from './personality-framework.entity';
import { Answer } from './answer.entity';

export enum TestStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned',
}

@Entity('test_results')
export class TestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TestStatus,
    default: TestStatus.IN_PROGRESS,
  })
  status: TestStatus;

  @Column({ type: 'jsonb', nullable: true })
  scores: Record<string, any>; // Dimension scores

  @Column({ type: 'jsonb', nullable: true })
  resultData: Record<string, any>; // Complete result data

  @Column({ name: 'completed_at', nullable: true })
  completedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.testResults)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => PersonalityFramework)
  @JoinColumn({ name: 'framework_id' })
  framework: PersonalityFramework;

  @Column({ name: 'framework_id' })
  frameworkId: string;

  @ManyToOne(() => PersonalityType, (type) => type.testResults, { nullable: true })
  @JoinColumn({ name: 'personality_type_id' })
  personalityType: PersonalityType;

  @Column({ name: 'personality_type_id', nullable: true })
  personalityTypeId: string;

  @OneToMany(() => Answer, (answer) => answer.testResult)
  answers: Answer[];
}
