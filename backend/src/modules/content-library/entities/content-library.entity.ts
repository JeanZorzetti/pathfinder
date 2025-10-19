import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum ContentType {
  ARTICLE = 'article',
  VIDEO = 'video',
  BOOK = 'book',
  EXERCISE = 'exercise',
  PODCAST = 'podcast',
}

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

@Entity('content_library')
@Index(['contentId'], { unique: true })
@Index(['type'])
@Index(['difficulty'])
export class ContentLibrary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'content_id', type: 'varchar', length: 100, unique: true })
  contentId: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({
    type: 'enum',
    enum: ContentType,
    default: ContentType.ARTICLE,
  })
  type: ContentType;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'duration_minutes', type: 'int', nullable: true })
  durationMinutes?: number;

  @Column({ name: 'xp_reward', type: 'int', default: 5 })
  xpReward: number;

  @Column({ name: 'mbti_types', type: 'jsonb', default: '[]' })
  mbtiTypes: string[]; // Array de tipos MBTI: ['ESTJ', 'ENTJ']

  @Column({ type: 'jsonb', default: '[]' })
  categories: string[]; // ['leadership', 'relationships', 'productivity']

  @Column({
    type: 'enum',
    enum: Difficulty,
    default: Difficulty.BEGINNER,
  })
  difficulty: Difficulty;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
