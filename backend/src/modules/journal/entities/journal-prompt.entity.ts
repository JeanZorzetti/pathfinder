import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity('journal_prompts')
@Index(['mbtiType'])
@Index(['category'])
@Index(['dayOfYear'])
export class JournalPrompt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'mbti_type', type: 'varchar', length: 4, nullable: true })
  mbtiType?: string; // null = universal

  @Column({ type: 'text' })
  prompt: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ name: 'day_of_year', type: 'int', nullable: true })
  dayOfYear?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
