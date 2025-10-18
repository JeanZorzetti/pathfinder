import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('enneagram_types')
export class EnneagramType {
  @PrimaryColumn({ length: 10 })
  id: string; // 'type1', 'type2', ...

  @Column({ type: 'integer', unique: true })
  number: number; // 1-9

  @Column({ length: 100 })
  name: string; // 'O Perfeccionista'

  @Column({ name: 'name_en', length: 100, nullable: true })
  nameEn: string; // 'The Reformer'

  @Column({ length: 100, nullable: true })
  nickname: string;

  @Column({ name: 'core_fear', type: 'text' })
  coreFear: string;

  @Column({ name: 'core_desire', type: 'text' })
  coreDesire: string;

  @Column({ name: 'key_motivation', type: 'text' })
  keyMotivation: string;

  @Column({ name: 'at_best', type: 'text', nullable: true })
  atBest: string;

  @Column({ name: 'at_worst', type: 'text', nullable: true })
  atWorst: string;

  @Column({ name: 'basic_proposition', type: 'text', nullable: true })
  basicProposition: string;

  @Column({ length: 20, nullable: true })
  triad: string; // 'gut', 'heart', 'head'

  @Column({ name: 'wing_options', type: 'json', nullable: true })
  wingOptions: string[]; // ['1w9', '1w2']

  @Column({ name: 'growth_direction', type: 'integer', nullable: true })
  growthDirection: number;

  @Column({ name: 'stress_direction', type: 'integer', nullable: true })
  stressDirection: number;

  @Column({ type: 'json', nullable: true })
  strengths: string[];

  @Column({ type: 'json', nullable: true })
  weaknesses: string[];

  @Column({ name: 'workplace_behavior', type: 'text', nullable: true })
  workplaceBehavior: string;

  @Column({ type: 'text', nullable: true })
  relationships: string;

  @Column({ name: 'famous_examples', type: 'json', nullable: true })
  famousExamples: string[];

  @Column({ name: 'growth_path', type: 'json', nullable: true })
  growthPath: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
