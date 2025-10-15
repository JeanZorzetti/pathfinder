import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, BookOpen, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg gradient-text">Pathfinder</span>
          </div>
          <Button onClick={() => navigate("/")}>Voltar</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Nossa Filosofia
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pathfinder não é apenas mais uma ferramenta de autoajuda. É um ecossistema baseado em ciência para o autoconhecimento profundo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Fundamentado em Ciência</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nossos testes são baseados em teorias psicológicas consolidadas, incluindo trabalhos de Howard Gardner, Isabel Myers, Katharine Briggs e o modelo Big Five OCEAN.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Privacidade Garantida</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Seus dados são criptografados e nunca compartilhados. Você mantém controle total sobre suas informações pessoais e resultados de testes.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-3">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Ferramenta de Pensamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Não oferecemos respostas definitivas ou soluções mágicas. Fornecemos frameworks para você pensar profundamente sobre si mesmo e suas escolhas.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Autocoerência</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nosso objetivo é ajudá-lo a alcançar autocoerência: entender como suas ações, valores e propósito se conectam para criar uma vida autêntica.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-elegant border-primary/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Nossa Abordagem</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Combatemos o ceticismo com transparência:</strong> Sabemos que testes de personalidade enfrentam críticas. Por isso, somos abertos sobre nossas metodologias e limitações.
              </p>
              <p>
                <strong className="text-foreground">Evitamos prescrições:</strong> Não dizemos "você deve ser X". Oferecemos insights para você decidir quem quer ser.
              </p>
              <p>
                <strong className="text-foreground">Focamos na jornada:</strong> O autoconhecimento não tem destino final. É um processo contínuo de reflexão, aprendizado e crescimento.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button variant="hero" size="xl" onClick={() => navigate("/test/mbti")}>
            Começar Minha Jornada
          </Button>
        </div>
      </main>
    </div>
  );
};

export default About;
