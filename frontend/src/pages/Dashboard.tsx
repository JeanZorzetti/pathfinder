import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboard, useChallenges, useComparison } from "@/hooks/useAPI";
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
import { TestResult, DailyInsight, Profile } from "@/types/database";
import { Content } from "@/types/content";
import { getRandomContentForType } from "@/data/contentLibrary";
import { generateComparisonCode } from "@/types/comparison";
import { calculateStreak, formatStreak } from "@/utils/streakCalculator";
import { getColorScheme, getMBTINickname } from "@/data/mbti-colors";
import { Achievement } from "@/types/gamification";
import { getAchievementsForType } from "@/data/achievements";
import { WeeklyChallenge, shouldCreateNewChallenge, getCurrentWeekdayIndex } from "@/types/challenges";
import { selectWeeklyChallenge, createWeeklyChallengeFromTemplate } from "@/data/weeklyChallenges";
import { getDailyPrompt } from "@/data/journalPrompts";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();

  // Local state management
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [streak, setStreak] = useState({ current: 0, longest: 0 });
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [dailyInsight, setDailyInsight] = useState<DailyInsight | null>(null);
  const [recommendedContent, setRecommendedContent] = useState<Content[]>([]);
  const [isChallengeProcessing, setIsChallengeProcessing] = useState(false);

  // API Hooks - auto-fetch dashboard data
  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError
  } = useDashboard();

  const {
    currentChallenge,
    loading: challengeLoading,
    error: challengeError,
    completeDay,
    getCurrentChallenge
  } = useChallenges();

  const {
    code: comparisonCode,
    loading: comparisonLoading,
    error: comparisonError,
    getCode
  } = useComparison();

  // Auth management
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate("/auth");
      } else {
        // Trigger API hooks to fetch data
        getCurrentChallenge();
        getCode();
      }
    }
  }, [authLoading, isAuthenticated, navigate, getCurrentChallenge, getCode]);

  const loadDashboardData = async (userId: string) => {
    setLoading(true);

    try {
      // Load profile data from API
      const profileResponse = await api.getUserProfile();
      const profileData = profileResponse.data as Profile;

      if (profileData) {
        setProfile(profileData);

        // Calculate and update streak
        const calculatedStreak = calculateStreak(
          profileData.last_visit,
          profileData.visit_history
        );
        setStreak(calculatedStreak);

        // Update last visit and streak in database via API
        const now = new Date().toISOString();
        const updatedVisitHistory = [
          ...(profileData.visit_history || []),
          now
        ].slice(-30); // Keep last 30 visits

        await api.updateUserProfile({
          last_visit: now,
          streak_current: calculatedStreak.current,
          streak_longest: calculatedStreak.longest,
          visit_history: updatedVisitHistory,
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Erro ao carregar perfil');
    }

    // Load test results from API
    try {
      const resultsResponse = await api.getMyTestResults();
      const results = resultsResponse.data as TestResult[];

      if (results) {
        setTestResults(results);
      
      // Determine personality type for insights
      let personalityKey = null;
      
      // Try MBTI first
      const mbtiResult = results.find((r) => r.test_type === "mbti");
      if (mbtiResult?.result_data) {
        personalityKey = (mbtiResult.result_data as any).type;
        setMbtiType(personalityKey); // Store MBTI type for ProfileCard

        // Initialize achievements for this type
        if (profileData) {
          const userAchievements = profileData.achievements || [];
          if (userAchievements.length === 0) {
            // First time - initialize achievements
            const initialAchievements = getAchievementsForType(personalityKey);
            setAchievements(initialAchievements);

            // Save to database via API
            await api.updateUserProfile({ achievements: initialAchievements });
          } else {
            setAchievements(userAchievements);
          }

          // Initialize or check weekly challenge
          const storedChallenge = profileData.current_challenge;
          const completedChallengeIds = profileData.completed_challenges || [];

          if (!storedChallenge || shouldCreateNewChallenge(storedChallenge.weekStartDate)) {
            // Create new weekly challenge
            const template = selectWeeklyChallenge(personalityKey, completedChallengeIds);
            if (template) {
              const newChallenge = createWeeklyChallengeFromTemplate(template);
              setCurrentChallenge(newChallenge);

              // Save to database via API
              await api.updateUserProfile({ current_challenge: newChallenge });
            }
          } else {
            setCurrentChallenge(storedChallenge);
          }

          // Sprint 4: Initialize comparison code (now using API hook)
          // Comparison code is managed by useComparison hook - just call getCode()
          if (!comparisonCode) {
            getCode();
          }

          // Sprint 4: Get recommended content
          const content = getRandomContentForType(personalityKey, 4);
          setRecommendedContent(content);
        }
      } else {
        // Try Enneagram
        const enneagramResult = results.find((r) => r.test_type === "enneagram");
        if (enneagramResult?.result_data) {
          const type = (enneagramResult.result_data as any).type;
          personalityKey = `enneagram_${type}`;
        } else {
          // Try Big Five (use dominant high trait)
          const bigFiveResult = results.find((r) => r.test_type === "bigfive");
          if (bigFiveResult?.result_data) {
            const scores = (bigFiveResult.result_data as any).scores;
            const highTraits = Object.entries(scores)
              .filter(([, data]: [string, any]) => data.level === 'High')
              .sort(([, a]: [string, any], [, b]: [string, any]) => b.score - a.score);
            
            if (highTraits.length > 0) {
              personalityKey = `bigfive_high_${highTraits[0][0]}`;
            }
          }
        }
      }
      
      if (personalityKey) {
        // Get daily insight from API
        try {
          const insightData = await api.getDailyInsight();
          if (insightData) {
            setDailyInsight({
              insight_text: insightData.text,
              category: insightData.category,
              personality_type: personalityKey
            } as DailyInsight);
          }
        } catch (error) {
          console.error('Error loading daily insight:', error);
          // Não mostrar erro para o usuário - insight é opcional
        }
      }
      }
    } catch (error) {
      console.error('Error loading test results:', error);
      toast.error('Erro ao carregar resultados de testes');
    }

    setLoading(false);
  };

  const handleMarkChallengeComplete = async () => {
    if (!currentChallenge || !user) return;

    try {
      const todayIndex = getCurrentWeekdayIndex();
      if (todayIndex === null) {
        toast.error("Desafios só podem ser marcados de segunda a sexta");
        return;
      }

      // Use API to complete day
      await completeDay(todayIndex);

      // Success toast is shown by the hook
      toast.success("✓ Dia marcado como completo!");

      // Reload challenge data
      getCurrentChallenge();
    } catch (error: any) {
      console.error("Error marking challenge complete:", error);
      toast.error(error.message || "Erro ao marcar desafio. Tente novamente.");
    }
  };

  const handleContentClick = (content: Content) => {
    // Track content view
    console.log('Content viewed:', content.title);
  };

  const handleMarkContentConsumed = async (contentId: string) => {
    if (!user || !profile) return;

    try {
      const consumedContent = profile.consumed_content || [];
      const updatedConsumed = [...consumedContent, contentId];

      // Find the content to get XP reward
      const content = recommendedContent.find((c) => c.id === contentId);
      if (content) {
        // Add XP via API (with proper source tracking)
        await api.addXP('content_consumed', content.xpReward);

        // Update consumed content via API
        await api.updateUserProfile({
          consumed_content: updatedConsumed,
        });

        // Update local state
        setProfile({ ...profile, xp: (profile.xp || 0) + content.xpReward, consumed_content: updatedConsumed });

        toast.success(`+${content.xpReward} XP`, {
          description: 'Conteúdo marcado como concluído',
        });
      }
    } catch (error) {
      console.error('Error marking content consumed:', error);
      toast.error('Erro ao marcar conteúdo');
    }
  };

  const handleCompare = (otherCode: string) => {
    // Track comparison
    console.log('Comparing with:', otherCode);
  };

  const handleSignOut = () => {
    logout();
    toast.success("Logout realizado com sucesso");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <Brain className="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

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
        {/* Hero Section - Enhanced */}
        <div className="mb-8 space-y-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Bem-vindo de volta, {user?.user_metadata?.full_name || profile?.full_name || "Buscador"}! 👋
            </h1>
            {mbtiType && (
              <div className="flex items-center gap-3 flex-wrap">
                <Badge
                  className="text-base px-4 py-1"
                  style={{
                    backgroundColor: getColorScheme(mbtiType).primary,
                    color: getColorScheme(mbtiType).contrast
                  }}
                >
                  {mbtiType} - {getMBTINickname(mbtiType)}
                </Badge>
                {streak.current > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold">{formatStreak(streak.current)}</span>
                  </div>
                )}
                {profile?.created_at && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Membro desde {new Date(profile.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
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
          {dailyInsight && <DailyInsightCard insight={dailyInsight} mbtiType={mbtiType} />}

          {/* Profile Card - MBTI */}
          {mbtiType && (
            <ProfileCard
              mbtiType={mbtiType}
              nickname={getMBTINickname(mbtiType)}
              colorScheme={getColorScheme(mbtiType)}
            />
          )}

          {/* Journey Card - Gamification */}
          {profile && (
            <JourneyCard
              xp={profile.xp || 0}
              achievements={achievements}
              onViewAll={() => {
                // TODO: Navigate to achievements page
                toast.info('Página de conquistas em desenvolvimento');
              }}
            />
          )}

          {/* Weekly Challenge - Sprint 3 */}
          {currentChallenge && mbtiType && (
            <WeeklyChallengeCard
              challenge={currentChallenge}
              onMarkComplete={handleMarkChallengeComplete}
              isProcessing={isChallengeProcessing}
            />
          )}

          {/* Test Results - Enhanced */}
          <Card
            className="shadow-sm"
            style={mbtiType ? { borderLeft: `4px solid ${getColorScheme(mbtiType).primary}` } : {}}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Meus Resultados
              </CardTitle>
              <CardDescription>
                {testResults.length === 0
                  ? "Nenhum teste realizado ainda"
                  : `${testResults.length} teste(s) concluído(s)`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Comece sua jornada fazendo seu primeiro teste de personalidade
                  </p>
                  <Button onClick={() => navigate("/test/mbti")} variant="hero">
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
                            <p className="text-sm text-muted-foreground">{getMBTINickname(mbtiType)}</p>
                            <p className="text-xs text-muted-foreground">
                              Completado em {new Date(testResults.find(r => r.test_type === "mbti")?.completed_at || '').toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/result/mbti/${mbtiType}`)}>
                          Ver Detalhes
                        </Button>
                      </div>

                      {/* Quick Stats - Top 3 Características */}
                      <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                        <div className="text-center p-2 rounded-lg bg-accent/30">
                          <p className="text-2xl mb-1">
                            {mbtiType.includes('E') && mbtiType.includes('T') && mbtiType.includes('J') ? '👔' :
                             mbtiType.includes('I') && mbtiType.includes('N') && mbtiType.includes('F') ? '💭' :
                             mbtiType.includes('E') && mbtiType.includes('N') && mbtiType.includes('F') ? '💫' :
                             mbtiType.includes('I') && mbtiType.includes('S') && mbtiType.includes('T') ? '🔧' :
                             mbtiType.includes('E') && mbtiType.includes('S') && mbtiType.includes('T') ? '⚡' :
                             mbtiType.includes('E') && mbtiType.includes('S') && mbtiType.includes('F') ? '🎉' :
                             mbtiType.includes('I') && mbtiType.includes('S') && mbtiType.includes('F') ? '🤝' :
                             mbtiType.includes('I') && mbtiType.includes('N') && mbtiType.includes('T') ? '🧠' :
                             '🎯'}
                          </p>
                          <p className="text-xs font-semibold">
                            {mbtiType.includes('E') && mbtiType.includes('T') && mbtiType.includes('J') ? 'Liderança' :
                             mbtiType.includes('I') && mbtiType.includes('N') && mbtiType.includes('F') ? 'Empatia' :
                             mbtiType.includes('E') && mbtiType.includes('N') && mbtiType.includes('F') ? 'Inspiração' :
                             mbtiType.includes('I') && mbtiType.includes('S') && mbtiType.includes('T') ? 'Prático' :
                             mbtiType.includes('E') && mbtiType.includes('S') && mbtiType.includes('T') ? 'Ação' :
                             mbtiType.includes('E') && mbtiType.includes('S') && mbtiType.includes('F') ? 'Energia' :
                             mbtiType.includes('I') && mbtiType.includes('S') && mbtiType.includes('F') ? 'Cuidado' :
                             mbtiType.includes('I') && mbtiType.includes('N') && mbtiType.includes('T') ? 'Estratégia' :
                             'Força 1'}
                          </p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-accent/30">
                          <p className="text-2xl mb-1">
                            {mbtiType.includes('J') ? '🎯' : mbtiType.includes('P') ? '🌟' : '📊'}
                          </p>
                          <p className="text-xs font-semibold">
                            {mbtiType.includes('J') ? 'Organização' : mbtiType.includes('P') ? 'Adaptação' : 'Análise'}
                          </p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-accent/30">
                          <p className="text-2xl mb-1">
                            {mbtiType.includes('N') ? '💡' : '🔍'}
                          </p>
                          <p className="text-xs font-semibold">
                            {mbtiType.includes('N') ? 'Visão' : 'Detalhe'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Progress - Outros Testes */}
                  <div className="pt-3 border-t space-y-2">
                    <p className="text-sm font-semibold">Complete sua jornada:</p>
                    <div className="flex gap-2 flex-wrap">
                      {testResults.some(r => r.test_type === "mbti") ? (
                        <Badge variant="default" className="flex items-center gap-1">
                          ✓ MBTI
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => navigate("/test/mbti")}>
                          MBTI
                        </Badge>
                      )}
                      {testResults.some(r => r.test_type === "enneagram") ? (
                        <Badge variant="default" className="flex items-center gap-1">
                          ✓ Eneagrama
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="opacity-50">
                          Eneagrama (Em breve)
                        </Badge>
                      )}
                      {testResults.some(r => r.test_type === "bigfive") ? (
                        <Badge variant="default" className="flex items-center gap-1">
                          ✓ Big Five
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="opacity-50">
                          Big Five (Em breve)
                        </Badge>
                      )}
                    </div>
                    {testResults.length < 3 && (
                      <p className="text-xs text-muted-foreground">
                        💡 Complete mais testes para desbloquear conquistas e insights mais profundos
                      </p>
                    )}
                  </div>

                  {/* Outros Resultados (se houver) */}
                  {testResults.filter(r => r.test_type !== "mbti").map((result: any) => (
                    <div key={result.id} className="p-3 rounded-lg bg-accent/50 border border-accent">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                            {result.test_type === "bigfive" ? "Big Five" :
                             result.test_type === "enneagram" ? "Eneagrama" :
                             result.test_type}
                          </p>
                          <p className="text-lg font-bold">
                            {result.test_type === "enneagram" ? `Tipo ${result.result_data.type}` :
                             result.test_type === "bigfive" ? "OCEAN" :
                             "Resultado"}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
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
              <CardDescription>
                Registre seus pensamentos e reflexões
              </CardDescription>
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
                    {getDailyPrompt(mbtiType)?.category === 'relationships' && '🤝 Relacionamentos'}
                    {getDailyPrompt(mbtiType)?.category === 'goals' && '🎯 Objetivos'}
                  </Badge>
                </div>
              )}
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-4 text-sm">
                  Um espaço seguro para suas reflexões diárias
                </p>
                <Button onClick={() => navigate("/journal")} className="w-full">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Escrever Reflexão (+10 XP)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content Recommendation - Sprint 4 */}
          {mbtiType && recommendedContent.length > 0 && (
            <ContentRecommendationCard
              content={recommendedContent}
              onContentClick={handleContentClick}
              onMarkConsumed={handleMarkContentConsumed}
            />
          )}

          {/* Comparison - Sprint 4 */}
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
