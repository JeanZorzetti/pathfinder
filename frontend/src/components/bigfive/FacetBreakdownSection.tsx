import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, ChevronDown, ChevronUp } from "lucide-react";
import FacetCard from "./FacetCard";
import { DimensionWithFacets } from "@/types/bigfive-facets";
import { useNavigate } from "react-router-dom";

interface FacetBreakdownSectionProps {
  dimensionsWithFacets: DimensionWithFacets[];
  isAuthenticated: boolean;
}

export default function FacetBreakdownSection({
  dimensionsWithFacets,
  isAuthenticated,
}: FacetBreakdownSectionProps) {
  const navigate = useNavigate();
  const [expandedDimensions, setExpandedDimensions] = useState<Set<string>>(
    new Set(['O']) // Open first dimension by default
  );

  const toggleDimension = (code: string) => {
    const newExpanded = new Set(expandedDimensions);
    if (newExpanded.has(code)) {
      newExpanded.delete(code);
    } else {
      newExpanded.add(code);
    }
    setExpandedDimensions(newExpanded);
  };

  const dimensionColors: { [key: string]: string } = {
    O: 'border-purple-200 bg-purple-50',
    C: 'border-blue-200 bg-blue-50',
    E: 'border-green-200 bg-green-50',
    A: 'border-yellow-200 bg-yellow-50',
    N: 'border-red-200 bg-red-50',
  };

  const dimensionIcons: { [key: string]: string } = {
    O: '🎨',
    C: '📋',
    E: '🎉',
    A: '🤝',
    N: '😰',
  };

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
          🔬 Análise Detalhada por Facetas
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Cada dimensão Big Five é composta por 6 facetas (sub-traços) que revelam aspectos específicos da sua personalidade.
          {!isAuthenticated && (
            <span className="block mt-2 text-sm text-blue-600 font-medium">
              💎 Você está vendo 2 facetas por dimensão (10 total). Cadastre-se grátis para ver todas as 30 facetas!
            </span>
          )}
        </p>
      </div>

      <div className="space-y-4">
        {dimensionsWithFacets.map((dimension) => {
          const isExpanded = expandedDimensions.has(dimension.dimensionCode);
          const facetsToShow = isAuthenticated
            ? dimension.facets
            : dimension.facets.slice(0, 2); // Show only 2 facets if not authenticated

          const hasLockedFacets = !isAuthenticated && dimension.facets.length > 2;

          return (
            <Card
              key={dimension.dimensionCode}
              className={`border-2 ${dimensionColors[dimension.dimensionCode] || 'border-gray-200'}`}
            >
              <CardHeader
                className="cursor-pointer hover:bg-white/50 transition-colors"
                onClick={() => toggleDimension(dimension.dimensionCode)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {dimensionIcons[dimension.dimensionCode] || '📊'}
                    </span>
                    <div>
                      <CardTitle className="text-xl">
                        {dimension.dimensionName}
                      </CardTitle>
                      <CardDescription>
                        {isAuthenticated ? '6 facetas' : '2 de 6 facetas desbloqueadas'} •{' '}
                        {dimension.dimensionCode === 'O' && 'Abertura à Experiência'}
                        {dimension.dimensionCode === 'C' && 'Organização e Disciplina'}
                        {dimension.dimensionCode === 'E' && 'Sociabilidade e Energia'}
                        {dimension.dimensionCode === 'A' && 'Cooperação e Empatia'}
                        {dimension.dimensionCode === 'N' && 'Estabilidade Emocional'}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {facetsToShow.map((facet) => (
                      <FacetCard key={facet.facetCode} facet={facet} />
                    ))}

                    {/* Show locked facets as placeholders */}
                    {hasLockedFacets &&
                      Array.from({ length: 4 }).map((_, index) => (
                        <FacetCard
                          key={`locked-${dimension.dimensionCode}-${index}`}
                          facet={{
                            facetCode: `${dimension.dimensionCode}${index + 3}`,
                            facetName: 'Faceta Bloqueada',
                            facetDescription: 'Cadastre-se para ver esta faceta',
                            score: null,
                            level: 'medium',
                            interpretation: '',
                          }}
                          isLocked={true}
                        />
                      ))}
                  </div>

                  {/* CTA for locked facets */}
                  {hasLockedFacets && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Lock className="h-8 w-8 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2 text-gray-800">
                            + 4 Facetas Bloqueadas nesta Dimensão
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Desbloqueie todas as 6 facetas de {dimension.dimensionName} para uma análise completa
                            da sua personalidade. São 30 facetas no total (6 por dimensão)!
                          </p>
                          <Button
                            onClick={() => navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname))}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Desbloquear Grátis
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Final CTA if not authenticated */}
      {!isAuthenticated && (
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">
              🔓 Desbloqueie Todas as 30 Facetas
            </CardTitle>
            <CardDescription className="text-center text-white/90 text-lg">
              100% GRATUITO • Sem cartão de crédito
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-white/90">
              Você está vendo apenas 10 de 30 facetas. Cadastre-se gratuitamente para acessar a análise completa!
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <p className="font-medium">Todas as 30 Facetas</p>
                <p className="text-sm text-white/80">Análise completa e detalhada</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">💾</div>
                <p className="font-medium">Resultados Salvos</p>
                <p className="text-sm text-white/80">Acesse quando quiser</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">📊</div>
                <p className="font-medium">Compare Testes</p>
                <p className="text-sm text-white/80">Veja sua evolução</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname))}
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
            >
              Criar Conta Gratuita Agora
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
