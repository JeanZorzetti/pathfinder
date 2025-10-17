/**
 * Componente MetaTags - SEO Dinâmico para páginas de resultados MBTI
 *
 * Sprint 4: Otimizações e Analytics
 *
 * Atualiza dinamicamente as meta tags baseado no tipo de personalidade para:
 * - Melhorar SEO
 * - Preview bonito em redes sociais (Open Graph)
 * - Compartilhamento otimizado (WhatsApp, Facebook, Twitter)
 */

import { useEffect } from 'react';
import { PersonalityType } from '../types/personality';

interface MetaTagsProps {
  personalityType: PersonalityType;
}

export default function MetaTags({ personalityType }: MetaTagsProps) {
  useEffect(() => {
    const { code, nickname, tagline, overview } = personalityType;

    // Title
    const pageTitle = `Resultado ${code} - ${nickname} | Pathfinder`;
    document.title = pageTitle;

    // Description - Primeiro parágrafo do overview
    const description = overview.description
      .split('\n\n')[0]
      .replace(/\n/g, ' ')
      .substring(0, 160) + '...';

    // URL canônica
    const canonicalUrl = `https://pathfinder.roilabs.com.br/results/mbti/${code.toLowerCase()}`;

    // Open Graph Image (podemos criar imagens específicas por tipo no futuro)
    const ogImage = `https://pathfinder.roilabs.com.br/og-images/${code.toLowerCase()}.png`;

    // Atualizar meta tags existentes ou criar novas
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', `${code}, ${nickname}, teste MBTI, personalidade ${code}, resultado MBTI, autoconhecimento, ${tagline}`);

    // Open Graph
    updateMetaTag('property', 'og:title', `${code} - ${nickname} | Pathfinder`);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:type', 'article');
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:image:alt', `Resultado ${code} - ${nickname}`);

    // Twitter Card
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', `${code} - ${nickname}`);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    // Canonical URL
    updateLinkTag('canonical', canonicalUrl);

    // Schema.org structured data for personality test result
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${code} - ${nickname}: Resultado do Teste MBTI`,
      description: description,
      url: canonicalUrl,
      image: ogImage,
      author: {
        '@type': 'Organization',
        name: 'Pathfinder',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Pathfinder',
        logo: {
          '@type': 'ImageObject',
          url: 'https://pathfinder.roilabs.com.br/logo.png',
        },
      },
      datePublished: '2025-01-01',
      dateModified: new Date().toISOString().split('T')[0],
    };

    updateSchemaData('personality-result-schema', schemaData);

    // Cleanup function para restaurar título original quando sair da página
    return () => {
      document.title = 'Pathfinder - Descubra seu Propósito através do Autoconhecimento';
    };
  }, [personalityType]);

  // Este componente não renderiza nada - apenas manipula as tags do head
  return null;
}

/**
 * Helper: Atualiza ou cria uma meta tag
 */
function updateMetaTag(
  attribute: 'name' | 'property',
  attributeValue: string,
  content: string
) {
  let element = document.querySelector(
    `meta[${attribute}="${attributeValue}"]`
  ) as HTMLMetaElement;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * Helper: Atualiza ou cria uma link tag
 */
function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

/**
 * Helper: Atualiza ou cria script de schema.org
 */
function updateSchemaData(id: string, data: any) {
  let element = document.getElementById(id) as HTMLScriptElement;

  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}
