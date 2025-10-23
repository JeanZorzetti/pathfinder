import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Home, TrendingUp, Users, Loader2 } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";
import { axiosInstance } from "@/lib/api";
import { toast } from "sonner";
import { DimensionWithFacets, FacetScores } from "@/types/bigfive-facets";
import { CareerMatch } from "@/types/bigfive-careers";
import FacetBreakdownSection from "@/components/bigfive/FacetBreakdownSection";
import CareerRecommendationsSection from "@/components/bigfive/CareerRecommendationsSection";
import { authService } from "@/services/authService";

interface BigFiveScores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

interface BigFiveResult {
  id: string;
  userId: string;
  scores: BigFiveScores;
  facetScores?: FacetScores; // NEW: Facet scores from backend
  interpretations: {
    [key: string]: "low" | "medium" | "high";
  };
  percentiles: {
    [key: string]: number;
  };
  createdAt: string;
  completionTimeSeconds?: number;
}

interface Dimension {
  code: string;
  name: string;
  namePt: string;
  highDescriptionPt: string;
  lowDescriptionPt: string;
}

export default function BigFiveResult() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [result, setResult] = useState<BigFiveResult | null>(null);
  const [dimensions, setDimensions] = useState<Dimension[]>([]);
  const [dimensionsWithFacets, setDimensionsWithFacets] = useState<DimensionWithFacets[]>([]);
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dimensionNames: { [key: string]: string } = {
    openness: "Abertura",
    conscientiousness: "Conscienciosidade",
    extraversion: "Extroversão",
    agreeableness: "Amabilidade",
    neuroticism: "Neuroticismo",
  };

  const dimensionCodes: { [key: string]: string } = {
    openness: "O",
    conscientiousness: "C",
    extraversion: "E",
    agreeableness: "A",
    neuroticism: "N",
  };

  useEffect(() => {
    // Check authentication
    setIsAuthenticated(authService.isAuthenticated());

    loadResult();
    loadDimensions();
  }, [id]);

  const loadResult = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/personality-tests/bigfive/results/${id}`);

      // Transform backend response to match our interface
      const transformedResult = {
        id: response.data.id,
        userId: response.data.userId,
        scores: {
          openness: response.data.opennessScore,
          conscientiousness: response.data.conscientiousnessScore,
          extraversion: response.data.extraversionScore,
          agreeableness: response.data.agreeablenessScore,
          neuroticism: response.data.neuroticismScore,
        },
        facetScores: response.data.facetScores, // NEW: Get facet scores from backend
        interpretations: {},
        percentiles: {},
        createdAt: response.data.createdAt,
        completionTimeSeconds: response.data.completionTimeSeconds,
      };

      // Calculate interpretations and percentiles
      Object.keys(transformedResult.scores).forEach((key) => {
        const score = transformedResult.scores[key as keyof BigFiveScores];
        transformedResult.interpretations[key] = getInterpretation(score);
        transformedResult.percentiles[key] = getPercentile(score);
      });

      setResult(transformedResult);

      // Load facets with interpretations if we have facet scores
      if (transformedResult.facetScores) {
        await loadFacetsWithInterpretations(transformedResult.id);
      }

      // Load career recommendations (Phase 3)
      await loadCareerRecommendations(transformedResult.id);
    } catch (error) {
      console.error("Error loading result:", error);
      toast.error("Erro ao carregar resultado");
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const loadDimensions = async () => {
    try {
      const response = await axiosInstance.get("/personality-tests/bigfive/dimensions");
      setDimensions(response.data);
    } catch (error) {
      console.error("Error loading dimensions:", error);
    }
  };

  const loadFacetsWithInterpretations = async (resultId: string) => {
    try {
      const response = await axiosInstance.get(
        `/personality-tests/bigfive/results/${resultId}/facets?lang=pt`
      );
      setDimensionsWithFacets(response.data);
    } catch (error) {
      console.error("Error loading facets:", error);
      // Don't show error toast - facets are optional enhancement
    }
  };

  const loadCareerRecommendations = async (resultId: string) => {
    try {
      const response = await axiosInstance.get(
        `/personality-tests/bigfive/results/${resultId}/career-matches?lang=pt`
      );
      setCareerMatches(response.data);
    } catch (error) {
      console.error("Error loading career recommendations:", error);
      // Don't show error toast - careers are optional enhancement
    }
  };

  const getInterpretation = (score: number): "low" | "medium" | "high" => {
    if (score < 40) return "low";
    if (score > 60) return "high";
    return "medium";
  };

  const getPercentile = (score: number): number => {
    const mean = 50;
    const stdDev = 15;
    const zScore = (score - mean) / stdDev;

    if (zScore <= -2) return 2;
    if (zScore <= -1.5) return 7;
    if (zScore <= -1) return 16;
    if (zScore <= -0.5) return 31;
    if (zScore <= 0) return 50;
    if (zScore <= 0.5) return 69;
    if (zScore <= 1) return 84;
    if (zScore <= 1.5) return 93;
    if (zScore <= 2) return 98;
    return 99;
  };

  const getDimensionInfo = (dimensionKey: string): Dimension | undefined => {
    const code = dimensionCodes[dimensionKey];
    return dimensions.find((d) => d.code === code);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando resultado...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Resultado não encontrado</CardTitle>
            <CardDescription>
              Não foi possível encontrar o resultado do teste.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/dashboard")} className="w-full">
              Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare data for radar chart
  const radarData = Object.entries(result.scores).map(([key, value]) => ({
    dimension: dimensionNames[key],
    score: value,
    fullMark: 100,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Seu Perfil Big Five (OCEAN)</h1>
          <p className="text-muted-foreground">
            Seus resultados nas 5 grandes dimensões de personalidade
          </p>
        </div>

        {/* Radar Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Visão Geral das Dimensões
            </CardTitle>
            <CardDescription>
              Gráfico radar mostrando suas pontuações em cada dimensão
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Sua Pontuação"
                  dataKey="score"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <div className="grid gap-6 mb-6">
          {Object.entries(result.scores).map(([key, score]) => {
            const interpretation = result.interpretations[key];
            const percentile = result.percentiles[key];
            const dimensionInfo = getDimensionInfo(key);

            return (
              <Card key={key}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{dimensionNames[key]}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-purple-600">{score}</span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        interpretation === "high"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : interpretation === "low"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {interpretation === "high" ? "Alto" : interpretation === "low" ? "Baixo" : "Médio"}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Percentil {percentile}%
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  {dimensionInfo && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {interpretation === "high"
                        ? dimensionInfo.highDescriptionPt
                        : interpretation === "low"
                        ? dimensionInfo.lowDescriptionPt
                        : "Você apresenta características equilibradas nesta dimensão, combinando aspectos de ambos os extremos."}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* NEW: Facet Breakdown Section (Phase 2.4) */}
        {dimensionsWithFacets.length > 0 && (
          <div className="mb-6">
            <FacetBreakdownSection
              dimensionsWithFacets={dimensionsWithFacets}
              isAuthenticated={isAuthenticated}
            />
          </div>
        )}

        {/* NEW: Career Recommendations Section (Phase 3) */}
        {careerMatches.length > 0 && (
          <div className="mb-6">
            <CareerRecommendationsSection
              careerMatches={careerMatches}
              isAuthenticated={isAuthenticated}
            />
          </div>
        )}

        {/* Stats Card */}
        {result.completionTimeSeconds && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Estatísticas do Teste</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tempo de Conclusão</p>
                <p className="text-2xl font-bold">
                  {Math.floor(result.completionTimeSeconds / 60)}:{String(result.completionTimeSeconds % 60).padStart(2, "0")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Questões</p>
                <p className="text-2xl font-bold">60</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="text-sm font-medium">
                  {new Date(result.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Modelo</p>
                <p className="text-sm font-medium">Big Five OCEAN</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => navigate("/dashboard")} className="flex-1" size="lg">
            Ir para Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate("/")} className="flex-1" size="lg">
            <Home className="mr-2 h-5 w-5" />
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  );
}
