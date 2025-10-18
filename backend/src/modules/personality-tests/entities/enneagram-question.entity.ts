import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('enneagram_questions')
export class EnneagramQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'question_number', type: 'integer' })
  questionNumber: number;

  @Column({ name: 'question_text', type: 'text' })
  questionText: string;

  @Column({ name: 'scoring_type', length: 20 })
  scoringType: string; // 'direct', 'reverse'

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
