import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight, ArrowLeft, Home } from "lucide-react";
import { toast } from "sonner";
import { enneagramQuestions } from "@/data/enneagramQuestions";
import { enneagramTypes } from "@/data/enneagramData";

const EnneagramTest = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error("Você precisa estar logado para fazer o teste");
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });
  }, [navigate]);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      toast.error("Por favor, selecione uma resposta");
      return;
    }
    
    if (currentQuestion < enneagramQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const typeScores: Record<number, number> = {};
    
    // Inicializa scores
    for (let i = 1; i <= 9; i++) {
      typeScores[i] = 0;
    }

    // Calcula pontuação por tipo
    enneagramQuestions.forEach((q, index) => {
      typeScores[q.type] += answers[index];
    });

    // Encontra tipo dominante
    const dominantType = Object.entries(typeScores)
      .sort(([, a], [, b]) => b - a)[0][0];

    return {
      dominantType: parseInt(dominantType),
      scores: typeScores,
    };
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    const results = calculateResults();
    const typeData = enneagramTypes[results.dominantType];

    const { error } = await supabase.from("test_results").insert({
      user_id: user.id,
      test_type: "enneagram",
      result_data: {
        type: results.dominantType,
        scores: results.scores,
        typeData: typeData,
        answers: answers,
      },
    });

    if (error) {
      toast.error("Erro ao salvar resultado");
      setIsSubmitting(false);
    } else {
      toast.success("Teste concluído!");
      setResult({ ...results, typeData });
    }
  };

  const progress = ((currentQuestion + 1) / enneagramQuestions.length) * 100;
  const currentQ = enneagramQuestions[currentQuestion];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <Brain className="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

  if (result) {
    const { typeData } = result;

    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-primary-foreground">{result.dominantType}</span>
              </div>
              <CardTitle className="text-3xl mb-2">Tipo {result.dominantType} - {typeData.name}</CardTitle>
              <CardDescription className="text-lg">{typeData.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-lg bg-accent/30 border border-accent">
                <h3 className="font-bold text-lg mb-3">Descrição</h3>
                <p className="text-muted-foreground leading-relaxed">{typeData.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
                  <h3 className="font-bold text-lg mb-3 text-primary">Motivação Central</h3>
                  <p className="text-muted-foreground">{typeData.coreMotivation}</p>
                </div>

                <div className="p-6 rounded-lg bg-secondary/5 border border-secondary/20">
                  <h3 className="font-bold text-lg mb-3 text-secondary">Medo Central</h3>
                  <p className="text-muted-foreground">{typeData.coreFear}</p>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-accent/30 border border-accent">
                <h3 className="font-bold text-lg mb-3">Pontos Fortes</h3>
                <ul className="space-y-2">
                  {typeData.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-lg bg-accent/30 border border-accent">
                <h3 className="font-bold text-lg mb-3">Desafios</h3>
                <ul className="space-y-2">
                  {typeData.weaknesses.map((weakness, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span className="text-muted-foreground">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-lg bg-accent/30 border border-accent">
                <h3 className="font-bold text-lg mb-3">Caminho de Crescimento</h3>
                <ul className="space-y-2">
                  {typeData.growthPath.map((path, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span className="text-muted-foreground">{path}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => navigate("/dashboard")} className="flex-1">
                  Ver Dashboard
                </Button>
                <Button variant="outline" onClick={() => navigate("/")} className="flex-1">
                  <Home className="w-4 h-4 mr-2" />
                  Início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                Questão {currentQuestion + 1} de {enneagramQuestions.length}
              </span>
            </div>
            <CardTitle className="text-2xl">Teste de Eneagrama</CardTitle>
            <CardDescription>
              Avalie o quanto cada afirmação se aplica a você
            </CardDescription>
            <Progress value={progress} className="mt-4" />
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center py-6">
              <p className="text-lg font-medium mb-6">{currentQ.text}</p>

              <RadioGroup 
                value={answers[currentQuestion]?.toString()} 
                onValueChange={(value) => handleAnswer(parseInt(value))}
                className="space-y-3"
              >
                {[
                  { value: 1, label: "Não se aplica a mim" },
                  { value: 2, label: "Raramente se aplica" },
                  { value: 3, label: "Às vezes se aplica" },
                  { value: 4, label: "Frequentemente se aplica" },
                  { value: 5, label: "Sempre se aplica a mim" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-accent hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                    <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer text-left">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex gap-3">
              {currentQuestion > 0 && (
                <Button variant="outline" onClick={handlePrevious} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
              )}
              <Button 
                onClick={handleNext} 
                disabled={answers[currentQuestion] === undefined || isSubmitting}
                className="flex-1"
              >
                {currentQuestion === enneagramQuestions.length - 1 ? (
                  isSubmitting ? "Processando..." : "Finalizar"
                ) : (
                  <>
                    Próxima
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnneagramTest;
