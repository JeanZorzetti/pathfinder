import React from 'react';
import { PersonalityType } from '../../types/personality';

interface HeroSectionProps {
  type: PersonalityType;
}

export default function HeroSection({ type }: HeroSectionProps) {
  const { code, nickname, tagline, tags, population, colorScheme } = type;

  return (
    <section
      className="relative py-20 px-4"
      style={{
        background: `linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.secondary} 100%)`,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Avatar/Icon */}
        <div className="mb-6 flex justify-center">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center text-6xl font-bold shadow-2xl"
            style={{
              backgroundColor: colorScheme.light,
              color: colorScheme.primary,
            }}
          >
            {code}
          </div>
        </div>

        {/* Type Code */}
        <h1
          className="text-5xl md:text-6xl font-bold mb-2"
          style={{ color: colorScheme.contrast }}
        >
          {code}
        </h1>

        {/* Nickname */}
        <h2
          className="text-3xl md:text-4xl font-semibold mb-4"
          style={{ color: colorScheme.contrast, opacity: 0.95 }}
        >
          {nickname}
        </h2>

        {/* Tagline */}
        <p
          className="text-xl md:text-2xl mb-6 italic"
          style={{ color: colorScheme.contrast, opacity: 0.9 }}
        >
          "{tagline}"
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full text-sm font-medium shadow-md"
              style={{
                backgroundColor: colorScheme.contrast,
                color: colorScheme.primary,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Population Badge */}
        <div className="inline-block">
          <span
            className="px-6 py-2 rounded-full text-sm font-semibold border-2"
            style={{
              color: colorScheme.contrast,
              borderColor: colorScheme.contrast,
              backgroundColor: 'transparent',
            }}
          >
            {population} da população
          </span>
        </div>
      </div>
    </section>
  );
}
