/**
 * ProfileCard Component - Exibe perfil MBTI do usuário
 *
 * Sprint 1: Dashboard Core
 *
 * Mostra:
 * - Avatar/Badge do tipo MBTI
 * - Top 3 forças principais
 * - Área de foco (fraqueza principal)
 * - Função cognitiva dominante
 * - Link para resultado completo
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileCardProps {
  mbtiType: string; // Ex: "ESTJ"
  nickname: string; // Ex: "O Executivo"
  colorScheme: {
    primary: string;
    light: string;
  };
}

// Dados das forças por tipo (top 3)
const STRENGTHS_BY_TYPE: Record<string, string[]> = {
  INTJ: ["Pensamento Estratégico", "Independência Intelectual", "Determinação"],
  INFP: ["Empatia Profunda", "Criatividade Artística", "Autenticidade"],
  INTP: ["Análise Lógica", "Curiosidade Intelectual", "Pensamento Original"],
  ENTJ: ["Liderança Natural", "Visão Estratégica", "Eficiência"],
  ENTP: ["Inovação", "Pensamento Rápido", "Adaptabilidade"],
  INFJ: ["Visão Profunda", "Empatia", "Idealismo"],
  ENFJ: ["Carisma", "Empatia", "Liderança Inspiradora"],
  ENFP: ["Entusiasmo", "Criatividade", "Conexão Humana"],
  ISTJ: ["Confiabilidade", "Organização", "Responsabilidade"],
  ISFJ: ["Cuidado", "Lealdade", "Atenção aos Detalhes"],
  ESTJ: ["Organização", "Liderança", "Decisão Rápida"],
  ESFJ: ["Sociabilidade", "Cuidado", "Harmonia"],
  ISTP: ["Praticidade", "Análise Lógica", "Flexibilidade"],
  ISFP: ["Sensibilidade Artística", "Autenticidade", "Flexibilidade"],
  ESTP: ["Ação", "Adaptabilidade", "Carisma"],
  ESFP: ["Entusiasmo", "Sociabilidade", "Espontaneidade"],
};

// Área de foco (fraqueza principal) por tipo
const FOCUS_AREA_BY_TYPE: Record<string, string> = {
  INTJ: "Expressar Emoções",
  INFP: "Estabelecer Limites",
  INTP: "Comunicação Prática",
  ENTJ: "Empatia e Paciência",
  ENTP: "Finalização de Projetos",
  INFJ: "Cuidar de Si Mesmo",
  ENFJ: "Estabelecer Limites",
  ENFP: "Foco e Organização",
  ISTJ: "Flexibilidade",
  ISFJ: "Aceitar Mudanças",
  ESTJ: "Flexibilidade e Adaptação",
  ESFJ: "Cuidar de Si Mesmo",
  ISTP: "Planejamento de Longo Prazo",
  ISFP: "Assertividade",
  ESTP: "Pensar Antes de Agir",
  ESFP: "Organização e Planejamento",
};

// Função cognitiva dominante por tipo
const DOMINANT_FUNCTION: Record<string, { code: string; name: string; description: string }> = {
  INTJ: { code: "Ni", name: "Intuição Introvertida", description: "Você vê padrões e conexões profundas" },
  INFP: { code: "Fi", name: "Sentimento Introvertido", description: "Você vive guiado por valores autênticos" },
  INTP: { code: "Ti", name: "Pensamento Introvertido", description: "Você analisa e desconstrói sistemas" },
  ENTJ: { code: "Te", name: "Pensamento Extrovertido", description: "Você organiza o mundo com lógica" },
  ENTP: { code: "Ne", name: "Intuição Extrovertida", description: "Você vê possibilidades infinitas" },
  INFJ: { code: "Ni", name: "Intuição Introvertida", description: "Você enxerga verdades profundas" },
  ENFJ: { code: "Fe", name: "Sentimento Extrovertido", description: "Você harmoniza e inspira pessoas" },
  ENFP: { code: "Ne", name: "Intuição Extrovertida", description: "Você explora possibilidades criativas" },
  ISTJ: { code: "Si", name: "Sensação Introvertida", description: "Você valoriza tradição e confiabilidade" },
  ISFJ: { code: "Si", name: "Sensação Introvertida", description: "Você cuida e protege com dedicação" },
  ESTJ: { code: "Te", name: "Pensamento Extrovertido", description: "Você organiza e lidera com eficiência" },
  ESFJ: { code: "Fe", name: "Sentimento Extrovertido", description: "Você cria harmonia e conexão" },
  ISTP: { code: "Ti", name: "Pensamento Introvertido", description: "Você resolve problemas com lógica prática" },
  ISFP: { code: "Fi", name: "Sentimento Introvertido", description: "Você expressa autenticidade e arte" },
  ESTP: { code: "Se", name: "Sensação Extrovertida", description: "Você age no momento com confiança" },
  ESFP: { code: "Se", name: "Sensação Extrovertida", description: "Você vive o presente intensamente" },
};

export function ProfileCard({ mbtiType, nickname, colorScheme }: ProfileCardProps) {
  const navigate = useNavigate();

  const strengths = STRENGTHS_BY_TYPE[mbtiType] || ["Força 1", "Força 2", "Força 3"];
  const focusArea = FOCUS_AREA_BY_TYPE[mbtiType] || "Desenvolvimento Pessoal";
  const dominantFunc = DOMINANT_FUNCTION[mbtiType] || {
    code: "Fx",
    name: "Função Dominante",
    description: "Sua principal forma de processar o mundo"
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" style={{ color: colorScheme.primary }} />
          Seu Perfil {mbtiType}
        </CardTitle>
        <CardDescription>
          {nickname}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Avatar/Badge do Tipo - Stack horizontal em mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mx-auto sm:mx-0"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.light})`
            }}
          >
            {mbtiType}
          </div>

          {/* Forças Principais - Ao lado em mobile */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 sm:mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Forças Principais
            </h3>
            <div className="space-y-1.5 sm:space-y-2">
              {strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: colorScheme.primary }}
                  />
                  <span className="text-xs sm:text-sm flex-1 min-w-0 truncate">
                    <strong>{strength}</strong>
                  </span>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {95 - index * 5}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Área de Foco */}
        <div className="p-3 sm:p-4 rounded-lg bg-amber-50 border border-amber-200">
          <h3 className="text-xs sm:text-sm font-semibold text-amber-900 mb-1 flex items-center gap-2">
            <Target className="w-4 h-4 flex-shrink-0" />
            Foco de Desenvolvimento
          </h3>
          <p className="text-xs sm:text-sm text-amber-800">{focusArea}</p>
        </div>

        {/* Função Dominante */}
        <div
          className="p-3 sm:p-4 rounded-lg border"
          style={{
            backgroundColor: `${colorScheme.light}15`,
            borderColor: `${colorScheme.light}50`
          }}
        >
          <h3 className="text-xs sm:text-sm font-semibold mb-1 flex items-center gap-2">
            <Zap className="w-4 h-4 flex-shrink-0" style={{ color: colorScheme.primary }} />
            Função Dominante
          </h3>
          <p className="text-xs sm:text-sm font-bold" style={{ color: colorScheme.primary }}>
            {dominantFunc.code} - {dominantFunc.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {dominantFunc.description}
          </p>
        </div>

        {/* CTA */}
        <Button
          onClick={() => navigate(`/results/mbti/${mbtiType.toLowerCase()}`)}
          className="w-full"
          style={{
            backgroundColor: colorScheme.primary,
            color: 'white'
          }}
        >
          Ver Resultado Completo →
        </Button>
      </CardContent>
    </Card>
  );
}
