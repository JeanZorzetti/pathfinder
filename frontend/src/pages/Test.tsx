import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight, ArrowLeft, Check, Save, LogIn } from "lucide-react";
import { toast } from "sonner";
import QuestionPage from "@/components/personality-tests/QuestionPage";
import { LikertValue } from "@/components/personality-tests/LikertScale";
import {
  mbtiQuestions60,
  getQuestionsForPage,
  calculateMBTIFromLikert,
  LikertAnswer,
} from "@/data/mbti-questions-60";

const mbtiDescriptions: Record<string, { title: string; description: string }> = {
  INTJ: {
    title: "O Arquiteto",
    description: "Visionário estratégico com originalidade, motivação interna e determinação para realizar suas ideias e objetivos."
  },
  INTP: {
    title: "O Lógico",
    description: "Pensador inovador com sede insaciável de conhecimento e compreensão dos sistemas complexos."
  },
  ENTJ: {
    title: "O Comandante",
    description: "Líder nato, ousado, imaginativo e com forte determinação, sempre encontra ou cria soluções."
  },
  ENTP: {
    title: "O Inovador",
    description: "Pensador curioso e inteligente, incapaz de resistir a um desafio intelectual."
  },
  INFJ: {
    title: "O Advogado",
    description: "Idealista silencioso e místico, mas inspirador e incansável em busca de seus valores."
  },
  INFP: {
    title: "O Mediador",
    description: "Altruísta poético e gentil, sempre disposto a ajudar uma boa causa."
  },
  ENFJ: {
    title: "O Protagonista",
    description: "Líder carismático e inspirador, capaz de fascinar seus ouvintes com sua energia."
  },
  ENFP: {
    title: "O Ativista",
    description: "Espírito livre entusiasta, criativo e sociável, sempre encontra razões para sorrir."
  },
  ISTJ: {
    title: "O Logístico",
    description: "Indivíduo prático e factual, com confiabilidade que não pode ser duvidada."
  },
  ISFJ: {
    title: "O Defensor",
    description: "Protetor dedicado e caloroso, sempre pronto para defender seus entes queridos."
  },
  ESTJ: {
    title: "O Executivo",
    description: "Administrador excelente, incomparável em gerenciar coisas e pessoas."
  },
  ESFJ: {
    title: "O Cônsul",
    description: "Pessoa extraordinariamente atenciosa, sociável e popular, sempre disposta a ajudar."
  },
  ISTP: {
    title: "O Virtuoso",
    description: "Experimentador ousado e prático, mestre de todos os tipos de ferramentas."
  },
  ISFP: {
    title: "O Aventureiro",
    description: "Artista flexível e charmoso, sempre pronto para explorar e experimentar algo novo."
  },
  ESTP: {
    title: "O Empreendedor",
    description: "Pessoa esperta, energética e muito perceptiva, que realmente aproveita viver no limite."
  },
  ESFP: {
    title: "O Animador",
    description: "Artista espontâneo, energético e entusiasta que nunca deixa a vida ficar chata."
  },
};

const TOTAL_PAGES = 6;
const QUESTIONS_PER_PAGE = 10;
const TOTAL_QUESTIONS = 60;
const STORAGE_KEY = 'mbti_test_progress';
const RESULT_KEY = 'mbti_test_result';

