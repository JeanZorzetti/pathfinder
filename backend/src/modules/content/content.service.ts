import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Article, ArticleStatus, ArticleType } from './entities/article.entity';
import { ArticleCategory } from './entities/article-category.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    @InjectRepository(ArticleCategory)
    private categoriesRepository: Repository<ArticleCategory>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  /**
   * Get all published articles with caching
   */
  async getArticles(limit?: number, offset?: number) {
    const cacheKey = `articles:${limit}:${offset}`;
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    const query = this.articlesRepository
      .createQueryBuilder('article')
      .where('article.status = :status', { status: ArticleStatus.PUBLISHED })
      .orderBy('article.publishedAt', 'DESC')
      .leftJoinAndSelect('article.category', 'category');

    if (limit) {
      query.take(limit);
    }

    if (offset) {
      query.skip(offset);
    }

    const articles = await query.getMany();

    await this.cacheManager.set(cacheKey, articles, 3600); // Cache for 1 hour

    return articles;
  }

  /**
   * Get article by slug with caching
   */
  async getArticleBySlug(slug: string) {
    const cacheKey = `article:${slug}`;
    const cached = await this.cacheManager.get<Article>(cacheKey);

    if (cached) {
      return cached;
    }

    const article = await this.articlesRepository.findOne({
      where: { slug, status: ArticleStatus.PUBLISHED },
      relations: ['category', 'pillarArticle'],
    });

    if (!article) {
      throw new NotFoundException(`Article with slug ${slug} not found`);
    }

    // Increment view count
    await this.articlesRepository.increment({ id: article.id }, 'viewCount', 1);

    await this.cacheManager.set(cacheKey, article, 3600); // Cache for 1 hour

    return article;
  }

  /**
   * Get all categories
   */
  async getCategories() {
    const cacheKey = 'categories:all';
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    const categories = await this.categoriesRepository.find({
      order: { sortOrder: 'ASC' },
    });

    await this.cacheManager.set(cacheKey, categories, 7200); // Cache for 2 hours

    return categories;
  }

  /**
   * Get articles by category
   */
  async getArticlesByCategory(categorySlug: string, limit?: number) {
    const category = await this.categoriesRepository.findOne({
      where: { slug: categorySlug },
    });

    if (!category) {
      throw new NotFoundException(`Category ${categorySlug} not found`);
    }

    const query = this.articlesRepository
      .createQueryBuilder('article')
      .where('article.categoryId = :categoryId', { categoryId: category.id })
      .andWhere('article.status = :status', { status: ArticleStatus.PUBLISHED })
      .orderBy('article.publishedAt', 'DESC');

    if (limit) {
      query.take(limit);
    }

    return query.getMany();
  }

  /**
   * Get pillar articles with their clusters
   */
  async getPillarArticles() {
    const cacheKey = 'articles:pillars';
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    const pillars = await this.articlesRepository.find({
      where: {
        articleType: ArticleType.PILLAR,
        status: ArticleStatus.PUBLISHED,
      },
      order: { publishedAt: 'DESC' },
    });

    await this.cacheManager.set(cacheKey, pillars, 3600);

    return pillars;
  }
}
