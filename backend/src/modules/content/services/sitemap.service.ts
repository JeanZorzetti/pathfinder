import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article, ArticleStatus } from '../entities/article.entity';

@Injectable()
export class SitemapService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  /**
   * Generate sitemap.xml dynamically
   */
  async generateSitemap(): Promise<string> {
    const baseUrl = process.env.FRONTEND_URL || 'https://pathfinder.com';

    const articles = await this.articlesRepository.find({
      where: { status: ArticleStatus.PUBLISHED },
      order: { updatedAt: 'DESC' },
    });

    const urls = [
      {
        loc: baseUrl,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
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
      {
        loc: `${baseUrl}/test/mbti`,
        changefreq: 'monthly',
        priority: 0.9,
      },
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
