import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// MBTI Questions - 20 questões balanceadas (5 por dimensão)
const mbtiQuestions = [
  // Dimensão E/I - 5 questões
  {
    question: "Em uma festa, você geralmente:",
    options: [
      { value: "E", label: "Interage com muitas pessoas, incluindo estranhos" },
      { value: "I", label: "Interage com poucas pessoas que você conhece bem" },
    ],
    dimension: "EI",
  },
  {
    question: "Você se considera mais:",
    options: [
      { value: "E", label: "Sociável e expansivo" },
      { value: "I", label: "Reservado e introspectivo" },
    ],
    dimension: "EI",
  },
  {
    question: "Após um dia longo, você prefere:",
    options: [
      { value: "E", label: "Sair com amigos para recarregar energias" },
      { value: "I", label: "Ficar sozinho para se recuperar" },
    ],
    dimension: "EI",
  },
  {
    question: "Em reuniões sociais:",
    options: [
      { value: "E", label: "Você fala abertamente e compartilha rapidamente" },
      { value: "I", label: "Você escuta primeiro e fala quando tem algo importante" },
    ],
    dimension: "EI",
  },
  {
    question: "Você processa melhor seus pensamentos:",
    options: [
      { value: "E", label: "Falando em voz alta com outras pessoas" },
      { value: "I", label: "Refletindo internamente sozinho" },
    ],
    dimension: "EI",
  },

  // Dimensão S/N - 5 questões
  {
    question: "Você prefere trabalhar:",
    options: [
      { value: "S", label: "Com fatos e detalhes concretos" },
      { value: "N", label: "Com ideias e possibilidades abstratas" },
    ],
    dimension: "SN",
  },
  {
    question: "Você prefere:",
    options: [
      { value: "S", label: "Informações práticas e aplicáveis" },
      { value: "N", label: "Teorias e conceitos inovadores" },
    ],
    dimension: "SN",
  },
  {
    question: "Ao aprender algo novo, você foca em:",
    options: [
      { value: "S", label: "O que é real e comprovado" },
      { value: "N", label: "O que é possível e potencial" },
    ],
    dimension: "SN",
  },
  {
    question: "Você confia mais em:",
    options: [
      { value: "S", label: "Experiência prática e senso comum" },
      { value: "N", label: "Intuição e visões de futuro" },
    ],
    dimension: "SN",
  },
  {
    question: "Você prefere conversas sobre:",
    options: [
      { value: "S", label: "Fatos, detalhes e experiências concretas" },
      { value: "N", label: "Ideias, conceitos e significados profundos" },
    ],
    dimension: "SN",
  },

  // Dimensão T/F - 5 questões
  {
    question: "Ao tomar decisões, você:",
    options: [
      { value: "T", label: "Usa principalmente a lógica e a objetividade" },
      { value: "F", label: "Considera principalmente os valores e sentimentos" },
    ],
    dimension: "TF",
  },
  {
    question: "Em conflitos, você tende a:",
    options: [
      { value: "T", label: "Focar no que é justo e racional" },
      { value: "F", label: "Focar no que mantém a harmonia" },
    ],
    dimension: "TF",
  },
  {
    question: "Você valoriza mais:",
    options: [
      { value: "T", label: "Verdade e justiça, mesmo que doa" },
      { value: "F", label: "Harmonia e compreensão mútua" },
    ],
    dimension: "TF",
  },
  {
    question: "Ao dar feedback, você:",
    options: [
      { value: "T", label: "É direto e objetivo, focando em melhorias" },
      { value: "F", label: "É cuidadoso para não magoar sentimentos" },
    ],
    dimension: "TF",
  },
  {
    question: "Você se considera mais:",
    options: [
      { value: "T", label: "Razoável e analítico" },
      { value: "F", label: "Empático e compassivo" },
    ],
    dimension: "TF",
  },

  // Dimensão J/P - 5 questões
  {
    question: "Você prefere:",
    options: [
      { value: "J", label: "Ter planos definidos e seguir uma rotina" },
      { value: "P", label: "Ser flexível e manter suas opções em aberto" },
    ],
    dimension: "JP",
  },
  {
    question: "Você prefere:",
    options: [
      { value: "J", label: "Concluir projetos antes do prazo" },
      { value: "P", label: "Trabalhar sob pressão no último minuto" },
    ],
    dimension: "JP",
  },
  {
    question: "Seu espaço de trabalho geralmente é:",
    options: [
      { value: "J", label: "Organizado e estruturado" },
      { value: "P", label: "Espontâneo e adaptável" },
    ],
    dimension: "JP",
  },
  {
    question: "Você prefere:",
    options: [
      { value: "J", label: "Decidir rapidamente e seguir em frente" },
      { value: "P", label: "Manter opções abertas o máximo possível" },
    ],
    dimension: "JP",
  },
  {
    question: "Em viagens, você:",
    options: [
      { value: "J", label: "Planeja itinerário detalhado antecipadamente" },
      { value: "P", label: "Prefere improvisar e descobrir no caminho" },
    ],
    dimension: "JP",
  },
];

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

const Test = () => {
  const { testType } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

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

  const calculateMBTI = () => {
    const dimensions = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    Object.values(answers).forEach((answer) => {
      dimensions[answer as keyof typeof dimensions]++;
    });

    const type = 
      (dimensions.E >= dimensions.I ? "E" : "I") +
      (dimensions.S >= dimensions.N ? "S" : "N") +
      (dimensions.T >= dimensions.F ? "T" : "F") +
      (dimensions.J >= dimensions.P ? "J" : "P");

    return type;
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para salvar seus resultados");
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);
    const mbtiType = calculateMBTI();
    setResult(mbtiType);

    const { error } = await supabase.from("test_results").insert({
      user_id: user.id,
      test_type: "mbti",
      result_data: {
        type: mbtiType,
        ...mbtiDescriptions[mbtiType],
        answers: answers,
      },
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Erro ao salvar resultado");
      return;
    }

    setShowResult(true);
    toast.success("Resultado salvo com sucesso!");
  };

  const progress = ((currentQuestion + 1) / mbtiQuestions.length) * 100;

  if (testType !== "mbti") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Teste não disponível</CardTitle>
            <CardDescription>Este teste ainda não foi implementado</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")}>Voltar para Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResult && result) {
    const resultInfo = mbtiDescriptions[result];
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full shadow-elegant">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-4xl mb-2 gradient-text">{result}</CardTitle>
            <CardDescription className="text-xl">{resultInfo.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-center leading-relaxed">{resultInfo.description}</p>
            <div className="flex gap-3 justify-center">
              <Button variant="hero" size="lg" onClick={() => navigate("/dashboard")}>
                Ver Dashboard
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
                Refazer Teste
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = mbtiQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <span className="font-semibold">Teste MBTI</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} de {mbtiQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <CardTitle className="text-xl mb-6">{question.question}</CardTitle>
            <RadioGroup
              value={answers[currentQuestion]}
              onValueChange={(value) =>
                setAnswers({ ...answers, [currentQuestion]: value })
              }
            >
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent transition-smooth cursor-pointer">
                    <RadioGroupItem value={option.value} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            {currentQuestion === mbtiQuestions.length - 1 ? (
              <Button
                variant="hero"
                onClick={handleSubmit}
                disabled={!answers[currentQuestion] || isSubmitting}
              >
                {isSubmitting ? "Processando..." : "Ver Resultado"}
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={!answers[currentQuestion]}
              >
                Próxima
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Test;
