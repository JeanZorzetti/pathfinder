import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('comparison_history')
export class ComparisonHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  user_id: string;

  @Column({ length: 20 })
  compared_code: string;

  @Column({ length: 4 })
  compared_mbti: string;

  @Column('int')
  compatibility_score: number;

  @CreateDateColumn()
  @Index()
  created_at: Date;
}
