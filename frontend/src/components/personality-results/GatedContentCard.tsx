import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import {
  RelationshipsContent,
  GrowthContent,
  WorkplaceContent,
} from '../../types/personality';

interface GatedContentCardProps {
  title: string;
  preview: string;
  isLocked: boolean;
  content:
    | RelationshipsContent
    | GrowthContent
    | WorkplaceContent
    | null;
  type: 'relationships' | 'growth' | 'workplace';
}

export default function GatedContentCard({
  title,
  preview,
  isLocked,
  content,
  type,
}: GatedContentCardProps) {
  const navigate = useNavigate();

  const handleUnlock = () => {
    navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname));
  };

  return (
    <section className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-purple-200">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          {isLocked && <Lock className="text-purple-600" size={28} />}
        </div>

        {/* Preview Text */}
        <p className="text-gray-700 mb-6 leading-relaxed">{preview}</p>

        {isLocked ? (
          <LockedContent type={type} onUnlock={handleUnlock} />
        ) : (
          <UnlockedContent content={content} type={type} />
        )}
      </div>
    </section>
  );
}

// ============================================================================
// Locked Content Preview
// ============================================================================

function LockedContent({
  type,
  onUnlock,
}: {
  type: string;
  onUnlock: () => void;
}) {
  return (
    <>
      {/* Blurred Preview */}
      <div className="relative mb-6">
        <div className="blur-sm select-none pointer-events-none bg-gray-100 p-6 rounded-lg">
          <h3 className="font-bold mb-2">Como você {getTypePreviewTitle(type)}</h3>
          <p className="mb-4">
            {getTypePreviewText(type)}
          </p>
          <h3 className="font-bold mb-2">Informações Detalhadas</h3>
          <p>Compatibilidade, estratégias práticas, dicas personalizadas...</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
      </div>

      {/* Unlock CTA Box */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border-2 border-purple-300">
        <h3 className="text-xl font-bold mb-3 text-purple-900">
          🔒 Conteúdo Bloqueado
        </h3>
        <p className="text-purple-800 mb-4">
          Cadastre-se gratuitamente para desbloquear:
        </p>
        <ul className="space-y-2 mb-6 text-purple-900">
          {getTypeBenefits(type).map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-green-600 font-bold flex-shrink-0">✓</span>
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onUnlock}
          className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-all transform hover:scale-105"
        >
          Desbloquear Agora (100% Grátis)
        </button>
        <p className="text-center text-xs text-purple-600 mt-3 font-medium">
          Sem cartão de crédito • Acesso instantâneo
        </p>
      </div>
    </>
  );
}

// ============================================================================
// Unlocked Content Display
// ============================================================================

function UnlockedContent({
  content,
  type,
}: {
  content: RelationshipsContent | GrowthContent | WorkplaceContent | null;
  type: string;
}) {
  if (!content) return null;

  switch (type) {
    case 'relationships':
      return <RelationshipsDisplay content={content as RelationshipsContent} />;
    case 'growth':
      return <GrowthDisplay content={content as GrowthContent} />;
    case 'workplace':
      return <WorkplaceDisplay content={content as WorkplaceContent} />;
    default:
      return null;
  }
}

// Relationships Content Display
function RelationshipsDisplay({ content }: { content: RelationshipsContent }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">❤️ Como você ama</h3>
        <p className="text-gray-700 leading-relaxed">{content.lovingStyle}</p>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">🤝 Estilo de amizade</h3>
        <p className="text-gray-700 leading-relaxed">{content.friendshipStyle}</p>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">🎯 Compatibilidade</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <CompatibilityBox
            title="Melhor Compatibilidade"
            types={content.compatibility.best}
            color="green"
          />
          <CompatibilityBox
            title="Boa Compatibilidade"
            types={content.compatibility.good}
            color="blue"
          />
          <CompatibilityBox
            title="Desafiador"
            types={content.compatibility.challenging}
            color="orange"
          />
        </div>
      </div>

      {content.tips && content.tips.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">💡 Dicas para relacionamentos saudáveis</h3>
          <ul className="space-y-2">
            {content.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Growth Content Display
function GrowthDisplay({ content }: { content: GrowthContent }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">
          🎯 Desenvolvendo sua função inferior
        </h3>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-gray-800 mb-2">
            {content.inferiorFunction.name}
          </h4>
          <p className="text-gray-700 mb-3">{content.inferiorFunction.challenges}</p>
          <h5 className="font-semibold text-sm text-gray-700 mb-2">
            Como desenvolver:
          </h5>
          {content.inferiorFunction?.development && content.inferiorFunction.development.length > 0 && (
            <ul className="space-y-1">
              {content.inferiorFunction.development.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-orange-600">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {content.dailyPractices && content.dailyPractices.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            📅 Práticas diárias de crescimento
          </h3>
          <ul className="space-y-2">
            {content.dailyPractices.map((practice, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-purple-600 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">{practice}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Workplace Content Display
function WorkplaceDisplay({ content }: { content: WorkplaceContent }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">👔 Estilo de liderança</h3>
        <p className="text-gray-700 mb-3">{content.leadershipStyle.description}</p>
        <div className="grid md:grid-cols-2 gap-4">
          {content.leadershipStyle?.strengths && content.leadershipStyle.strengths.length > 0 && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 text-gray-800">Forças</h4>
              <ul className="space-y-1">
                {content.leadershipStyle.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {content.leadershipStyle?.weaknesses && content.leadershipStyle.weaknesses.length > 0 && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 text-gray-800">Áreas de atenção</h4>
              <ul className="space-y-1">
                {content.leadershipStyle.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-orange-600">⚠</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">🏢 Ambiente ideal</h3>
        <div className="bg-blue-50 p-4 rounded-lg space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Físico:</span> {content.idealEnvironment.physical}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Cultura:</span> {content.idealEnvironment.culture}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Evitar:</span> {content.idealEnvironment.avoid}
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper Component: Compatibility Box
function CompatibilityBox({
  title,
  types,
  color,
}: {
  title: string;
  types: string[];
  color: 'green' | 'blue' | 'orange';
}) {
  const colorClasses = {
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
    orange: 'bg-orange-50 border-orange-200',
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <h4 className="font-semibold text-sm mb-2 text-gray-800">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {types.map((type, index) => (
          <span
            key={index}
            className="inline-block px-2 py-1 text-xs font-semibold rounded bg-white shadow-sm"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Helper Functions
// ============================================================================

function getTypePreviewTitle(type: string): string {
  const titles: Record<string, string> = {
    relationships: 'se relaciona',
    growth: 'pode crescer',
    workplace: 'trabalha',
  };
  return titles[type] || 'se comporta';
}

function getTypePreviewText(type: string): string {
  const texts: Record<string, string> = {
    relationships:
      'Seu estilo único de amar e se conectar com outros, compatibilidade com cada tipo...',
    growth:
      'Desenvolvendo sua função inferior, evitando armadilhas, práticas diárias personalizadas...',
    workplace:
      'Seu estilo de liderança, como você trabalha em equipe, ambiente ideal...',
  };
  return texts[type] || 'Informações detalhadas sobre este aspecto...';
}

function getTypeBenefits(type: string): string[] {
  const benefits: Record<string, string[]> = {
    relationships: [
      'Como você ama e seu estilo romântico',
      'Compatibilidade detalhada com todos os 16 tipos',
      'Dicas personalizadas para relacionamentos saudáveis',
    ],
    growth: [
      'Guia para desenvolver sua função inferior',
      'Como evitar loops e armadilhas do seu tipo',
      'Práticas diárias de crescimento personalizado',
    ],
    workplace: [
      'Seu estilo de liderança e como aprimorá-lo',
      'Como você trabalha em equipe',
      'Ambiente de trabalho ideal para você',
    ],
  };
  return benefits[type] || ['Acesso completo a este conteúdo'];
}
