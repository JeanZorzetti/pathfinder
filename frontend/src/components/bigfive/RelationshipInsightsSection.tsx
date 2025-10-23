import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Users, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  RelationshipInsight,
  getScoreRangeLabel,
  getScoreRangeColor,
  getDimensionIcon,
} from "@/types/bigfive-compatibility";

interface RelationshipInsightsSectionProps {
  insights: RelationshipInsight[];
  isAuthenticated: boolean;
}

export default function RelationshipInsightsSection({
  insights,
  isAuthenticated,
}: RelationshipInsightsSectionProps) {
  const navigate = useNavigate();
  const [expandedInsights, setExpandedInsights] = useState<Set<string>>(new Set());

  // Show 2 insights for free, rest for authenticated
  const freeInsightsCount = 2;
  const insightsToShow = isAuthenticated ? insights : insights.slice(0, freeInsightsCount);
  const hasLockedInsights = !isAuthenticated && insights.length > freeInsightsCount;

  const toggleInsight = (dimensionCode: string) => {
    const newExpanded = new Set(expandedInsights);
    if (newExpanded.has(dimensionCode)) {
      newExpanded.delete(dimensionCode);
    } else {
      newExpanded.add(dimensionCode);
    }
    setExpandedInsights(newExpanded);
  };

  return (
    <section className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mb-4">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
          💕 Insights de Relacionamento
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Entenda como sua personalidade influencia seus relacionamentos, comunicação e resolução de conflitos.
          {!isAuthenticated && (
            <span className="block mt-2 text-sm text-pink-600 font-medium">
              💎 Você está vendo {freeInsightsCount} de {insights.length} dimensões. Cadastre-se grátis para ver todas!
            </span>
          )}
        </p>
      </div>

      {/* Relationship Style Overview */}
      {insightsToShow.length > 0 && (
        <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-pink-600" />
              Seu Estilo de Relacionamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl mb-2">💬</div>
                <p className="font-medium text-gray-800">Comunicação</p>
                <p className="text-xs text-gray-600 mt-1">
                  {insightsToShow.length} estilos identificados
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl mb-2">💪</div>
                <p className="font-medium text-gray-800">Forças</p>
                <p className="text-xs text-gray-600 mt-1">
                  {insightsToShow.reduce((sum, i) => sum + i.strengths.length, 0)} pontos fortes
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl mb-2">🎯</div>
                <p className="font-medium text-gray-800">Dicas</p>
                <p className="text-xs text-gray-600 mt-1">
                  {insightsToShow.reduce((sum, i) => sum + i.tips.length, 0)} recomendações
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Individual Dimension Insights */}
      <div className="grid grid-cols-1 gap-4">
        {insightsToShow.map((insight) => {
          const isExpanded = expandedInsights.has(insight.dimensionCode);
          const rangeColor = getScoreRangeColor(insight.scoreRange);
          const icon = getDimensionIcon(insight.dimensionCode);

          return (
            <Card key={insight.dimensionCode} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{icon}</span>
                      <CardTitle className="text-lg">{insight.dimensionName}</CardTitle>
                      <Badge className={`text-xs ${rangeColor}`}>
                        {getScoreRangeLabel(insight.scoreRange)} ({insight.userScore})
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      Estilo de Comunicação: {insight.communicationStyle}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Strengths Preview */}
                {insight.strengths.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs font-medium text-green-800 mb-1 flex items-center gap-1">
                      ✅ Forças no Relacionamento:
                    </p>
                    <ul className="text-xs text-green-700 space-y-1">
                      {insight.strengths.slice(0, isExpanded ? undefined : 2).map((strength, idx) => (
                        <li key={idx}>• {strength}</li>
                      ))}
                    </ul>
                    {!isExpanded && insight.strengths.length > 2 && (
                      <p className="text-xs text-green-600 mt-1">
                        +{insight.strengths.length - 2} forças adicionais
                      </p>
                    )}
                  </div>
                )}

                {/* Expand/Collapse Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleInsight(insight.dimensionCode)}
                  className="w-full"
                >
                  {isExpanded ? (
                    <>
                      Menos Detalhes <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Mais Detalhes <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="space-y-3 pt-3 border-t border-gray-100">
                    {/* Challenges */}
                    {insight.challenges.length > 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-yellow-800 mb-1 flex items-center gap-1">
                          🤔 Desafios Potenciais:
                        </p>
                        <ul className="text-xs text-yellow-700 space-y-1">
                          {insight.challenges.map((challenge, idx) => (
                            <li key={idx}>• {challenge}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Ideal Partner */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <p className="text-xs font-medium text-purple-800 mb-1 flex items-center gap-1">
                        💑 Parceiro Ideal:
                      </p>
                      <p className="text-xs text-purple-700 leading-relaxed">
                        {insight.idealPartnerTraits}
                      </p>
                    </div>

                    {/* Conflict Resolution */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs font-medium text-blue-800 mb-1 flex items-center gap-1">
                        🛠️ Resolução de Conflitos:
                      </p>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        {insight.conflictResolution}
                      </p>
                    </div>

                    {/* Tips */}
                    {insight.tips.length > 0 && (
                      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-indigo-800 mb-1 flex items-center gap-1">
                          💡 Dicas para Relacionamento Saudável:
                        </p>
                        <ul className="text-xs text-indigo-700 space-y-1">
                          {insight.tips.map((tip, idx) => (
                            <li key={idx}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {/* Locked Insights */}
        {hasLockedInsights && (
          <>
            {Array.from({ length: insights.length - freeInsightsCount }).map((_, index) => (
              <Card
                key={`locked-${index}`}
                className="relative overflow-hidden border-dashed border-2 border-gray-300 bg-gray-50"
              >
                <CardHeader className="pb-3">
                  <div className="blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">❓</span>
                      <CardTitle className="text-lg">Dimensão Bloqueada</CardTitle>
                    </div>
                    <CardDescription>Insights de relacionamento bloqueados</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="blur-sm">
                  <div className="bg-gray-100 border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-400">
                      Conteúdo bloqueado. Cadastre-se para acessar.
                    </p>
                  </div>
                </CardContent>
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                  <div className="text-center">
                    <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Bloqueado</p>
                    <p className="text-xs text-gray-500 mt-1">Cadastre-se para ver</p>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* CTA for non-authenticated users */}
      {hasLockedInsights && (
        <Card className="bg-gradient-to-r from-pink-600 to-rose-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">
              🔓 Desbloqueie Todos os Insights de Relacionamento
            </CardTitle>
            <CardDescription className="text-center text-white/90 text-lg">
              100% GRATUITO • Sem cartão de crédito
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-white/90">
              Você está vendo apenas {freeInsightsCount} de {insights.length} dimensões. Cadastre-se gratuitamente para acessar:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">💕</div>
                <p className="font-medium">Todas as Dimensões</p>
                <p className="text-sm text-white/80">{insights.length} análises completas</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <p className="font-medium">Dicas Personalizadas</p>
                <p className="text-sm text-white/80">Para cada traço</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">💑</div>
                <p className="font-medium">Parceiro Ideal</p>
                <p className="text-sm text-white/80">Perfis compatíveis</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname))}
              className="bg-white text-pink-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
            >
              Criar Conta Gratuita Agora
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Info Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="text-3xl">ℹ️</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                Como usar esses insights?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Estes insights são baseados em pesquisa científica sobre como os traços Big Five influenciam
                dinâmicas de relacionamento, comunicação e resolução de conflitos. Use-os para:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Entender seu estilo natural de comunicação</li>
                <li>• Identificar suas forças em relacionamentos</li>
                <li>• Antecipar desafios potenciais</li>
                <li>• Encontrar estratégias para relacionamentos mais saudáveis</li>
                <li>• Compreender que tipo de parceiro complementa ou alinha com você</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Feature Teaser */}
      {isAuthenticated && (
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🔜</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 text-gray-800">
                  Em Breve: Comparação de Compatibilidade
                </h3>
                <p className="text-sm text-gray-600">
                  Compare seu perfil com o de um parceiro, amigo ou familiar para ver sua compatibilidade
                  detalhada e receber recomendações personalizadas para o relacionamento.
                </p>
              </div>
              <Users className="h-12 w-12 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
