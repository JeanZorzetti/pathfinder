import React from 'react';
import { Career } from '../../types/personality';

interface CareerPathsGridProps {
  careers: Career[];
  showDetailed?: boolean;
}

export default function CareerPathsGrid({
  careers,
  showDetailed = false,
}: CareerPathsGridProps) {
  if (!careers || careers.length === 0) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {careers.map((career, index) => (
        <CareerCard key={index} career={career} showDetailed={showDetailed} />
      ))}
    </div>
  );
}

function CareerCard({
  career,
  showDetailed,
}: {
  career: Career;
  showDetailed: boolean;
}) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all border border-blue-200 hover:scale-105">
      {/* Icon */}
      <div className="text-4xl mb-3">{career.icon}</div>

      {/* Title & Fit Score */}
      <div className="mb-3">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{career.title}</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all"
              style={{ width: `${career.fit}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-blue-700">
            {career.fit}%
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        {career.description}
      </p>

      {/* Why It Fits */}
      {career.whyItFits && career.whyItFits.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase">
            Por que combina:
          </h4>
          <ul className="space-y-1">
            {career.whyItFits.map((reason, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Detailed Information (only for gated careers) */}
      {showDetailed && (
        <div className="mt-4 pt-4 border-t border-blue-200 space-y-3">
          {career.environment && (
            <div>
              <h4 className="text-xs font-semibold text-gray-600 mb-1">
                Ambiente Ideal:
              </h4>
              <p className="text-sm text-gray-700">{career.environment}</p>
            </div>
          )}

          {career.salary && (
            <div>
              <h4 className="text-xs font-semibold text-gray-600 mb-1">
                Faixa Salarial:
              </h4>
              <p className="text-sm text-gray-700">{career.salary}</p>
            </div>
          )}

          {career.progression && (
            <div>
              <h4 className="text-xs font-semibold text-gray-600 mb-1">
                Progressão de Carreira:
              </h4>
              <p className="text-sm text-gray-700">{career.progression}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
