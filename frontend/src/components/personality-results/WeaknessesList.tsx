import React from 'react';
import { Weakness } from '../../types/personality';

interface WeaknessesListProps {
  weaknesses: Weakness[];
  showMitigation?: boolean;
}

export default function WeaknessesList({
  weaknesses,
  showMitigation = false,
}: WeaknessesListProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {weaknesses.map((weakness, index) => (
        <WeaknessCard
          key={index}
          weakness={weakness}
          showMitigation={showMitigation}
        />
      ))}
    </div>
  );
}

function WeaknessCard({
  weakness,
  showMitigation,
}: {
  weakness: Weakness;
  showMitigation: boolean;
}) {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-orange-200">
      {/* Icon & Title */}
      <div className="flex items-start gap-4 mb-3">
        <div className="text-3xl flex-shrink-0">{weakness.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{weakness.title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-3 leading-relaxed">{weakness.description}</p>

      {/* Mitigation (only for gated content) */}
      {showMitigation && weakness.mitigation && (
        <div className="mt-4">
          <h4 className="font-semibold text-sm text-gray-800 mb-2 flex items-center gap-2">
            <span>🔧</span>
            <span>Como Superar:</span>
          </h4>
          <div className="bg-white bg-opacity-60 rounded-md p-3 border-l-4 border-orange-500">
            <p className="text-sm text-gray-700">{weakness.mitigation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
