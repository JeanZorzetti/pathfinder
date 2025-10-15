import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, LogOut, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { DailyInsightCard } from "@/components/DailyInsightCard";
import { TestResult, DailyInsight } from "@/types/database";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [dailyInsight, setDailyInsight] = useState<DailyInsight | null>(null);
  const [loading, setLoading] = useState(true);

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo de volta, {user?.user_metadata?.full_name || "Buscador"}
          </h1>
          <p className="text-muted-foreground">
            Continue sua jornada de autoconhecimento
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Daily Insight */}
          {dailyInsight && <DailyInsightCard insight={dailyInsight} />}

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
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Um espaço seguro para suas reflexões diárias
                </p>
                <Button onClick={() => navigate("/journal")}>
                  Abrir Diário
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
