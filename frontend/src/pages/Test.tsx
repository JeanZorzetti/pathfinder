import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { SEOHead } from "@/components/SEOHead";
import QuestionPage from "@/components/personality-tests/QuestionPage";
import { LikertValue } from "@/components/personality-tests/LikertScale";
import {
  mbtiQuestions60,
  getQuestionsForPage,
  calculateMBTIFromLikert,
  LikertAnswer,
} from "@/data/mbti-questions-60";

const TOTAL_PAGES = 6;
const QUESTIONS_PER_PAGE = 10;
const TOTAL_QUESTIONS = 60;
const STORAGE_KEY = 'mbti_test_progress';
const RESULT_KEY = 'mbti_test_result';

const Test = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<Record<number, LikertValue>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // DEBUG: Auto-fill test with random answers
  const handleDebugAutoFill = () => {
    const newAnswers: Record<number, LikertValue> = {};
    mbtiQuestions60.forEach((q) => {
      // Random value between -2 and 2
      const values: Exclude<LikertValue, null>[] = [-2, -1, 0, 1, 2];
      newAnswers[q.id] = values[Math.floor(Math.random() * values.length)];
    });
    setAnswers(newAnswers);
    toast.success("🔧 Teste preenchido automaticamente (DEBUG)");
  };

  const handleSubmit = async () => {
    if (answeredCount < TOTAL_QUESTIONS) {
      toast.error("Por favor, responda todas as questões antes de finalizar");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert answers to LikertAnswer format
      const likertAnswers: LikertAnswer[] = Object.entries(answers)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([questionId, value]) => ({
          questionId: parseInt(questionId),
          value: value as Exclude<LikertValue, null>,
        }));

      const calculatedResult = calculateMBTIFromLikert(likertAnswers);

      // If user is authenticated, save to backend immediately
      if (isAuthenticated) {
        console.log('🔐 User is authenticated, saving to backend...');
        console.log('📊 Result data:', calculatedResult);
        try {
          const response = await api.saveCalculatedTestResult({
            framework: 'mbti',
            typeCode: calculatedResult.type,
            resultData: calculatedResult,
          });

          console.log('✅ Backend save successful:', response);
          toast.success("✅ Resultado calculado e salvo no seu perfil!");

          // Clear localStorage since it's saved in backend
          localStorage.removeItem(RESULT_KEY);
          localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
          console.error('❌ Error saving to backend:', error);
          console.error('Error details:', error instanceof Error ? error.message : error);
          // Fallback: save to localStorage if backend fails
          localStorage.setItem(RESULT_KEY, JSON.stringify(calculatedResult));
          toast.error("Erro ao salvar no backend. Resultado salvo localmente.");
        }
      } else {
        console.log('👤 Guest user, saving to localStorage');
        // Guest user: save to localStorage for later
        localStorage.setItem(RESULT_KEY, JSON.stringify(calculatedResult));
        toast.success("Resultado calculado! Redirecionando...");
      }

      // Redirect to the result page
      navigate(`/results/mbti/${calculatedResult.type.toLowerCase()}`);
    } catch (error) {
      console.error('Error submitting test:', error);
      toast.error("Erro ao processar resultado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Test page
  return (
    <>
      <SEOHead
        title="Teste MBTI Online Gratuito - 60 Questões | Pathfinder"
        description="Descubra seu tipo de personalidade MBTI com nosso teste gratuito de 60 questões. Científico, preciso e completo. Resultados instantâneos com análise detalhada."
        keywords="teste MBTI online, teste de personalidade gratuito, MBTI grátis, teste psicológico, 16 personalidades"
        canonicalUrl="https://pathfinder.roilabs.com.br/test/mbti"
      />
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

            {/* DEBUG: Auto-fill button */}
            <div className="mt-4 text-center">
              <button
                onClick={handleDebugAutoFill}
                className="text-xs px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition"
              >
                🔧 DEBUG: Auto-preencher teste
              </button>
            </div>
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
    </>
  );
};

export default Test;
