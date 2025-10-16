import React from 'react';
import { Strength } from '../../types/personality';

interface StrengthsListProps {
  strengths: Strength[];
  title?: string;
}

export default function StrengthsList({ strengths, title }: StrengthsListProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {strengths.map((strength, index) => (
        <StrengthCard key={index} strength={strength} index={index} />
      ))}
    </div>
  );
}

function StrengthCard({
  strength,
  index,
}: {
  strength: Strength;
  index: number;
}) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-green-200">
      {/* Icon & Title */}
      <div className="flex items-start gap-4 mb-3">
        <div className="text-3xl flex-shrink-0">{strength.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{strength.title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-3 leading-relaxed">{strength.description}</p>

      {/* Example (if provided) */}
      {strength.example && (
        <div className="bg-white bg-opacity-60 rounded-md p-3 border-l-4 border-green-500">
          <p className="text-sm text-gray-700 italic">{strength.example}</p>
        </div>
      )}
    </div>
  );
}
