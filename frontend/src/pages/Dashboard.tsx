import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, LogOut, BookOpen, Flame, Calendar } from "lucide-react";
import { toast } from "sonner";
import { DailyInsightCard } from "@/components/DailyInsightCard";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { JourneyCard } from "@/components/dashboard/JourneyCard";
import { WeeklyChallengeCard } from "@/components/dashboard/WeeklyChallengeCard";
import { TestResult, DailyInsight, Profile } from "@/types/database";
import { calculateStreak, formatStreak } from "@/utils/streakCalculator";
import { getColorScheme, getMBTINickname } from "@/data/mbti-colors";
import { Achievement } from "@/types/gamification";
import { getAchievementsForType } from "@/data/achievements";
import { useXP } from "@/hooks/useXP";
import { WeeklyChallenge, shouldCreateNewChallenge, getCurrentWeekdayIndex } from "@/types/challenges";
import { selectWeeklyChallenge, createWeeklyChallengeFromTemplate } from "@/data/weeklyChallenges";
import { getDailyPrompt } from "@/data/journalPrompts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [dailyInsight, setDailyInsight] = useState<DailyInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  const [streak, setStreak] = useState<{ current: number; longest: number }>({ current: 0, longest: 0 });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<WeeklyChallenge | null>(null);
  const [isChallengeProcessing, setIsChallengeProcessing] = useState(false);
  const { addXP } = useXP();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      } else {
        loadDashboardData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadDashboardData = async (userId: string) => {
    setLoading(true);

    // Load profile data
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single() as { data: Profile | null };

    if (profileData) {
      setProfile(profileData);

      // Calculate and update streak
      const calculatedStreak = calculateStreak(
        profileData.last_visit,
        profileData.visit_history
      );
      setStreak(calculatedStreak);

      // Initialize XP and level if not set
      const currentXP = profileData.xp || 0;
      const currentLevel = profileData.level || 1;

      // Update last visit and streak in database
      const now = new Date().toISOString();
      const updatedVisitHistory = [
        ...(profileData.visit_history || []),
        now
      ].slice(-30); // Keep last 30 visits

      await supabase
        .from("profiles")
        .update({
          last_visit: now,
          streak_current: calculatedStreak.current,
          streak_longest: calculatedStreak.longest,
          visit_history: updatedVisitHistory,
          xp: currentXP,
          level: currentLevel
        })
        .eq("id", userId);
    }

    // Load test results
    const { data: results } = await supabase
      .from("test_results")
      .select("*")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false }) as { data: TestResult[] | null };

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

            // Save to database
            await supabase
              .from("profiles")
              .update({ achievements: initialAchievements })
              .eq("id", userId);
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

              // Save to database
              await supabase
                .from("profiles")
                .update({ current_challenge: newChallenge })
                .eq("id", userId);
            }
          } else {
            setCurrentChallenge(storedChallenge);
          }
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
        // Get daily insight
        const { data: insights } = await supabase
          .from("daily_insights")
          .select("insight_text, category")
          .eq("personality_type", personalityKey) as { data: DailyInsight[] | null };
        
        if (insights && insights.length > 0) {
          // Use date as seed to get same insight throughout the day
          const today = new Date().toDateString();
          const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const dailyIndex = seed % insights.length;
          setDailyInsight(insights[dailyIndex]);
        }
      }
    }
    
    setLoading(false);
  };

  const handleMarkChallengeComplete = async () => {
    if (!currentChallenge || !user || !profile) return;

    setIsChallengeProcessing(true);

    try {
      const todayIndex = getCurrentWeekdayIndex();
      if (todayIndex === null) {
        toast.error("Desafios só podem ser marcados de segunda a sexta");
        return;
      }

      // Update days completed
      const updatedDays = [...currentChallenge.daysCompleted];
      updatedDays[todayIndex] = true;

      // Check if challenge is now complete (all 5 days)
      const isNowCompleted = updatedDays.every((day) => day === true);

      const updatedChallenge: WeeklyChallenge = {
        ...currentChallenge,
        daysCompleted: updatedDays,
        isCompleted: isNowCompleted,
      };

      setCurrentChallenge(updatedChallenge);

      // Prepare database updates
      const updates: any = {
        current_challenge: updatedChallenge,
      };

      // If completed, add to completed challenges and give XP + badge
      if (isNowCompleted) {
        const completedChallenges = profile.completed_challenges || [];
        updates.completed_challenges = [...completedChallenges, currentChallenge.id];

        // Add XP for challenge completion
        const newXP = (profile.xp || 0) + currentChallenge.xpReward;
        updates.xp = newXP;

        toast.success(`🎉 Desafio Completado!`, {
          description: `+${currentChallenge.xpReward} XP ${currentChallenge.badgeReward || ''}`,
        });

        // Update local profile state
        setProfile({ ...profile, xp: newXP, completed_challenges: updates.completed_challenges });
      } else {
        toast.success("✓ Dia marcado como completo!", {
          description: `${updatedDays.filter((d) => d).length}/5 dias completos`,
        });
      }

      // Save to database
      await supabase.from("profiles").update(updates).eq("id", user.id);
    } catch (error) {
      console.error("Error marking challenge complete:", error);
      toast.error("Erro ao marcar desafio. Tente novamente.");
    } finally {
      setIsChallengeProcessing(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
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

          {/* Test Results */}
          <Card className="shadow-sm">
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
            <CardContent className="space-y-3">
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
                testResults.map((result: any) => (
                  <div key={result.id} className="p-4 rounded-lg bg-accent/50 border border-accent">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                          {result.test_type === "mbti" ? "MBTI" : 
                           result.test_type === "bigfive" ? "Big Five" :
                           result.test_type === "enneagram" ? "Eneagrama" :
                           result.test_type}
                        </p>
                        <p className="text-xl font-bold gradient-text">
                          {result.test_type === "mbti" ? result.result_data.type :
                           result.test_type === "enneagram" ? `Tipo ${result.result_data.type}` :
                           result.test_type === "bigfive" ? "OCEAN" :
                           "Resultado"}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
