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
import { bigFiveQuestions } from "@/data/bigFiveQuestions";
import { bigFiveTraits, calculateBigFiveLevel } from "@/data/bigFiveData";

const BigFiveTest = () => {
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
    
    if (currentQuestion < bigFiveQuestions.length - 1) {
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
    const traitScores: Record<string, number[]> = {
      openness: [],
      conscientiousness: [],
      extraversion: [],
      agreeableness: [],
      neuroticism: [],
    };

    // Agrupa pontuações por traço
    bigFiveQuestions.forEach((q, index) => {
      let score = answers[index];
      // Inverte pontuação para questões reversas
      if (q.reverse) {
        score = 6 - score; // Inverte escala 1-5
      }
      traitScores[q.trait].push(score);
    });

    // Calcula média percentual para cada traço (0-100)
    const results: Record<string, any> = {};
    Object.keys(traitScores).forEach((trait) => {
      const scores = traitScores[trait];
      const average = scores.reduce((a, b) => a + b, 0) / scores.length;
      const percentage = ((average - 1) / 4) * 100; // Converte escala 1-5 para 0-100
      
      results[trait] = {
        score: Math.round(percentage),
        level: calculateBigFiveLevel(percentage),
      };
    });

    return results;
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    const results = calculateResults();

    const { error } = await supabase.from("test_results").insert({
      user_id: user.id,
      test_type: "bigfive",
      result_data: {
        scores: results,
        answers: answers,
      },
    });

    if (error) {
      toast.error("Erro ao salvar resultado");
      setIsSubmitting(false);
    } else {
      toast.success("Teste concluído!");
      setResult(results);
    }
  };

  const progress = ((currentQuestion + 1) / bigFiveQuestions.length) * 100;
  const currentQ = bigFiveQuestions[currentQuestion];

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
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl mb-2">Seus Resultados Big Five</CardTitle>
              <CardDescription>Perfil de Personalidade OCEAN</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(result).map(([trait, data]: [string, any]) => {
                const traitData = bigFiveTraits[trait as keyof typeof bigFiveTraits];
                const isHigh = data.level === 'High';
                const description = isHigh ? traitData.highDescription : traitData.lowDescription;
                const characteristics = isHigh ? traitData.highCharacteristics : traitData.lowCharacteristics;
                const careers = isHigh ? traitData.highCareers : traitData.lowCareers;

                return (
                  <div key={trait} className="p-6 rounded-lg bg-accent/30 border border-accent">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-xl">{traitData.trait}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        data.level === 'High' ? 'bg-primary/20 text-primary' :
                        data.level === 'Low' ? 'bg-secondary/20 text-secondary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {data.score}% - {data.level === 'High' ? 'Alto' : data.level === 'Low' ? 'Baixo' : 'Médio'}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                          style={{ width: `${data.score}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{description}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Características:</h4>
                        <ul className="text-sm space-y-1">
                          {characteristics.slice(0, 3).map((char, i) => (
                            <li key={i} className="text-muted-foreground">• {char}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Carreiras Sugeridas:</h4>
                        <ul className="text-sm space-y-1">
                          {careers.slice(0, 3).map((career, i) => (
                            <li key={i} className="text-muted-foreground">• {career}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex gap-3 pt-4">
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
                Questão {currentQuestion + 1} de {bigFiveQuestions.length}
              </span>
            </div>
            <CardTitle className="text-2xl">Teste Big Five (OCEAN)</CardTitle>
            <CardDescription>
              Avalie o quanto você concorda com cada afirmação
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
                  { value: 1, label: "Discordo Totalmente" },
                  { value: 2, label: "Discordo" },
                  { value: 3, label: "Neutro" },
                  { value: 4, label: "Concordo" },
                  { value: 5, label: "Concordo Totalmente" },
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
                {currentQuestion === bigFiveQuestions.length - 1 ? (
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

export default BigFiveTest;
