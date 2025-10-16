import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article, ArticleStatus } from '../entities/article.entity';
import { PersonalityType } from '../../personality-tests/entities/personality-type.entity';

@Injectable()
export class SitemapService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    @InjectRepository(PersonalityType)
    private typesRepository: Repository<PersonalityType>,
  ) {}

  /**
   * Generate sitemap.xml dynamically
   */
  async generateSitemap(): Promise<string> {
    const baseUrl = process.env.FRONTEND_URL || 'https://pathfinder.roilabs.com.br';

    // Buscar artigos publicados
    const articles = await this.articlesRepository.find({
      where: { status: ArticleStatus.PUBLISHED },
      order: { updatedAt: 'DESC' },
    });

    // Buscar todos os tipos de personalidade ativos
    const personalityTypes = await this.typesRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });

    const urls = [
      // Homepage
      {
        loc: baseUrl,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      // Páginas estáticas
      {
        loc: `${baseUrl}/about`,
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: `${baseUrl}/blog`,
        changefreq: 'daily',
        priority: 0.9,
      },
      // Testes de personalidade
      {
        loc: `${baseUrl}/test`,
        changefreq: 'monthly',
        priority: 0.95,
      },
      {
        loc: `${baseUrl}/test/mbti`,
        changefreq: 'monthly',
        priority: 0.9,
      },
      {
        loc: `${baseUrl}/test/bigfive`,
        changefreq: 'monthly',
        priority: 0.9,
      },
      {
        loc: `${baseUrl}/test/enneagram`,
        changefreq: 'monthly',
        priority: 0.9,
      },
      // Guias de tipos MBTI
      {
        loc: `${baseUrl}/mbti`,
        changefreq: 'monthly',
        priority: 0.85,
      },
      // Tipos de Personalidade (31 tipos)
      ...personalityTypes.map((type) => ({
        loc: `${baseUrl}/types/${type.slug}`,
        lastmod: type.updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: 0.85,
      })),
      // Artigos do blog
      ...articles.map((article) => ({
        loc: `${baseUrl}/blog/${article.slug}`,
        lastmod: article.updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: article.articleType === 'pillar' ? 0.9 : 0.7,
      })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

    return xml;
  }
}
