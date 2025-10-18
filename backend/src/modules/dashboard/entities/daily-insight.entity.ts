import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('daily_insights')
export class DailyInsight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'personality_type' })
  personalityType: string;

  @Column({ name: 'insight_text', type: 'text' })
  insightText: string;

  @Column()
  category: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
