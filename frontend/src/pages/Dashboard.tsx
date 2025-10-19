import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, LogOut, BookOpen, Flame, Calendar } from "lucide-react";
import { toast } from "sonner";
import { DailyInsightCard } from "@/components/DailyInsightCard";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { JourneyCard } from "@/components/dashboard/JourneyCard";
import { WeeklyChallengeCard } from "@/components/dashboard/WeeklyChallengeCard";
import { ContentRecommendationCard } from "@/components/dashboard/ContentRecommendationCard";
import { ComparisonCard } from "@/components/dashboard/ComparisonCard";
import { getColorScheme, getMBTINickname } from "@/data/mbti-colors";
import { getRandomContentForType } from "@/data/contentLibrary";
import { getDailyPrompt } from "@/data/journalPrompts";
import { Content } from "@/types/content";
import { Achievement } from "@/types/gamification";
import { WeeklyChallenge } from "@/types/challenges";

interface DashboardData {
  profile: {
    id: string;
    email: string;
    fullName: string | null;
    mbtiType: string | null;
    createdAt: string;
    metadata: {
      xp?: number;
      level?: number;
      achievements?: Achievement[];
      streak_current?: number;
      streak_longest?: number;
      last_visit?: string;
      consumed_content?: string[];
    };
  };
  testResults: Array<{
    id: string;
    framework: string;
    typeCode: string;
    completedAt: string;
    resultData: any;
  }>;
  currentChallenge: WeeklyChallenge | null;
  dailyInsight: {
    text: string;
    category: string;
  } | null;
  stats: {
    xp: number;
    level: number;
    streak: {
      current: number;
      longest: number;
    };
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [comparisonCode, setComparisonCode] = useState<string | null>(null);
  const [recommendedContent, setRecommendedContent] = useState<Content[]>([]);
  const [availableAchievements, setAvailableAchievements] = useState<Achievement[]>([]);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Load dashboard data
  useEffect(() => {
    if (isAuthenticated && user) {
      loadDashboard();
    }
  }, [isAuthenticated, user]);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      // Fetch complete dashboard data from backend
      const response = await api.getDashboard();
      const data = response.data as DashboardData;

      setDashboardData(data);

      // Load recommended content if we have MBTI type
      if (data.profile.mbtiType) {
        const content = getRandomContentForType(data.profile.mbtiType, 4);
        setRecommendedContent(content);

        // Load comparison code
        try {
          const codeResponse = await api.getComparisonCode();
          // API returns { data: { code: "INTJ-XXX" } } due to axios wrapper
          const code = codeResponse.data?.code || codeResponse.code;
          if (code) {
            setComparisonCode(code);
          }
        } catch (error) {
          console.warn('Comparison code not available:', error);
        }

        // Load available achievements from backend
        try {
          const achievementsResponse = await api.getUserAchievements();
          // api.getUserAchievements() already returns the data directly (not wrapped in .data)
          if (achievementsResponse.available) {
            // Map backend achievements to frontend Achievement type
            const mappedAchievements = achievementsResponse.available.map((ach: any) => ({
              id: ach.achievementId || ach.id,
              title: ach.title,
              description: ach.description,
              icon: ach.icon,
              category: 'universal',
              xpReward: ach.xpReward,
              rarity: ach.rarity,
              progress: { current: 0, total: ach.requirementValue || 1 },
              unlockedAt: undefined, // Available achievements are not unlocked yet
            }));
            setAvailableAchievements(mappedAchievements);
          }
        } catch (error) {
          console.warn('Achievements not available:', error);
        }
      }

      toast.success('Dashboard carregado com sucesso!');
    } catch (error: any) {
      console.error('Error loading dashboard:', error);
      toast.error(error.response?.data?.message || 'Erro ao carregar dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkChallengeComplete = async (dayIndex: number) => {
    try {
      await api.completeChallengeDay(dayIndex);
      toast.success('✓ Dia marcado como completo!');
      // Reload dashboard to get updated challenge
      loadDashboard();
    } catch (error: any) {
      console.error('Error marking challenge complete:', error);
      toast.error(error.response?.data?.message || 'Erro ao marcar desafio');
    }
  };

  const handleMarkContentConsumed = async (contentId: string) => {
    try {
      // Find the content to get XP reward
      const content = recommendedContent.find((c) => c.id === contentId);
      if (!content) return;

      // Add XP via API
      await api.addXP('content_consumed', content.xpReward);

      // Update consumed content in metadata
      const consumedContent = dashboardData?.profile.metadata.consumed_content || [];
      await api.updateUserProfile({
        metadata: {
          ...dashboardData?.profile.metadata,
          consumed_content: [...consumedContent, contentId],
        } as any,
      });

      toast.success(`+${content.xpReward} XP`, {
        description: 'Conteúdo marcado como concluído',
      });

      // Reload dashboard
      loadDashboard();
    } catch (error: any) {
      console.error('Error marking content consumed:', error);
      toast.error(error.response?.data?.message || 'Erro ao marcar conteúdo');
    }
  };

  const handleCompare = async (otherCode: string) => {
    try {
      const response = await api.compareWith(otherCode);
      toast.success('Comparação realizada!');
      console.log('Comparison result:', response.data);
      // TODO: Navigate to comparison result page or show in modal
    } catch (error: any) {
      console.error('Error comparing:', error);
      toast.error(error.response?.data?.message || 'Erro ao comparar');
    }
  };

  const handleSignOut = () => {
    logout();
    toast.success('Logout realizado com sucesso');
    navigate('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <Brain className="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Erro ao carregar dashboard</p>
          <Button onClick={loadDashboard}>Tentar Novamente</Button>
        </div>
      </div>
    );
  }

  const { profile, testResults, currentChallenge, dailyInsight, stats } = dashboardData;
  const mbtiType = profile.mbtiType;
  // Use available achievements from state (loaded from backend)
  const achievements = availableAchievements.length > 0 ? availableAchievements : [];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg gradient-text">Pathfinder</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-8 space-y-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Bem-vindo de volta, {profile.fullName || 'Buscador'}! 👋
            </h1>
            {mbtiType && (
              <div className="flex items-center gap-3 flex-wrap">
                <Badge
                  className="text-base px-4 py-1"
                  style={{
                    backgroundColor: getColorScheme(mbtiType).primary,
                    color: getColorScheme(mbtiType).contrast,
                  }}
                >
                  {mbtiType} - {getMBTINickname(mbtiType)}
                </Badge>
                {stats.streak.current > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold">
                      {stats.streak.current} {stats.streak.current === 1 ? 'dia' : 'dias'}
                    </span>
                  </div>
                )}
                {profile.createdAt && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Membro desde{' '}
                      {new Date(profile.createdAt).toLocaleDateString('pt-BR', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-lg">
            Continue sua jornada de autoconhecimento
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Daily Insight */}
          {dailyInsight && mbtiType && (
            <DailyInsightCard
              insight={{
                insight_text: dailyInsight.text,
                category: dailyInsight.category,
                personality_type: mbtiType,
              }}
              mbtiType={mbtiType}
            />
          )}

          {/* Profile Card - MBTI */}
          {mbtiType && (
            <ProfileCard
              mbtiType={mbtiType}
              nickname={getMBTINickname(mbtiType)}
              colorScheme={getColorScheme(mbtiType)}
            />
          )}

          {/* Journey Card - Gamification */}
          <JourneyCard
            xp={stats.xp}
            achievements={achievements}
            onViewAll={() => {
              toast.info('Página de conquistas em desenvolvimento');
            }}
          />

          {/* Weekly Challenge */}
          {currentChallenge && mbtiType && (
            <WeeklyChallengeCard
              challenge={currentChallenge}
              onMarkComplete={handleMarkChallengeComplete}
              isProcessing={false}
            />
          )}

          {/* Test Results */}
          <Card
            className="shadow-sm"
            style={
              mbtiType ? { borderLeft: `4px solid ${getColorScheme(mbtiType).primary}` } : {}
            }
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Meus Resultados
              </CardTitle>
              <CardDescription>
                {testResults.length === 0
                  ? 'Nenhum teste realizado ainda'
                  : `${testResults.length} teste(s) concluído(s)`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Comece sua jornada fazendo seu primeiro teste de personalidade
                  </p>
                  <Button onClick={() => navigate('/test/mbti')} variant="hero">
                    Fazer Teste MBTI
                  </Button>
                </div>
              ) : (
                <>
                  {/* MBTI Result - Featured */}
                  {mbtiType && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                            style={{ backgroundColor: getColorScheme(mbtiType).primary }}
                          >
                            {mbtiType}
                          </div>
                          <div>
                            <p className="font-bold text-lg">{mbtiType}</p>
                            <p className="text-sm text-muted-foreground">
                              {getMBTINickname(mbtiType)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Completado em{' '}
                              {new Date(
                                testResults.find((r) => r.framework === 'mbti')
                                  ?.completedAt || ''
                              ).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/result/mbti/${mbtiType}`)}
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Progress - Outros Testes */}
                  <div className="pt-3 border-t space-y-2">
                    <p className="text-sm font-semibold">Complete sua jornada:</p>
                    <div className="flex gap-2 flex-wrap">
                      {testResults.some((r) => r.framework === 'mbti') ? (
                        <Badge variant="default" className="flex items-center gap-1">
                          ✓ MBTI
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-accent"
                          onClick={() => navigate('/test/mbti')}
                        >
                          MBTI
                        </Badge>
                      )}
                      <Badge variant="outline" className="opacity-50">
                        Eneagrama (Em breve)
                      </Badge>
                      <Badge variant="outline" className="opacity-50">
                        Big Five (Em breve)
                      </Badge>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Journal */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Diário
              </CardTitle>
              <CardDescription>Registre seus pensamentos e reflexões</CardDescription>
            </CardHeader>
            <CardContent>
              {mbtiType && getDailyPrompt(mbtiType) && (
                <div className="mb-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <span className="text-lg">💭</span>
                    Prompt de Hoje para {mbtiType}:
                  </p>
                  <p className="text-sm italic text-muted-foreground">
                    "{getDailyPrompt(mbtiType)?.prompt}"
                  </p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {getDailyPrompt(mbtiType)?.category === 'reflection' && '🪞 Reflexão'}
                    {getDailyPrompt(mbtiType)?.category === 'growth' && '🌱 Crescimento'}
                    {getDailyPrompt(mbtiType)?.category === 'emotions' && '💙 Emoções'}
                    {getDailyPrompt(mbtiType)?.category === 'relationships' &&
                      '🤝 Relacionamentos'}
                    {getDailyPrompt(mbtiType)?.category === 'goals' && '🎯 Objetivos'}
                  </Badge>
                </div>
              )}
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-4 text-sm">
                  Um espaço seguro para suas reflexões diárias
                </p>
                <Button onClick={() => navigate('/journal')} className="w-full">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Escrever Reflexão (+10 XP)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content Recommendation */}
          {mbtiType && recommendedContent.length > 0 && (
            <ContentRecommendationCard
              content={recommendedContent}
              onContentClick={(content) => console.log('Content viewed:', content.title)}
              onMarkConsumed={handleMarkContentConsumed}
            />
          )}

          {/* Comparison */}
          {mbtiType && comparisonCode && (
            <ComparisonCard
              userCode={comparisonCode}
              userMbtiType={mbtiType}
              onCompare={handleCompare}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
