/**
 * Hook para rastrear eventos customizados no Google Analytics 4
 *
 * Sprint 4: Analytics e Otimizações
 *
 * Eventos rastreados:
 * - view_personality_result: Quando usuário visualiza resultado
 * - click_unlock_cta: Quando usuário clica em CTA de desbloqueio
 * - view_gated_content_preview: Quando visualiza preview de conteúdo gated
 * - share_result: Quando compartilha resultado
 * - register_from_result_page: Quando se registra via página de resultado
 */

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

export const useAnalytics = () => {
  /**
   * Envia evento para o Google Analytics 4
   */
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, parameters);

      // Log em desenvolvimento para debugging
      if (import.meta.env.DEV) {
        console.log('[Analytics] Event tracked:', eventName, parameters);
      }
    }
  };

  /**
   * Rastreia visualização de página de resultado
   */
  const trackResultView = (type: string, isAuthenticated: boolean) => {
    trackEvent('view_personality_result', {
      personality_type: type,
      is_authenticated: isAuthenticated,
      page_location: window.location.href,
      page_title: document.title,
    });
  };

  /**
   * Rastreia clique em CTA de desbloqueio
   */
  const trackUnlockCTAClick = (
    ctaLocation: string, // 'strengths', 'weaknesses', 'careers', 'relationships', 'growth', 'workplace', 'final_banner'
    personalityType: string
  ) => {
    trackEvent('click_unlock_cta', {
      cta_location: ctaLocation,
      personality_type: personalityType,
      page_location: window.location.href,
    });
  };

  /**
   * Rastreia visualização de preview de conteúdo gated
   */
  const trackGatedContentPreview = (
    section: string, // 'relationships', 'growth', 'workplace'
    personalityType: string
  ) => {
    trackEvent('view_gated_content_preview', {
      content_section: section,
      personality_type: personalityType,
    });
  };

  /**
   * Rastreia compartilhamento de resultado
   */
  const trackShare = (
    platform: string, // 'whatsapp', 'facebook', 'twitter', 'linkedin', 'copy_link'
    personalityType: string
  ) => {
    trackEvent('share_result', {
      platform: platform,
      personality_type: personalityType,
      page_location: window.location.href,
    });
  };

  /**
   * Rastreia scroll depth (profundidade de rolagem)
   */
  const trackScrollDepth = (
    depth: number, // 25, 50, 75, 100
    personalityType: string
  ) => {
    trackEvent('scroll_depth', {
      depth_percentage: depth,
      personality_type: personalityType,
    });
  };

  /**
   * Rastreia tempo na página
   */
  const trackTimeOnPage = (
    seconds: number,
    personalityType: string
  ) => {
    trackEvent('time_on_page', {
      duration_seconds: seconds,
      personality_type: personalityType,
    });
  };

  /**
   * Rastreia registro de usuário vindo da página de resultado
   */
  const trackRegistrationFromResult = (
    personalityType: string,
    source: string // 'strengths_cta', 'weaknesses_cta', 'careers_cta', 'final_banner', etc.
  ) => {
    trackEvent('register_from_result_page', {
      personality_type: personalityType,
      registration_source: source,
    });
  };

  return {
    trackEvent,
    trackResultView,
    trackUnlockCTAClick,
    trackGatedContentPreview,
    trackShare,
    trackScrollDepth,
    trackTimeOnPage,
    trackRegistrationFromResult,
  };
};
