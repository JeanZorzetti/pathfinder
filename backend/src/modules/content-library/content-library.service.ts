import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentLibrary } from './entities/content-library.entity';
import { User } from '../users/entities/user.entity';
import { GamificationService } from '../gamification/gamification.service';
import { XpSource } from '../gamification/dto/add-xp.dto';

@Injectable()
export class ContentLibraryService {
  constructor(
    @InjectRepository(ContentLibrary)
    private contentRepository: Repository<ContentLibrary>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private gamificationService: GamificationService,
  ) {}

  /**
   * Get recommended content for user based on MBTI type
   */
  async getRecommendedContent(userId: string, limit: number = 4): Promise<ContentLibrary[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const userType = user.mbti_type || 'INTJ';
    const consumedContent = (user.metadata as any)?.consumed_content || [];

    // Buscar conteúdo para o tipo do usuário
    let query = this.contentRepository
      .createQueryBuilder('content')
      .where("content.mbti_types @> :mbtiType::jsonb", {
        mbtiType: JSON.stringify([userType]),
      });

    if (consumedContent.length > 0) {
      query = query.andWhere('content.content_id NOT IN (:...consumed)', {
        consumed: consumedContent,
      });
    }

    return await query.orderBy('RANDOM()').limit(limit).getMany();
  }

  /**
   * Mark content as consumed and award XP
   */
  async markAsConsumed(userId: string, contentId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const content = await this.contentRepository.findOne({ where: { contentId } });
    if (!content) {
      throw new NotFoundException('Conteúdo não encontrado');
    }

    const metadata = (user.metadata as any) || {};
    const consumedContent = metadata.consumed_content || [];

    if (!consumedContent.includes(contentId)) {
      consumedContent.push(contentId);
      metadata.consumed_content = consumedContent;

      await this.userRepository.update(userId, { metadata: metadata as any });
      await this.gamificationService.addXP(userId, {
        source: XpSource.CONTENT_CONSUMED,
        amount: content.xpReward,
      });
    }
  }

  /**
   * Get user's consumption history
   */
  async getHistory(userId: string): Promise<ContentLibrary[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const consumed = (user.metadata as any)?.consumed_content || [];
    if (consumed.length === 0) return [];

    return await this.contentRepository
      .createQueryBuilder('content')
      .where('content.content_id IN (:...ids)', { ids: consumed })
      .getMany();
  }
}
