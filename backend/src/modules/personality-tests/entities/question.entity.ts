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
import { PersonalityFramework } from './personality-framework.entity';
import { Answer } from './answer.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  questionText: string;

  @Column()
  dimension: string; // EI, SN, TF, JP for MBTI; O, C, E, A, N for Big Five

  @Column({ type: 'jsonb' })
  options: Array<{
    value: string;
    label: string;
    score?: number;
  }>;

  @Column({ name: 'order_index' })
  orderIndex: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => PersonalityFramework, (framework) => framework.questions)
  @JoinColumn({ name: 'framework_id' })
  framework: PersonalityFramework;

  @Column({ name: 'framework_id' })
  frameworkId: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