const Test = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<Record<number, LikertValue>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [result, setResult] = useState<{
    type: string;
    percentages: { EI: number; SN: number; TF: number; JP: number };
    scores: any;
  } | null>(null);

  // Load saved progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        const { answers: savedAnswers, page } = JSON.parse(savedProgress);
        setAnswers(savedAnswers);
        setCurrentPage(page);
        toast.success("Progresso anterior recuperado!");
      } catch (error) {
        console.error("Error loading saved progress:", error);
      }
    }

    // Check for saved result
    const savedResult = localStorage.getItem(RESULT_KEY);
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        setResult(parsedResult);
        setShowResult(true);
      } catch (error) {
        console.error("Error loading saved result:", error);
      }
    }
  }, []);

  // Save progress to localStorage whenever answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        answers,
        page: currentPage,
        timestamp: new Date().toISOString()
      }));
    }
  }, [answers, currentPage]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const currentQuestions = getQuestionsForPage(currentPage);

  // Check if current page is complete
  const isPageComplete = currentQuestions.every(
    (q) => answers[q.id] !== null && answers[q.id] !== undefined
  );

  // Count answered questions
  const answeredCount = Object.values(answers).filter(
    (v) => v !== null && v !== undefined
  ).length;

  const progress = (answeredCount / TOTAL_QUESTIONS) * 100;

  const handleAnswerChange = (questionId: number, value: Exclude<LikertValue, null>) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    // NO LOGIN REQUIRED - Guest users can see results immediately
    if (answeredCount < TOTAL_QUESTIONS) {
      toast.error("Por favor, responda todas as questões antes de finalizar");
      return;
    }

    setIsSubmitting(true);

    // Convert answers to LikertAnswer format
    const likertAnswers: LikertAnswer[] = Object.entries(answers)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([questionId, value]) => ({
        questionId: parseInt(questionId),
        value: value as Exclude<LikertValue, null>,
      }));

    const calculatedResult = calculateMBTIFromLikert(likertAnswers);
    setResult(calculatedResult);

    // Save result to localStorage
    localStorage.setItem(RESULT_KEY, JSON.stringify(calculatedResult));

    setIsSubmitting(false);
    setShowResult(true);

    toast.success("Resultado calculado! Veja abaixo.");
  };

  const handleSaveToProfile = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para salvar no perfil");
      navigate("/auth?redirect=/test/mbti");
      return;
    }

    if (!result) return;

    setIsSubmitting(true);

    const { error } = await supabase.from("test_results").insert({
      user_id: user.id,
      test_type: "mbti",
      result_data: {
        type: result.type,
        scores: result.scores,
        percentages: result.percentages,
        ...mbtiDescriptions[result.type],
        answers: answers,
      },
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Erro ao salvar resultado");
      console.error("Error saving result:", error);
      return;
    }

    setIsSaved(true);
    // Clear localStorage after saving
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(RESULT_KEY);
    toast.success("Resultado salvo no seu perfil!");
  };

  const handleStartNew = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(RESULT_KEY);
    window.location.reload();
  };

  // Result page
  if (showResult && result) {
    const resultInfo = mbtiDescriptions[result.type];
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4 py-12">
        <Card className="max-w-3xl w-full shadow-elegant">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-4xl mb-2 gradient-text">{result.type}</CardTitle>
            <CardDescription className="text-xl">{resultInfo.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-lg text-center leading-relaxed">{resultInfo.description}</p>

            {/* Preference strengths */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Força das Preferências</h3>
              <div className="grid gap-4">
                {/* E vs I */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Extroversão (E)</span>
                    <span>{result.percentages.EI}%</span>
                    <span>Introversão (I)</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${result.percentages.EI}%` }}
                    />
                  </div>
                </div>

                {/* S vs N */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Sensação (S)</span>
                    <span>{result.percentages.SN}%</span>
                    <span>Intuição (N)</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-yellow-500 transition-all duration-500"
                      style={{ width: `${result.percentages.SN}%` }}
                    />
                  </div>
                </div>

                {/* T vs F */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Pensamento (T)</span>
                    <span>{result.percentages.TF}%</span>
                    <span>Sentimento (F)</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-500"
                      style={{ width: `${result.percentages.TF}%` }}
                    />
                  </div>
                </div>

                {/* J vs P */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Julgamento (J)</span>
                    <span>{result.percentages.JP}%</span>
                    <span>Percepção (P)</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-orange-500 transition-all duration-500"
                      style={{ width: `${result.percentages.JP}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            {!isSaved && !user && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <p className="text-sm font-medium">
                      💾 Quer salvar seu resultado e acessar depois?
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Crie uma conta gratuita para salvar todos os seus resultados!
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-3 justify-center flex-wrap">
              {user && !isSaved && (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleSaveToProfile}
                  disabled={isSubmitting}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Salvando..." : "Salvar no Perfil"}
                </Button>
              )}

              {!user && (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => navigate("/auth?redirect=/test/mbti")}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Criar Conta / Login
                </Button>
              )}

              {user && isSaved && (
                <Button variant="hero" size="lg" onClick={() => navigate("/dashboard")}>
                  Ver Dashboard
                </Button>
              )}

              <Button variant="outline" size="lg" onClick={handleStartNew}>
                Refazer Teste
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Test page
  return (
    <div className="min-h-screen bg-gradient-subtle px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with progress */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                <span className="font-semibold">Teste MBTI Completo</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Página {currentPage} de {TOTAL_PAGES}
              </span>
            </div>

            <Progress value={progress} className="h-3" />

            <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
              <span>{answeredCount} de {TOTAL_QUESTIONS} questões respondidas</span>
              <span>{Math.round(progress)}%</span>
            </div>

            {answeredCount > 0 && (
              <p className="text-xs text-center text-muted-foreground mt-2">
                💾 Seu progresso é salvo automaticamente
              </p>
            )}
          </CardHeader>
        </Card>

        {/* Questions */}
        <QuestionPage
          questions={currentQuestions}
          answers={answers}
          onAnswerChange={handleAnswerChange}
        />

        {/* Navigation */}
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            {/* Page indicators */}
            <div className="flex justify-center gap-2 mb-6">
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => {
                const pageQuestions = getQuestionsForPage(page);
                const isPageAnswered = pageQuestions.every(
                  (q) => answers[q.id] !== null && answers[q.id] !== undefined
                );

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full font-medium transition-all duration-200 ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground shadow-lg scale-110"
                        : isPageAnswered
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    aria-label={`Ir para página ${page}`}
                  >
                    {isPageAnswered && currentPage !== page ? (
                      <Check className="w-4 h-4 mx-auto" />
                    ) : (
                      page
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>

              <div className="text-sm text-muted-foreground">
                {!isPageComplete && currentPage < TOTAL_PAGES && (
                  <span className="text-amber-600">
                    Complete todas as questões para continuar
                  </span>
                )}
              </div>

              {currentPage === TOTAL_PAGES ? (
                <Button
                  variant="hero"
                  onClick={handleSubmit}
                  disabled={answeredCount < TOTAL_QUESTIONS || isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? "Processando..." : "Ver Resultado"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isPageComplete}
                  size="lg"
                >
                  Próxima
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Test;
