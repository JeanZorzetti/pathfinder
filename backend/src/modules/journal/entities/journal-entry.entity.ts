import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('journal_entries')
@Index(['userId'])
@Index(['createdAt'])
@Index(['mood'])
export class JournalEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  mood?: string;

  @Column({ type: 'jsonb', default: '[]' })
  tags: string[];

  @Column({ name: 'prompt_used', type: 'varchar', length: 500, nullable: true })
  promptUsed?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
