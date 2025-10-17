import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';

interface UnlockCTAProps {
  title: string;
  preview: string;
  benefits: string[];
  ctaLocation?: string; // 'strengths', 'weaknesses', 'careers', etc.
}

export default function UnlockCTA({ title, preview, benefits, ctaLocation = 'unknown' }: UnlockCTAProps) {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const { trackUnlockCTAClick } = useAnalytics();

  const handleUnlock = () => {
    // Track CTA click
    if (type) {
      trackUnlockCTAClick(ctaLocation, type.toUpperCase());
    }

    // Navigate to auth
    navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname));
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
      {/* Header com Lock Icon */}
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-purple-600 p-3 rounded-lg flex-shrink-0">
          <Lock className="text-white" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-purple-900 mb-2">{title}</h3>
          <p className="text-purple-700 text-sm">{preview}</p>
        </div>
      </div>

      {/* Benefits List */}
      <div className="space-y-2 mb-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-2 text-purple-900">
            <span className="text-green-600 font-bold flex-shrink-0">✓</span>
            <span className="text-sm">{benefit}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={handleUnlock}
        className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-all transform hover:scale-105 active:scale-95"
      >
        Desbloquear com Cadastro Gratuito
      </button>

      {/* Free Badge */}
      <p className="text-center text-xs text-purple-600 mt-3 font-medium">
        100% gratuito • Sem cartão de crédito • Acesso instantâneo
      </p>
    </div>
  );
}
