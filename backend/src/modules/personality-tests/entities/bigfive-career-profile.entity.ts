import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('bigfive_career_profiles')
export class BigFiveCareerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'career_name', type: 'varchar', length: 200 })
  careerName: string;

  @Column({ name: 'career_name_pt', type: 'varchar', length: 200 })
  careerNamePt: string;

  @Column({ name: 'category', type: 'varchar', length: 100 })
  category: string;

  @Column({ name: 'ideal_openness', type: 'integer' })
  idealOpenness: number;

  @Column({ name: 'ideal_conscientiousness', type: 'integer' })
  idealConscientiousness: number;

  @Column({ name: 'ideal_extraversion', type: 'integer' })
  idealExtraversion: number;

  @Column({ name: 'ideal_agreeableness', type: 'integer' })
  idealAgreeableness: number;

  @Column({ name: 'ideal_neuroticism', type: 'integer' })
  idealNeuroticism: number;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'description_pt', type: 'text' })
  descriptionPt: string;

  @Column({ name: 'work_environment', type: 'text' })
  workEnvironment: string;

  @Column({ name: 'salary_range_brl', type: 'varchar', length: 100 })
  salaryRangeBrl: string;

  @Column({ name: 'education_required', type: 'varchar', length: 200 })
  educationRequired: string;

  @Column({ name: 'why_good_fit', type: 'text' })
  whyGoodFit: string;

  @Column({ name: 'why_good_fit_pt', type: 'text' })
  whyGoodFitPt: string;

  @Column({ name: 'remote_friendly', type: 'boolean', default: false })
  remoteFriendly: boolean;

  @Column({ name: 'requires_certification', type: 'boolean', default: false })
  requiresCertification: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
