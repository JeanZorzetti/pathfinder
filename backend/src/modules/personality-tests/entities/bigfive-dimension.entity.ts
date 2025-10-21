import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { BigFiveQuestion } from './bigfive-question.entity';

@Entity('bigfive_dimensions')
export class BigFiveDimension {
  @PrimaryColumn({ type: 'varchar', length: 1 })
  code: string; // O, C, E, A, N

  @Column({ type: 'varchar', length: 50 })
  name: string; // Openness, Conscientiousness, etc

  @Column({ name: 'name_pt', type: 'varchar', length: 50 })
  namePt: string; // Abertura, Conscienciosidade, etc

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'description_pt', type: 'text' })
  descriptionPt: string;

  @Column({ name: 'high_description', type: 'text' })
  highDescription: string; // Description for high scores

  @Column({ name: 'high_description_pt', type: 'text' })
  highDescriptionPt: string;

  @Column({ name: 'low_description', type: 'text' })
  lowDescription: string; // Description for low scores

  @Column({ name: 'low_description_pt', type: 'text' })
  lowDescriptionPt: string;

  @Column({ type: 'jsonb', nullable: true })
  facets: string[]; // Sub-dimensions (e.g., for Openness: imagination, artistic interests, emotionality)

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @OneToMany(() => BigFiveQuestion, (question) => question.dimension)
  questions: BigFiveQuestion[];
}
