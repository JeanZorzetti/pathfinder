/**
 * Componente SocialShareButtons - Compartilhamento em redes sociais
 *
 * Sprint 4: Otimizações e Analytics
 *
 * Permite compartilhar resultado do teste MBTI em:
 * - WhatsApp
 * - Facebook
 * - Twitter (X)
 * - LinkedIn
 * - Copiar link
 */

import React, { useState } from 'react';
import { Check, Copy, Facebook, Linkedin, Twitter, Share2 } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

interface SocialShareButtonsProps {
  personalityType: string; // Ex: "INTJ"
  personalityNickname: string; // Ex: "O Arquiteto"
  url?: string; // URL para compartilhar (default: URL atual)
  className?: string;
}

export default function SocialShareButtons({
  personalityType,
  personalityNickname,
  url,
  className = '',
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const { trackShare } = useAnalytics();

  // URL para compartilhar (default: URL atual)
  const shareUrl = url || window.location.href;

  // Texto para compartilhamento
  const shareText = `Acabei de descobrir que sou ${personalityType} - ${personalityNickname}! 🎯\n\nFaça o teste gratuito e descubra seu tipo de personalidade MBTI:`;

  /**
   * Compartilhar no WhatsApp
   */
  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      shareText + '\n' + shareUrl
    )}`;
    window.open(whatsappUrl, '_blank');
    trackShare('whatsapp', personalityType);
  };

  /**
   * Compartilhar no Facebook
   */
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    trackShare('facebook', personalityType);
  };

  /**
   * Compartilhar no Twitter/X
   */
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    trackShare('twitter', personalityType);
  };

  /**
   * Compartilhar no LinkedIn
   */
  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
    trackShare('linkedin', personalityType);
  };

  /**
   * Copiar link para clipboard
   */
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackShare('copy_link', personalityType);

      // Reset "copied" state após 2 segundos
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Erro ao copiar link:', error);
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /**
   * Web Share API (mobile native sharing)
   */
  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${personalityType} - ${personalityNickname}`,
          text: shareText,
          url: shareUrl,
        });
        trackShare('native_share', personalityType);
      } catch (error) {
        // User cancelled or error occurred
        console.log('Compartilhamento cancelado', error);
      }
    }
  };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {/* WhatsApp */}
      <button
        onClick={shareOnWhatsApp}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95"
        aria-label="Compartilhar no WhatsApp"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="hidden sm:inline">WhatsApp</span>
      </button>

      {/* Facebook */}
      <button
        onClick={shareOnFacebook}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95"
        aria-label="Compartilhar no Facebook"
      >
        <Facebook className="w-5 h-5" />
        <span className="hidden sm:inline">Facebook</span>
      </button>

      {/* Twitter/X */}
      <button
        onClick={shareOnTwitter}
        className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95"
        aria-label="Compartilhar no Twitter"
      >
        <Twitter className="w-5 h-5" />
        <span className="hidden sm:inline">Twitter</span>
      </button>

      {/* LinkedIn */}
      <button
        onClick={shareOnLinkedIn}
        className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95"
        aria-label="Compartilhar no LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
        <span className="hidden sm:inline">LinkedIn</span>
      </button>

      {/* Copiar Link */}
      <button
        onClick={copyLink}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95 ${
          copied
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }`}
        aria-label="Copiar link"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            <span className="hidden sm:inline">Copiado!</span>
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            <span className="hidden sm:inline">Copiar Link</span>
          </>
        )}
      </button>

      {/* Native Share (Mobile only) */}
      {navigator.share && (
        <button
          onClick={shareNative}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95 sm:hidden"
          aria-label="Compartilhar"
        >
          <Share2 className="w-5 h-5" />
          <span>Compartilhar</span>
        </button>
      )}
    </div>
  );
}
