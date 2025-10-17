import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('user_challenges')
@Index(['user_id'])
@Index(['week_start_date'])
export class UserChallenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column({ length: 100 })
  challenge_id: string; // ID do template do desafio

  @Column({ type: 'date' })
  week_start_date: Date;

  @Column('simple-array', { default: 'false,false,false,false,false' })
  days_completed: boolean[]; // Array de 5 booleanos (Segunda-Sexta)

  @Column({ default: false })
  is_completed: boolean;

  @Column({ nullable: true })
  completed_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
