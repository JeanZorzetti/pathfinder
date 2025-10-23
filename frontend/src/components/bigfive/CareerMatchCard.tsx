import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Briefcase, DollarSign, GraduationCap, MapPin } from "lucide-react";
import { CareerMatch, getMatchColor, getMatchLabel, getMatchIcon } from "@/types/bigfive-careers";

interface CareerMatchCardProps {
  match: CareerMatch;
  rank?: number;
  isLocked?: boolean;
}

export default function CareerMatchCard({ match, rank, isLocked = false }: CareerMatchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLocked) {
    return (
      <Card className="relative overflow-hidden border-dashed border-2 border-gray-300 bg-gray-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💼</span>
                <CardTitle className="text-lg">Carreira Bloqueada</CardTitle>
              </div>
              <CardDescription>Cadastre-se para ver mais recomendações</CardDescription>
            </div>
            <div className="ml-4">
              <div className="text-3xl blur-sm">--</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="blur-sm">
          <Progress value={50} className="h-2 mb-2" />
          <p className="text-xs text-gray-400">Match: --</p>
        </CardContent>
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">🔒 Bloqueado</p>
            <p className="text-xs text-gray-500 mt-1">Cadastre-se para ver</p>
          </div>
        </div>
      </Card>
    );
  }

  const matchColor = getMatchColor(match.matchPercentage);
  const matchLabel = getMatchLabel(match.matchPercentage);
  const matchIcon = getMatchIcon(match.matchPercentage);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {rank && (
                <span className="text-sm font-bold text-gray-500 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
                  {rank}
                </span>
              )}
              <span className="text-2xl">{matchIcon}</span>
              <CardTitle className="text-lg">{match.career.careerNamePt}</CardTitle>
            </div>
            <CardDescription className="line-clamp-2">
              {match.career.descriptionPt}
            </CardDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {match.career.category}
              </Badge>
              {match.career.remoteFriendly && (
                <Badge variant="outline" className="text-xs">
                  🏠 Remoto
                </Badge>
              )}
            </div>
          </div>
          <div className="ml-4 flex flex-col items-center">
            <div className="text-3xl font-bold text-purple-600">
              {Math.round(match.matchPercentage)}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${matchColor}`}>
              {matchLabel}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Match Progress Bar */}
        <div>
          <Progress value={match.matchPercentage} className="h-2" />
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-gray-600">
            <DollarSign className="h-3 w-3" />
            <span>{match.career.salaryRangeBrl}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <GraduationCap className="h-3 w-3" />
            <span className="truncate">{match.career.educationRequired}</span>
          </div>
        </div>

        {/* Strengths (always show top 2) */}
        {match.strengths.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-2">
            <p className="text-xs font-medium text-green-800 mb-1">✅ Seus Pontos Fortes:</p>
            <ul className="text-xs text-green-700 space-y-1">
              {match.strengths.slice(0, 2).map((strength, idx) => (
                <li key={idx}>• {strength}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
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
            {/* Full Description */}
            <div>
              <p className="text-xs font-medium text-gray-700 mb-1">📋 Sobre a Carreira:</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {match.career.descriptionPt}
              </p>
            </div>

            {/* Why Good Fit */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <p className="text-xs font-medium text-purple-800 mb-1">
                💡 Por que essa carreira combina com você:
              </p>
              <p className="text-xs text-purple-700 leading-relaxed">
                {match.career.whyGoodFitPt}
              </p>
            </div>

            {/* All Strengths */}
            {match.strengths.length > 2 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs font-medium text-green-800 mb-1">✅ Todos os Pontos Fortes:</p>
                <ul className="text-xs text-green-700 space-y-1">
                  {match.strengths.map((strength, idx) => (
                    <li key={idx}>• {strength}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Considerations */}
            {match.considerations.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs font-medium text-yellow-800 mb-1">
                  🤔 Pontos de Atenção:
                </p>
                <ul className="text-xs text-yellow-700 space-y-1">
                  {match.considerations.map((consideration, idx) => (
                    <li key={idx}>• {consideration}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Work Environment */}
            <div>
              <p className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> Ambiente de Trabalho:
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {match.career.workEnvironment}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-medium text-gray-700">💰 Faixa Salarial (BRL):</p>
                <p className="text-gray-600">{match.career.salaryRangeBrl}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">🎓 Educação:</p>
                <p className="text-gray-600">{match.career.educationRequired}</p>
              </div>
            </div>

            {match.career.requiresCertification && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                <p className="text-xs text-blue-700">
                  📜 Esta carreira requer certificação ou licença profissional
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
