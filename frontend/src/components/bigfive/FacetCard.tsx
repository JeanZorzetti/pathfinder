import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FacetScore, getFacetLevelColor, getFacetLevelLabel } from "@/types/bigfive-facets";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FacetCardProps {
  facet: FacetScore;
  isLocked?: boolean;
}

export default function FacetCard({ facet, isLocked = false }: FacetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLocked) {
    return (
      <Card className="relative overflow-hidden border-dashed border-2 border-gray-300 bg-gray-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle className="text-sm font-medium text-gray-400 blur-sm">
                {facet.facetName}
              </CardTitle>
              <CardDescription className="text-xs mt-1 blur-sm">
                {facet.facetDescription.substring(0, 50)}...
              </CardDescription>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <div className="text-2xl">🔒</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 blur-sm">
          <Progress value={50} className="h-2 mb-2" />
          <p className="text-xs text-gray-400">Pontuação: --</p>
        </CardContent>
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">Bloqueado</p>
            <p className="text-xs text-gray-500 mt-1">Cadastre-se para ver</p>
          </div>
        </div>
      </Card>
    );
  }

  const score = facet.score ?? 50;
  const levelColor = getFacetLevelColor(facet.level);
  const levelLabel = getFacetLevelLabel(facet.level);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">{facet.facetName}</CardTitle>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border ${levelColor}`}
              >
                {levelLabel}
              </span>
            </div>
            <CardDescription className="text-xs mt-1">
              {facet.facetDescription}
            </CardDescription>
          </div>
          <div className="ml-4 flex flex-col items-end gap-1">
            <div className="text-2xl font-bold text-gray-700">{score}</div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  Menos <ChevronUp className="h-3 w-3" />
                </>
              ) : (
                <>
                  Mais <ChevronDown className="h-3 w-3" />
                </>
              )}
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Progress value={score} className="h-2 mb-2" />
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span>Baixo</span>
          <span>Médio</span>
          <span>Alto</span>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className={`p-3 rounded-lg ${levelColor} border`}>
              <p className="text-sm font-medium mb-2">
                {facet.level === 'high' && '📈 Pontuação Alta'}
                {facet.level === 'low' && '📉 Pontuação Baixa'}
                {facet.level === 'medium' && '➡️ Pontuação Média'}
              </p>
              <p className="text-sm leading-relaxed">{facet.interpretation}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
