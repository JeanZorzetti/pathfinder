import React from 'react';
import { FamousPerson } from '../../types/personality';

interface FamousPeopleGridProps {
  people: FamousPerson[];
}

export default function FamousPeopleGrid({ people }: FamousPeopleGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {people.map((person, index) => (
        <PersonCard key={index} person={person} />
      ))}
    </div>
  );
}

function PersonCard({ person }: { person: FamousPerson }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl transition-all text-center group hover:scale-105">
      {/* Photo */}
      <div className="mb-3 overflow-hidden rounded-lg">
        <img
          src={person.photo}
          alt={person.name}
          className="w-full h-32 object-cover group-hover:scale-110 transition-transform"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              person.name
            )}&size=200&background=random`;
          }}
        />
      </div>

      {/* Name */}
      <h3 className="font-bold text-sm text-gray-800 mb-1">{person.name}</h3>

      {/* Description */}
      <p className="text-xs text-gray-600">{person.description}</p>

      {/* Category Badge (if available) */}
      {person.category && (
        <div className="mt-2">
          <span className="inline-block text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
            {getCategoryLabel(person.category)}
          </span>
        </div>
      )}
    </div>
  );
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    historical: 'Histórico',
    contemporary: 'Contemporâneo',
    fictional: 'Ficcional',
  };
  return labels[category] || category;
}
