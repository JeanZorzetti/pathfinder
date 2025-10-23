import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Briefcase, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CareerMatchCard from "./CareerMatchCard";
import { CareerMatch } from "@/types/bigfive-careers";

interface CareerRecommendationsSectionProps {
  careerMatches: CareerMatch[];
  isAuthenticated: boolean;
}

export default function CareerRecommendationsSection({
  careerMatches,
  isAuthenticated,
}: CareerRecommendationsSectionProps) {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // Show 6 for free, all for authenticated
  const matchesToShow = isAuthenticated
    ? (showAll ? careerMatches : careerMatches.slice(0, 10))
    : careerMatches.slice(0, 6);

  const hasMoreToShow = isAuthenticated && careerMatches.length > 10 && !showAll;
  const hasLockedCareers = !isAuthenticated && careerMatches.length > 6;

  return (
    <section className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4">
          <Briefcase className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
          💼 Recomendações de Carreira
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Com base no seu perfil Big Five, identificamos as carreiras mais compatíveis com sua personalidade.
          {!isAuthenticated && (
            <span className="block mt-2 text-sm text-blue-600 font-medium">
              💎 Você está vendo 6 recomendações. Cadastre-se grátis para ver todas as {careerMatches.length} carreiras ranqueadas!
            </span>
          )}
        </p>
      </div>

      {/* Match Statistics */}
      {careerMatches.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Estatísticas de Compatibilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {careerMatches[0] ? Math.round(careerMatches[0].matchPercentage) : '--'}%
                </div>
                <p className="text-xs text-gray-600">Melhor Match</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {careerMatches.filter(m => m.matchPercentage >= 70).length}
                </div>
                <p className="text-xs text-gray-600">Matches Fortes</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {careerMatches.length}
                </div>
                <p className="text-xs text-gray-600">Total Analisado</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {Math.round(
                    careerMatches.reduce((sum, m) => sum + m.matchPercentage, 0) / careerMatches.length
                  )}%
                </div>
                <p className="text-xs text-gray-600">Match Médio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Career Match Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matchesToShow.map((match, index) => (
          <CareerMatchCard
            key={match.career.id}
            match={match}
            rank={index + 1}
          />
        ))}

        {/* Show locked placeholders for non-authenticated users */}
        {hasLockedCareers &&
          Array.from({ length: 4 }).map((_, index) => (
            <CareerMatchCard
              key={`locked-${index}`}
              match={{
                career: {
                  id: `locked-${index}`,
                  careerNamePt: 'Carreira Bloqueada',
                  careerName: 'Locked Career',
                  descriptionPt: 'Cadastre-se para ver',
                  description: 'Sign up to see',
                  category: '',
                  idealOpenness: 50,
                  idealConscientiousness: 50,
                  idealExtraversion: 50,
                  idealAgreeableness: 50,
                  idealNeuroticism: 50,
                  workEnvironment: '',
                  salaryRangeBrl: '--',
                  educationRequired: '--',
                  whyGoodFit: '',
                  whyGoodFitPt: '',
                  remoteFriendly: false,
                  requiresCertification: false,
                  createdAt: '',
                  updatedAt: '',
                },
                matchScore: 0,
                matchPercentage: 0,
                strengths: [],
                considerations: [],
              }}
              isLocked={true}
            />
          ))}
      </div>

      {/* Show More Button (for authenticated users) */}
      {hasMoreToShow && (
        <div className="text-center">
          <Button
            onClick={() => setShowAll(true)}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
          >
            Ver Todas as {careerMatches.length} Carreiras
          </Button>
        </div>
      )}

      {/* CTA for non-authenticated users */}
      {hasLockedCareers && (
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">
              🔓 Desbloqueie Todas as {careerMatches.length} Recomendações de Carreira
            </CardTitle>
            <CardDescription className="text-center text-white/90 text-lg">
              100% GRATUITO • Sem cartão de crédito
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-white/90">
              Você está vendo apenas 6 de {careerMatches.length} carreiras ranqueadas. Cadastre-se gratuitamente para acessar:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <p className="font-medium">Ranking Completo</p>
                <p className="text-sm text-white/80">Todas as {careerMatches.length} carreiras</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">💡</div>
                <p className="font-medium">Análise Detalhada</p>
                <p className="text-sm text-white/80">Pontos fortes e atenção</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">💰</div>
                <p className="font-medium">Salários e Requisitos</p>
                <p className="text-sm text-white/80">Informações completas</p>
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

      {/* Info Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="text-3xl">ℹ️</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                Como funciona o algoritmo de matching?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Nosso algoritmo analisa seus 5 traços de personalidade (OCEAN) e compara com os perfis ideais
                de cada carreira, baseado em pesquisa científica de 2024 com 70.000 profissionais em 263 ocupações.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>Fatores considerados:</strong> Conscienciosidade (peso 1.2), Abertura (1.1), Neuroticismo (1.1),
                Extroversão (1.0) e Amabilidade (0.9). Carreiras com match acima de 70% são altamente recomendadas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
