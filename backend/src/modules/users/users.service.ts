import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, SubscriptionStatus } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Create new user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: createUserDto.password,
      fullName: createUserDto.fullName,
      subscriptionStatus: SubscriptionStatus.FREE,
      isActive: true,
      emailVerified: false,
    });

    return this.usersRepository.save(user);
  }

  /**
   * Update user
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }

  /**
   * Update last login timestamp
   */
  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, {
      lastLoginAt: new Date(),
    });
  }

  /**
   * Update subscription status
   */
  async updateSubscription(
    id: string,
    status: SubscriptionStatus,
    expiresAt?: Date,
  ): Promise<User> {
    const user = await this.findById(id);

    user.subscriptionStatus = status;
    if (expiresAt) {
      user.subscriptionExpiresAt = expiresAt;
    }

    return this.usersRepository.save(user);
  }

  /**
   * Check if user has premium access
   */
  async hasPremiumAccess(id: string): Promise<boolean> {
    const user = await this.findById(id);

    if (user.subscriptionStatus === SubscriptionStatus.FREE) {
      return false;
    }

    // Check if subscription is still valid
    if (user.subscriptionExpiresAt && user.subscriptionExpiresAt < new Date()) {
      // Subscription expired, downgrade to free
      await this.updateSubscription(id, SubscriptionStatus.FREE);
      return false;
    }

    return true;
  }
}
