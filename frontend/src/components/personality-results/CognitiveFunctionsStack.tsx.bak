import React from 'react';
import { CognitiveFunction } from '../../types/personality';

interface CognitiveFunctionsStackProps {
  functions: CognitiveFunction[];
  colorScheme?: {
    primary: string;
    light: string;
  };
}

const POSITION_LABELS = {
  dominant: 'Dominante',
  auxiliary: 'Auxiliar',
  tertiary: 'Terciária',
  inferior: 'Inferior',
};

const POSITION_COLORS = {
  dominant: 'from-purple-600 to-purple-700',
  auxiliary: 'from-blue-600 to-blue-700',
  tertiary: 'from-gray-600 to-gray-700',
  inferior: 'from-orange-600 to-orange-700',
};

export default function CognitiveFunctionsStack({
  functions,
  colorScheme,
}: CognitiveFunctionsStackProps) {
  if (!functions || functions.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
        🧠 Funções Cognitivas
      </h2>
      <p className="text-gray-600 mb-8">
        A pilha de funções cognitivas define como você processa informações e toma decisões.
        Cada função tem um papel único em sua personalidade.
      </p>

      {/* Desktop: Grid de 4 colunas */}
      <div className="hidden md:grid md:grid-cols-4 gap-6 mb-8">
        {functions.map((func, index) => (
          <FunctionCard key={index} func={func} />
        ))}
      </div>

      {/* Mobile: Stack vertical */}
      <div className="md:hidden space-y-4 mb-8">
        {functions.map((func, index) => (
          <FunctionCard key={index} func={func} />
        ))}
      </div>

      {/* Details Explanation */}
      <div className="space-y-6 mt-8">
        {functions.map((func, index) => (
          <div key={index} className="border-l-4 border-gray-300 pl-4">
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              {func.name} ({func.fullName}) - {POSITION_LABELS[func.position]}
            </h3>
            <p className="text-gray-700">{func.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FunctionCard({ func }: { func: CognitiveFunction }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      {/* Icon & Name */}
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{func.icon}</div>
        <div className="font-bold text-2xl text-gray-800">{func.name}</div>
        <div className="text-sm text-gray-600">{func.fullName}</div>
      </div>

      {/* Position Badge */}
      <div
        className={`text-center py-2 px-4 rounded-full text-white text-xs font-semibold mb-3 bg-gradient-to-r ${
          POSITION_COLORS[func.position]
        }`}
      >
        {POSITION_LABELS[func.position]}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 text-center">{func.description}</p>

      {/* Inferior Badge */}
      {func.position === 'inferior' && (
        <div className="mt-3 text-center">
          <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
            Área de Crescimento
          </span>
        </div>
      )}
    </div>
  );
}
