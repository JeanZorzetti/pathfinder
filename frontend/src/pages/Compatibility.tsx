import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Zap, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

// MBTI type data
const mbtiTypes: Record<string, string> = {
  INTJ: "O Arquiteto",
  INTP: "O Lógico",
  ENTJ: "O Comandante",
  ENTP: "O Inovador",
  INFJ: "O Advogado",
  INFP: "O Mediador",
  ENFJ: "O Protagonista",
  ENFP: "O Ativista",
  ISTJ: "O Logístico",
  ISFJ: "O Defensor",
  ESTJ: "O Executivo",
  ESFJ: "O Cônsul",
  ISTP: "O Virtuoso",
  ISFP: "O Aventureiro",
  ESTP: "O Empreendedor",
  ESFP: "O Animador",
};

// Generate compatibility content based on cognitive functions
const generateCompatibilityContent = (type1: string, type2: string) => {
  const sharedLetters = type1.split("").filter((letter, i) => type2[i] === letter).length;
  const isIdentical = type1 === type2;
  const isOpposite = sharedLetters === 0;
  
  // Calculate compatibility score based on shared functions
  let compatibilityScore = 50;
  if (isIdentical) compatibilityScore = 85;
  else if (sharedLetters === 3) compatibilityScore = 75;
  else if (sharedLetters === 2) compatibilityScore = 65;
  else if (sharedLetters === 1) compatibilityScore = 60;
  else if (isOpposite) compatibilityScore = 70; // Opposites can attract!
  
  // Determine compatibility level
  let compatibilityLevel = "Moderada";
  let compatibilityColor = "text-primary";
  if (compatibilityScore >= 80) {
    compatibilityLevel = "Excelente";
    compatibilityColor = "text-green-600";
  } else if (compatibilityScore >= 70) {
    compatibilityLevel = "Boa";
    compatibilityColor = "text-blue-600";
  } else if (compatibilityScore < 60) {
    compatibilityLevel = "Desafiadora";
    compatibilityColor = "text-orange-600";
  }
  
  return {
    score: compatibilityScore,
    level: compatibilityLevel,
    color: compatibilityColor,
    isIdentical,
    isOpposite,
    sharedLetters,
  };
};

