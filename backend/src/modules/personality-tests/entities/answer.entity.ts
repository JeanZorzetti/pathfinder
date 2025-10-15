import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Question } from './question.entity';
import { TestResult } from './test-result.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'selected_value' })
  selectedValue: string;

  @Column({ type: 'int', nullable: true })
  score: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column({ name: 'question_id' })
  questionId: string;

  @ManyToOne(() => TestResult, (result) => result.answers, { nullable: true })
  @JoinColumn({ name: 'test_result_id' })
  testResult: TestResult;

  @Column({ name: 'test_result_id', nullable: true })
  testResultId: string;
}
