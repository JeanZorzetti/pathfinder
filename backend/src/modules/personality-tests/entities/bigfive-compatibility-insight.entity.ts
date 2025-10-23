import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BigFiveDimension } from './bigfive-dimension.entity';

@Entity('bigfive_compatibility_insights')
export class BigFiveCompatibilityInsight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'dimension_code', type: 'varchar', length: 1 })
  dimensionCode: string;

  @Column({ name: 'score_range', type: 'varchar', length: 20 })
  scoreRange: 'high' | 'medium' | 'low';

  @Column({ name: 'communication_style', type: 'text' })
  communicationStyle: string;

  @Column({ name: 'communication_style_pt', type: 'text' })
  communicationStylePt: string;

  @Column({ name: 'relationship_strengths', type: 'text', array: true })
  relationshipStrengths: string[];

  @Column({ name: 'relationship_strengths_pt', type: 'text', array: true })
  relationshipStrengthsPt: string[];

  @Column({ name: 'relationship_challenges', type: 'text', array: true })
  relationshipChallenges: string[];

  @Column({ name: 'relationship_challenges_pt', type: 'text', array: true })
  relationshipChallengesPt: string[];

  @Column({ name: 'ideal_partner_traits', type: 'text' })
  idealPartnerTraits: string;

  @Column({ name: 'ideal_partner_traits_pt', type: 'text' })
  idealPartnerTraitsPt: string;

  @Column({ name: 'conflict_resolution', type: 'text' })
  conflictResolution: string;

  @Column({ name: 'conflict_resolution_pt', type: 'text' })
  conflictResolutionPt: string;

  @Column({ name: 'relationship_tips', type: 'text', array: true })
  relationshipTips: string[];

  @Column({ name: 'relationship_tips_pt', type: 'text', array: true })
  relationshipTipsPt: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => BigFiveDimension)
  @JoinColumn({ name: 'dimension_code', referencedColumnName: 'code' })
  dimension: BigFiveDimension;
}
