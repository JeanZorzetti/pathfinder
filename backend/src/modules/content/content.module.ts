import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { SitemapService } from './services/sitemap.service';
import { Article } from './entities/article.entity';
import { ArticleCategory } from './entities/article-category.entity';
import { PersonalityType } from '../personality-tests/entities/personality-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, ArticleCategory, PersonalityType]),
  ],
  controllers: [ContentController],
  providers: [ContentService, SitemapService],
  exports: [ContentService],
})
export class ContentModule {}
