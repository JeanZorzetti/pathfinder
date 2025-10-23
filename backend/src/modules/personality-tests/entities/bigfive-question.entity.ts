import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { BigFiveDimension } from './bigfive-dimension.entity';

@Entity('bigfive_questions')
export class BigFiveQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'question_number', type: 'integer' })
  questionNumber: number; // 1-60

  @Column({ name: 'question_text', type: 'text' })
  questionText: string; // English text

  @Column({ name: 'question_text_pt', type: 'text' })
  questionTextPt: string; // Portuguese text

  @Column({ name: 'dimension_code', type: 'varchar', length: 1 })
  dimensionCode: string; // O, C, E, A, N

  @Column({ name: 'is_reversed', type: 'boolean', default: false })
  isReversed: boolean; // If true, scoring is reversed (5 becomes 1, 4 becomes 2, etc)

  @Column({ name: 'facet_code', type: 'varchar', length: 10, nullable: true })
  facetCode: string; // O1, O2, C1, etc. - Links to specific facet

  @Column({ name: 'order_index', type: 'integer' })
  orderIndex: number; // Display order

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => BigFiveDimension, (dimension) => dimension.questions)
  @JoinColumn({ name: 'dimension_code', referencedColumnName: 'code' })
  dimension: BigFiveDimension;
}
