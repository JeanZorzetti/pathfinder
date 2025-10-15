import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PersonalityFramework } from './personality-framework.entity';
import { TestResult } from './test-result.entity';

@Entity('personality_types')
export class PersonalityType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string; // INTJ, ENFP, Type1, etc.

  @Column()
  name: string; // The Architect, The Champion, The Reformer

  @Column()
  title: string; // O Arquiteto

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'short_description', type: 'text' })
  shortDescription: string;

  // SEO fields for programmatic SEO
  @Column({ name: 'meta_title' })
  metaTitle: string;

  @Column({ name: 'meta_description' })
  metaDescription: string;

  @Column({ type: 'text', array: true, default: '{}' })
  keywords: string[];

  @Column({ type: 'text' })
  slug: string; // intj-arquiteto, enfp-ativista

  // Structured content for pSEO pages
  @Column({ type: 'jsonb' })
  strengths: string[];

  @Column({ type: 'jsonb' })
  weaknesses: string[];

  @Column({ type: 'jsonb' })
  careers: string[];

  @Column({ type: 'text' })
  relationships: string;

  @Column({ type: 'text' })
  growth: string;

  @Column({ type: 'jsonb', nullable: true })
  compatibility: Record<string, any>; // Compatibility scores with other types

  @Column({ type: 'jsonb', nullable: true })
  traits: Record<string, any>; // Modular traits for pSEO

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => PersonalityFramework, (framework) => framework.types)
  @JoinColumn({ name: 'framework_id' })
  framework: PersonalityFramework;

  @Column({ name: 'framework_id' })
  frameworkId: string;

  @OneToMany(() => TestResult, (result) => result.personalityType)
  testResults: TestResult[];
}
