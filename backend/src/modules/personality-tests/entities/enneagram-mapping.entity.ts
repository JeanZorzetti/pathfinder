import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { EnneagramQuestion } from './enneagram-question.entity';
import { EnneagramType } from './enneagram-type.entity';

@Entity('enneagram_question_type_mapping')
export class EnneagramQuestionTypeMapping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'question_id' })
  questionId: string;

  @ManyToOne(() => EnneagramQuestion)
  @JoinColumn({ name: 'question_id' })
  question: EnneagramQuestion;

  @Column({ name: 'enneagram_type_id' })
  enneagramTypeId: string;

  @ManyToOne(() => EnneagramType)
  @JoinColumn({ name: 'enneagram_type_id' })
  enneagramType: EnneagramType;

  @Column({ name: 'score_weight', type: 'integer', default: 1 })
  scoreWeight: number; // -3 a +3

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
