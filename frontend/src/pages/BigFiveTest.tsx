import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { axiosInstance } from "@/lib/api";
import { toast } from "sonner";

interface BigFiveQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  questionTextPt: string;
  dimensionCode: string;
  isReversed: boolean;
  orderIndex: number;
}

interface Answer {
  questionId: string;
  answer: number;
}

export default function BigFiveTest() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [questions, setQuestions] = useState<BigFiveQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime] = useState(Date.now());

  // Likert scale labels
  const scaleLabels = [
    "Discordo totalmente",
    "Discordo",
    "Neutro",
    "Concordo",
    "Concordo totalmente",
  ];

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/auth");
      return;
    }

    if (isAuthenticated) {
      loadQuestions();
    }
  }, [authLoading, isAuthenticated, navigate]);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/personality-tests/bigfive/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error loading questions:", error);
      toast.error("Erro ao carregar questões. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (value: number) => {
    const currentQuestion = questions[currentQuestionIndex];

    // Update or add answer
    const existingAnswerIndex = answers.findIndex(
      (a) => a.questionId === currentQuestion.id
    );

    if (existingAnswerIndex >= 0) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        questionId: currentQuestion.id,
        answer: value,
      };
      setAnswers(updatedAnswers);
    } else {
      setAnswers([...answers, { questionId: currentQuestion.id, answer: value }]);
    }
  };

  const getCurrentAnswer = (): number | null => {
    const currentQuestion = questions[currentQuestionIndex];
    const answer = answers.find((a) => a.questionId === currentQuestion.id);
    return answer ? answer.answer : null;
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.length !== 60) {
      toast.error("Por favor, responda todas as 60 questões antes de finalizar.");
      return;
    }

    try {
      setIsSubmitting(true);
      const completionTimeSeconds = Math.floor((Date.now() - startTime) / 1000);

      const response = await axiosInstance.post("/personality-tests/bigfive/calculate", {
        answers,
        completionTimeSeconds,
      });

      toast.success("Teste concluído com sucesso!");

      // Navigate to results page with the result ID
      navigate(`/bigfive-result/${response.data.id}`);
    } catch (error: any) {
      console.error("Error submitting test:", error);
      toast.error(
        error.response?.data?.message || "Erro ao processar teste. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando teste...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Erro</CardTitle>
            <CardDescription>
              Não foi possível carregar as questões do teste.
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

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentAnswer = getCurrentAnswer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Teste Big Five (OCEAN)</h1>
          <p className="text-muted-foreground">
            Descubra suas 5 grandes dimensões de personalidade
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  Questão {currentQuestionIndex + 1} de {questions.length}
                </span>
                <span className="text-muted-foreground">
                  {Math.round(progress)}% completo
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Respondidas: {answers.length}/60</span>
                <span>
                  Dimensão:{" "}
                  {currentQuestion.dimensionCode === "O" && "Abertura"}
                  {currentQuestion.dimensionCode === "C" && "Conscienciosidade"}
                  {currentQuestion.dimensionCode === "E" && "Extroversão"}
                  {currentQuestion.dimensionCode === "A" && "Amabilidade"}
                  {currentQuestion.dimensionCode === "N" && "Neuroticismo"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion.questionTextPt}
            </CardTitle>
            <CardDescription className="text-sm italic">
              {currentQuestion.questionText}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    currentAnswer === value
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{scaleLabels[value - 1]}</span>
                    {currentAnswer === value && (
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>

          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={answers.length !== 60 || isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                "Finalizar Teste"
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={currentAnswer === null}
              className="flex-1"
            >
              Próxima
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Helper text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Responda com honestidade. Não há respostas certas ou erradas.
        </p>
      </div>
    </div>
  );
}
