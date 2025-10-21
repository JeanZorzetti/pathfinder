import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { TestResult } from '../../personality-tests/entities/test-result.entity';

export enum SubscriptionStatus {
  FREE = 'free',
  PREMIUM = 'premium',
  TRIAL = 'trial',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ name: 'full_name', nullable: true })
  fullName: string;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.FREE,
  })
  subscriptionStatus: SubscriptionStatus;

  @Column({ name: 'subscription_expires_at', nullable: true })
  subscriptionExpiresAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ default: true })
  isActive: boolean;

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column({ name: 'last_login_at', nullable: true })
  lastLoginAt: Date;

  @Column({ name: 'mbti_type', nullable: true, length: 4 })
  mbti_type: string;

  @Column({ name: 'comparison_code', nullable: true, unique: true, length: 20 })
  comparison_code: string;

  @Column({ name: 'reset_token', nullable: true })
  resetToken: string | null;

  @Column({ name: 'reset_token_expires_at', nullable: true })
  resetTokenExpiresAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => TestResult, (testResult) => testResult.user)
  testResults: TestResult[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2')) {
      // Only hash if not already hashed
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toJSON() {
    const { password, ...result } = this;
    return result;
  }
}