const Compatibility = () => {
  const navigate = useNavigate();
  const { type1, type2 } = useParams();
  
  // Validate types
  const validType1 = type1?.toUpperCase();
  const validType2 = type2?.toUpperCase();
  
  if (!validType1 || !validType2 || !mbtiTypes[validType1] || !mbtiTypes[validType2]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Tipos não encontrados</h2>
            <p className="text-muted-foreground mb-4">
              Por favor, verifique os tipos MBTI informados.
            </p>
            <Button onClick={() => navigate("/")}>Voltar para Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const compatibility = generateCompatibilityContent(validType1, validType2);
  
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <SEOHead
        title={`Compatibilidade ${validType1} e ${validType2}: ${mbtiTypes[validType1]} e ${mbtiTypes[validType2]} | Pathfinder`}
        description={`Análise completa de compatibilidade entre ${validType1} (${mbtiTypes[validType1]}) e ${validType2} (${mbtiTypes[validType2]}). Descubra pontos fortes, desafios e como fazer esse relacionamento funcionar.`}
        keywords={`${validType1} ${validType2}, compatibilidade MBTI, ${validType1} relacionamento, ${validType2} relacionamento, tipos MBTI compatíveis`}
        type="article"
      />
      
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg gradient-text">Pathfinder</span>
          </div>
          <Button variant="ghost" onClick={() => navigate("/blog")}>
            Voltar ao Blog
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-2">
                <span className="text-white font-bold text-lg">{validType1}</span>
              </div>
              <p className="text-sm text-muted-foreground">{mbtiTypes[validType1]}</p>
            </div>
            
            <Heart className="w-8 h-8 text-secondary" />
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-2">
                <span className="text-white font-bold text-lg">{validType2}</span>
              </div>
              <p className="text-sm text-muted-foreground">{mbtiTypes[validType2]}</p>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Compatibilidade <span className="gradient-text">{validType1}</span> e <span className="gradient-text">{validType2}</span>
          </h1>
          
          <div className="inline-block bg-primary/10 rounded-full px-6 py-3 mb-6">
            <p className={`text-2xl font-bold ${compatibility.color}`}>
              {compatibility.level} • {compatibility.score}%
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Strengths */}
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <CardTitle>Pontos Fortes da Combinação</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {compatibility.isIdentical && (
                  <>
                    <li className="flex gap-2">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Compreensão mútua profunda das necessidades um do outro</span>
                    </li>
                    <li className="flex gap-2">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Mesmas preferências de comunicação e processamento</span>
                    </li>
                    <li className="flex gap-2">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Valores e prioridades naturalmente alinhados</span>
                    </li>
                  </>
                )}
                
                {compatibility.isOpposite && (
                  <>
                    <li className="flex gap-2">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Complementaridade total - cada um completa o que falta no outro</span>
                    </li>
                    <li className="flex gap-2">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Crescimento acelerado através de perspectivas opostas</span>
                    </li>
                    <li className="flex gap-2">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Química intensa baseada em diferenças fascinantes</span>
                    </li>
                  </>
                )}
                
                {!compatibility.isIdentical && !compatibility.isOpposite && (
                  <>
                    <li className="flex gap-2">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Equilíbrio entre similaridade e diferença</span>
                    </li>
                    <li className="flex gap-2">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Capacidade de aprender um com o outro mantendo zona de conforto</span>
                    </li>
                    <li className="flex gap-2">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Complementação em áreas específicas</span>
                    </li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Challenges */}
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <CardTitle>Desafios Potenciais</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {compatibility.isIdentical && (
                  <>
                    <li className="flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Possível falta de perspectivas diferentes para crescimento</span>
                    </li>
                    <li className="flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Mesmos pontos cegos não são compensados pelo parceiro</span>
                    </li>
                    <li className="flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Pode ficar em zona de conforto sem desafios</span>
                    </li>
                  </>
                )}
                
                {compatibility.isOpposite && (
                  <>
                    <li className="flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Necessidades fundamentais podem parecer incompatíveis</span>
                    </li>
                    <li className="flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Requer esforço consciente para entender perspectiva do outro</span>
                    </li>
                    <li className="flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Estilos de comunicação completamente diferentes</span>
                    </li>
                  </>
                )}
                
                {!compatibility.isIdentical && !compatibility.isOpposite && (
                  <>
                    <li className="flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Algumas diferenças fundamentais que exigem compromisso</span>
                    </li>
                    <li className="flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Necessidade de comunicação clara sobre expectativas</span>
                    </li>
                    <li className="flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Possíveis mal-entendidos em áreas específicas</span>
                    </li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Card className="shadow-elegant mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Análise Detalhada</CardTitle>
            <CardDescription>Como essa combinação funciona em diferentes contextos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Comunicação</h3>
              <p className="text-muted-foreground">
                {validType1[0] === validType2[0] 
                  ? `Ambos compartilham a mesma preferência ${validType1[0] === 'E' ? 'extrovertida' : 'introvertida'}, o que facilita a compreensão de necessidades sociais e de processamento.`
                  : `${validType1} é ${validType1[0] === 'E' ? 'extrovertido' : 'introvertido'} enquanto ${validType2} é ${validType2[0] === 'E' ? 'extrovertido' : 'introvertido'}. Isso exige consciência sobre diferentes necessidades de comunicação e recarga de energia.`
                }
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Tomada de Decisão</h3>
              <p className="text-muted-foreground">
                {validType1[2] === validType2[2]
                  ? `Ambos tomam decisões usando ${validType1[2] === 'T' ? 'lógica e análise objetiva (Thinking)' : 'valores e considerações pessoais (Feeling)'}, criando alinhamento natural no processo decisório.`
                  : `${validType1} decide com ${validType1[2] === 'T' ? 'Thinking (lógica)' : 'Feeling (valores)'} enquanto ${validType2} usa ${validType2[2] === 'T' ? 'Thinking (lógica)' : 'Feeling (valores)'}. Essa diferença pode criar tensão, mas também equilíbrio se respeitada.`
                }
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Estilo de Vida</h3>
              <p className="text-muted-foreground">
                {validType1[3] === validType2[3]
                  ? `Ambos preferem ${validType1[3] === 'J' ? 'estrutura e planejamento (Judging)' : 'flexibilidade e espontaneidade (Perceiving)'}, facilitando a organização da vida cotidiana.`
                  : `${validType1} prefere ${validType1[3] === 'J' ? 'estrutura (Judging)' : 'flexibilidade (Perceiving)'} enquanto ${validType2} prefere ${validType2[3] === 'J' ? 'estrutura (Judging)' : 'flexibilidade (Perceiving)'}. Negociação sobre rotinas e planos é essencial.`
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tips for Success */}
        <Card className="shadow-elegant border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Como Fazer Essa Combinação Prosperar</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-semibold mb-1">Celebre as diferenças como oportunidades</p>
                  <p className="text-sm text-muted-foreground">
                    Cada diferença entre vocês é uma chance de crescimento. Curiosidade supera julgamento.
                  </p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-semibold mb-1">Comunique necessidades explicitamente</p>
                  <p className="text-sm text-muted-foreground">
                    O que é óbvio para seu tipo pode não ser para o outro. Verbalize claramente.
                  </p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-semibold mb-1">Respeite os estilos naturais um do outro</p>
                  <p className="text-sm text-muted-foreground">
                    Não tente mudar o tipo fundamental do parceiro. Adaptação ≠ Transformação forçada.
                  </p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">4</span>
                </div>
                <div>
                  <p className="font-semibold mb-1">Crie acordos sobre pontos de atrito previsíveis</p>
                  <p className="text-sm text-muted-foreground">
                    Se você sabe que vida social é um ponto de diferença, estabeleça compromissos claros com antecedência.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Card className="shadow-elegant border-primary/20">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">Descubra seu tipo de personalidade</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Conhecer seu tipo MBTI é o primeiro passo para entender melhor suas relações.
                Faça nosso teste gratuito agora.
              </p>
              <Button size="lg" onClick={() => navigate("/test/mbti")}>
                Fazer Teste MBTI Gratuito
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Compatibility;
