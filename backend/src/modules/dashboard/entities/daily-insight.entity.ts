import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('daily_insights')
export class DailyInsight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'personality_type', length: 4 })
  personalityType: string;

  @Column({ name: 'insight_text', type: 'text' })
  insightText: string;

  @Column({ length: 50 })
  category: string;

  @Column({ name: 'action_item', type: 'text', nullable: true })
  actionItem?: string;

  @Column({ name: 'deep_dive_link', length: 500, nullable: true })
  deepDiveLink?: string;

  @Column({ name: 'day_of_year', type: 'int', nullable: true })
  dayOfYear?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
