import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('daily_insights')
export class DailyInsight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'mbti_type', type: 'varchar', length: 4 })
  mbtiType: string;

  @Column({ name: 'day_of_year', type: 'int', nullable: true })
  dayOfYear: number;

  @Column({ name: 'insight_text', type: 'text' })
  insightText: string;

  @Column({ name: 'action_item', type: 'text', nullable: true })
  actionItem: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ name: 'deep_dive_link', type: 'varchar', nullable: true })
  deepDiveLink: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
