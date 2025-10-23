import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { BigFiveDimension } from './bigfive-dimension.entity';

@Entity('bigfive_facets')
export class BigFiveFacet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'dimension_code', type: 'varchar', length: 1 })
  dimensionCode: string; // O, C, E, A, N

  @Column({ name: 'facet_code', type: 'varchar', length: 10, unique: true })
  facetCode: string; // O1, O2, C1, C2, etc.

  @Column({ name: 'facet_name', type: 'varchar', length: 100 })
  facetName: string; // English name

  @Column({ name: 'facet_name_pt', type: 'varchar', length: 100 })
  facetNamePt: string; // Portuguese name

  @Column({ name: 'facet_description', type: 'text' })
  facetDescription: string; // English description

  @Column({ name: 'facet_description_pt', type: 'text' })
  facetDescriptionPt: string; // Portuguese description

  @Column({ name: 'high_score_description', type: 'text' })
  highScoreDescription: string; // What high scores mean (EN)

  @Column({ name: 'high_score_description_pt', type: 'text' })
  highScoreDescriptionPt: string; // What high scores mean (PT)

  @Column({ name: 'low_score_description', type: 'text' })
  lowScoreDescription: string; // What low scores mean (EN)

  @Column({ name: 'low_score_description_pt', type: 'text' })
  lowScoreDescriptionPt: string; // What low scores mean (PT)

  @Column({ name: 'order_index', type: 'integer' })
  orderIndex: number; // Display order within dimension (1-6)

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => BigFiveDimension)
  @JoinColumn({ name: 'dimension_code', referencedColumnName: 'code' })
  dimension: BigFiveDimension;
}
