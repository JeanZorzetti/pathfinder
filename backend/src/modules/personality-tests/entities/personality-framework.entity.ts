import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PersonalityType } from './personality-type.entity';
import { Question } from './question.entity';

export enum FrameworkCode {
  MBTI = 'mbti',
  BIG_FIVE = 'bigfive',
  ENNEAGRAM = 'enneagram',
}

@Entity('personality_frameworks')
export class PersonalityFramework {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: FrameworkCode,
    unique: true,
  })
  code: FrameworkCode;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'short_description' })
  shortDescription: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => PersonalityType, (type) => type.framework)
  types: PersonalityType[];

  @OneToMany(() => Question, (question) => question.framework)
  questions: Question[];
}
