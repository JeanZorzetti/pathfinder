import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles, Check, ArrowRight, BookOpen, Users, LineChart, Lock } from "lucide-react";

const premiumFeatures = [
  {
    icon: BookOpen,
    title: "Cursos Guiados de Transformação",
    description: 'Jornadas estruturadas como "Descobrindo sua Vocação" e "Alinhando Propósito e Ação"',
  },
  {
    icon: LineChart,
    title: "Análises Profundas de Evolução",
    description: "Acompanhe seu crescimento ao longo do tempo com gráficos e insights personalizados",
  },
  {
    icon: Users,
    title: "Relatórios de Compatibilidade",
    description: "Análises detalhadas de compatibilidade para relacionamentos, trabalho e amizades",
  },
  {
    icon: Sparkles,
    title: "Insights Premium Ilimitados",
    description: "Acesso a biblioteca completa de reflexões e exercícios exclusivos para seu tipo",
  },
];

const comparisonItems = [
  { feature: "Testes de Personalidade (MBTI, Eneagrama, Big Five)", free: true, premium: true },
  { feature: "Dashboard Pessoal", free: true, premium: true },
  { feature: "Insight Diário Personalizado", free: true, premium: true },
  { feature: "Diário Digital Ilimitado", free: true, premium: true },
  { feature: "Cursos Guiados de Autoconhecimento", free: false, premium: true },
  { feature: "Análises de Evolução Pessoal", free: false, premium: true },
  { feature: "Relatórios de Compatibilidade Profundos", free: false, premium: true },
  { feature: "Biblioteca Completa de Conteúdo Premium", free: false, premium: true },
  { feature: "Exercícios Práticos e Ferramentas Avançadas", free: false, premium: true },
  { feature: "Suporte Prioritário", free: false, premium: true },
];

const Premium = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg gradient-text">Pathfinder</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/")}>
              Início
            </Button>
            <Button variant="ghost" onClick={() => navigate("/about")}>
              Sobre
            </Button>
            <Button onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Pathfinder Plus</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            O diagnóstico é gratuito. A transformação é premium.
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vá além do autoconhecimento. Transforme insights em ação com ferramentas profundas,
            cursos estruturados e análises personalizadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" disabled className="relative overflow-hidden">
              <Lock className="w-5 h-5 mr-2" />
              Em Breve
            </Button>
            <Button variant="outline" size="xl" onClick={() => navigate("/test/mbti")}>
              Experimentar Versão Gratuita
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            O que você terá no Pathfinder Plus
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {premiumFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-elegant border-primary/20">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Gratuito vs. Plus</h2>
            <Card className="shadow-elegant">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold">Recurso</th>
                        <th className="text-center p-4 font-semibold w-32">Gratuito</th>
                        <th className="text-center p-4 font-semibold w-32 bg-primary/5">Plus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonItems.map((item, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="p-4 text-sm">{item.feature}</td>
                          <td className="text-center p-4">
                            {item.free ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                          <td className="text-center p-4 bg-primary/5">
                            {item.premium ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Nossa Filosofia</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Acreditamos que <strong className="text-foreground">entender-se é um direito</strong>, não um privilégio.
              Por isso, nossos testes e ferramentas essenciais são e sempre serão gratuitos.
            </p>
            <p>
              O Pathfinder Plus foi criado para quem está pronto para ir além do diagnóstico e
              busca <strong className="text-foreground">transformação estruturada e profunda</strong>.
            </p>
            <p>
              Não é sobre ser melhor que os outros. É sobre se tornar mais alinhado com quem você realmente é.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comece sua jornada hoje
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            A versão gratuita do Pathfinder já oferece tudo que você precisa para começar.
            O Plus estará disponível quando você estiver pronto para o próximo nível.
          </p>
          <Button size="xl" onClick={() => navigate("/test/mbti")}>
            Fazer Teste Gratuito Agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Premium;
