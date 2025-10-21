/**
 * ContentRecommendationCard Component
 * Sprint 4: Content + Comparison
 *
 * Displays curated content (articles, videos, books, exercises)
 * personalized for the user's MBTI type
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, BookOpen, Filter } from 'lucide-react';
import {
  Content,
  ContentType,
  getContentTypeIcon,
  getContentTypeLabel,
  getCategoryLabel,
} from '@/types/content';

interface ContentRecommendationCardProps {
  content: Content[];
  onContentClick?: (content: Content) => void;
  onMarkConsumed?: (contentId: string) => void;
}

export function ContentRecommendationCard({
  content,
  onContentClick,
  onMarkConsumed,
}: ContentRecommendationCardProps) {
  const [selectedType, setSelectedType] = useState<ContentType | 'all'>('all');

  const filteredContent =
    selectedType === 'all'
      ? content
      : content.filter((c) => c.type === selectedType);

  const contentTypes: Array<{ value: ContentType | 'all'; label: string }> = [
    { value: 'all', label: 'Todos' },
    { value: 'article', label: 'Artigos' },
    { value: 'video', label: 'Vídeos' },
    { value: 'book', label: 'Livros' },
    { value: 'exercise', label: 'Exercícios' },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
          Conteúdo Recomendado
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Curado especialmente para o seu tipo de personalidade
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
          {contentTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType(type.value)}
              className="text-xs min-h-[36px] sm:min-h-[40px]"
            >
              {type.label}
            </Button>
          ))}
        </div>

        {/* Content Grid */}
        {filteredContent.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum conteúdo disponível nesta categoria</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredContent.slice(0, 4).map((item) => (
              <ContentCard
                key={item.id}
                content={item}
                onClick={onContentClick}
                onMarkConsumed={onMarkConsumed}
              />
            ))}
          </div>
        )}

        {filteredContent.length > 4 && (
          <Button variant="outline" className="w-full min-h-[44px]" size="sm">
            Ver Mais Conteúdo ({filteredContent.length - 4}+)
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

interface ContentCardProps {
  content: Content;
  onClick?: (content: Content) => void;
  onMarkConsumed?: (contentId: string) => void;
}

function ContentCard({ content, onClick, onMarkConsumed }: ContentCardProps) {
  const [isConsumed, setIsConsumed] = useState(false);

  const handleMarkConsumed = () => {
    setIsConsumed(true);
    onMarkConsumed?.(content.id);
  };

  return (
    <div
      className={`p-3 sm:p-4 rounded-lg border transition-all hover:shadow-md ${
        isConsumed ? 'bg-green-50 border-green-200' : 'bg-accent/50 border-accent'
      }`}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        {/* Icon */}
        <div className="text-2xl sm:text-3xl flex-shrink-0">
          {getContentTypeIcon(content.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title and Type */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold text-sm sm:text-base leading-tight">
              {content.title}
            </h4>
            <Badge variant="secondary" className="text-[10px] sm:text-xs flex-shrink-0">
              {getContentTypeLabel(content.type)}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
            {content.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
            {content.author && (
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                {content.author}
              </span>
            )}
            {content.duration && (
              <Badge variant="outline" className="text-[10px] sm:text-xs">
                ⏱️ {content.duration}
              </Badge>
            )}
            <Badge variant="outline" className="text-[10px] sm:text-xs">
              {getCategoryLabel(content.category)}
            </Badge>
            {content.targetWeakness && (
              <Badge variant="outline" className="text-[10px] sm:text-xs bg-amber-50 text-amber-800 border-amber-200">
                🎯 {content.targetWeakness}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {content.url ? (
              <Button
                size="sm"
                variant="default"
                className="text-xs min-h-[40px] sm:min-h-[36px]"
                onClick={() => {
                  onClick?.(content);
                  window.open(content.url, '_blank');
                }}
              >
                <ExternalLink className="w-3 h-3 sm:mr-1" />
                <span className="ml-1">
                  {content.type === 'article' && 'Ler'}
                  {content.type === 'video' && 'Assistir'}
                  {content.type === 'book' && 'Ver'}
                  {content.type === 'exercise' && 'Fazer'}
                </span>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="default"
                className="text-xs min-h-[40px] sm:min-h-[36px]"
                onClick={() => onClick?.(content)}
              >
                Ver Detalhes
              </Button>
            )}

            {!isConsumed && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs min-h-[40px] sm:min-h-[36px]"
                onClick={handleMarkConsumed}
              >
                ✓ Concluído (+{content.xpReward} XP)
              </Button>
            )}

            {isConsumed && (
              <Badge variant="outline" className="text-xs bg-green-100 text-green-800 py-2">
                ✓ Concluído
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
