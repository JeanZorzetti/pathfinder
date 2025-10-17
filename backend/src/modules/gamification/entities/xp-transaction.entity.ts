import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';
import { XpSource } from '../dto/add-xp.dto';

@Entity('xp_transactions')
@Index(['user_id'])
@Index(['created_at'])
export class XpTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  source: XpSource;

  @Column('int')
  amount: number;

  @CreateDateColumn()
  created_at: Date;
}
