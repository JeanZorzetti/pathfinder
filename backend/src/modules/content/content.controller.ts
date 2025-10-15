import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { SitemapService } from './services/sitemap.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('content')
@Controller('content')
@Public()
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly sitemapService: SitemapService,
  ) {}

  @Get('articles')
  @ApiOperation({ summary: 'Get all published articles' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Articles retrieved successfully' })
  async getArticles(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    const articles = await this.contentService.getArticles(limit, offset);
    return {
      success: true,
      data: articles,
      count: Array.isArray(articles) ? articles.length : 0,
    };
  }

  @Get('articles/:slug')
  @ApiOperation({ summary: 'Get article by slug' })
  @ApiResponse({ status: 200, description: 'Article retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  async getArticle(@Param('slug') slug: string) {
    const article = await this.contentService.getArticleBySlug(slug);
    return {
      success: true,
      data: article,
    };
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async getCategories() {
    const categories = await this.contentService.getCategories();
    return {
      success: true,
      data: categories,
    };
  }

  @Get('categories/:slug/articles')
  @ApiOperation({ summary: 'Get articles by category' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Articles retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async getArticlesByCategory(@Param('slug') slug: string, @Query('limit') limit?: number) {
    const articles = await this.contentService.getArticlesByCategory(slug, limit);
    return {
      success: true,
      data: articles,
      count: Array.isArray(articles) ? articles.length : 0,
    };
  }

  @Get('pillars')
  @ApiOperation({ summary: 'Get all pillar articles' })
  @ApiResponse({ status: 200, description: 'Pillar articles retrieved successfully' })
  async getPillarArticles() {
    const pillars = await this.contentService.getPillarArticles();
    return {
      success: true,
      data: pillars,
    };
  }

  @Get('sitemap.xml')
  @ApiOperation({ summary: 'Generate dynamic sitemap.xml' })
  @ApiResponse({ status: 200, description: 'Sitemap generated successfully' })
  async getSitemap() {
    return this.sitemapService.generateSitemap();
  }
}
