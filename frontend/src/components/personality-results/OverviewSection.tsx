import React from 'react';
import { PersonalityType } from '../../types/personality';

interface OverviewSectionProps {
  overview: PersonalityType['overview'];
}

export default function OverviewSection({ overview }: OverviewSectionProps) {
  const { description, quote } = overview;

  return (
    <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        Sobre Este Tipo de Personalidade
      </h2>

      <div className="prose prose-lg max-w-none">
        {description.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {paragraph.trim()}
          </p>
        ))}
      </div>

      {/* Quote */}
      <div className="mt-8 border-l-4 border-purple-600 bg-purple-50 p-6 rounded-r-lg">
        <blockquote className="text-lg italic text-gray-800 mb-2">
          "{quote.text}"
        </blockquote>
        <cite className="text-sm text-gray-600 not-italic">
          — {quote.author}
        </cite>
      </div>
    </section>
  );
}
