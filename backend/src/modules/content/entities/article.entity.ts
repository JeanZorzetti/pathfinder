import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArticleCategory } from './article-category.entity';

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum ArticleType {
  PILLAR = 'pillar', // Main comprehensive content
  CLUSTER = 'cluster', // Related to a pillar
  PROGRAMMATIC = 'programmatic', // Generated from data
}

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  excerpt: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: ArticleType,
    default: ArticleType.CLUSTER,
  })
  articleType: ArticleType;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.DRAFT,
  })
  status: ArticleStatus;

  // SEO Fields
  @Column({ name: 'meta_title' })
  metaTitle: string;

  @Column({ name: 'meta_description', type: 'text' })
  metaDescription: string;

  @Column({ type: 'text', array: true, default: '{}' })
  keywords: string[];

  @Column({ name: 'featured_image', nullable: true })
  featuredImage: string;

  @Column({ name: 'featured_image_alt', nullable: true })
  featuredImageAlt: string;

  // Content structure
  @Column({ type: 'jsonb', nullable: true })
  tableOfContents: Array<{
    id: string;
    title: string;
    level: number;
  }>;

  @Column({ type: 'jsonb', nullable: true })
  faq: Array<{
    question: string;
    answer: string;
  }>;

  // Analytics
  @Column({ name: 'view_count', default: 0 })
  viewCount: number;

  @Column({ name: 'read_time_minutes', nullable: true })
  readTimeMinutes: number;

  // Author and dates
  @Column({ name: 'author_name', nullable: true })
  authorName: string;

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => ArticleCategory, (category) => category.articles, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: ArticleCategory;

  @Column({ name: 'category_id', nullable: true })
  categoryId: string;

  // For pillar/cluster relationship
  @ManyToOne(() => Article, { nullable: true })
  @JoinColumn({ name: 'pillar_article_id' })
  pillarArticle: Article;

  @Column({ name: 'pillar_article_id', nullable: true })
  pillarArticleId: string;
}
