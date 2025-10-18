import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles, Shield, TrendingUp, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData, websiteSchema } from "@/components/StructuredData";
import { FAQSection } from "@/components/FAQSection";

const Index = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
      // Removido redirecionamento automático - usuário pode visitar a home mesmo autenticado
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <SEOHead
        title="Pathfinder - Descubra seu Propósito através do Autoconhecimento"
        description="Ferramentas gratuitas de autoconhecimento baseadas em psicologia: teste MBTI, Eneagrama, Big Five. Descubra sua personalidade e encontre seu propósito de vida."
        keywords="teste de personalidade, MBTI, eneagrama, big five, autoconhecimento, propósito de vida, teste gratuito"
        type="website"
      />
      <StructuredData type="WebSite" data={websiteSchema} />
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg gradient-text">Pathfinder</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/mbti")}>
              Guia MBTI
            </Button>
            <Button variant="ghost" onClick={() => navigate("/blog")}>
              Blog
            </Button>
            <Button variant="ghost" onClick={() => navigate("/about")}>
              Sobre
            </Button>
            {isAuthenticated ? (
              <Button onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/auth")}>
                  Entrar
                </Button>
                <Button variant="hero" onClick={() => navigate("/auth")}>
                  Começar Grátis
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container mx-auto px-4 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl mx-auto">
            <span className="gradient-text">Conheça-se Profundamente.</span>
            <br />
            Viva com Propósito.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubra quem você realmente é através de testes de personalidade baseados em ciência e ferramentas de autoconhecimento profundo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate("/test/mbti")}
              className="w-full sm:w-auto"
            >
              Fazer Teste Gratuito
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => navigate("/about")}
              className="w-full sm:w-auto"
            >
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que Pathfinder?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mais do que testes de personalidade. Um ecossistema completo para sua jornada de autodescoberta.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="shadow-elegant hover:shadow-glow transition-smooth border-primary/10 animate-fade-in hover-scale">
            <CardHeader>
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Baseado em Ciência</CardTitle>
              <CardDescription>
                Testes fundamentados em teorias psicológicas reconhecidas: MBTI, Eneagrama, Big Five
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-smooth border-secondary/20 animate-fade-in hover-scale" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Insights Diários</CardTitle>
              <CardDescription>
                Receba reflexões personalizadas para o seu tipo de personalidade todos os dias
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-smooth border-primary/10 animate-fade-in hover-scale" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Privacidade Total</CardTitle>
              <CardDescription>
                Seus dados são criptografados e nunca compartilhados. Você tem controle total
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Tests Preview */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Testes Disponíveis
            </h2>
            <p className="text-xl text-muted-foreground">
              Comece sua jornada com nossos testes gratuitos de alta qualidade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="shadow-sm hover:shadow-elegant transition-smooth cursor-pointer" onClick={() => navigate("/test/mbti")}>
              <CardHeader>
                <CardTitle>MBTI</CardTitle>
                <CardDescription>Myers-Briggs Type Indicator</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Descubra seu tipo de personalidade entre 16 perfis únicos baseados em 4 dimensões psicológicas.
                </p>
                <Button variant="outline" className="w-full">
                  Fazer Teste
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-elegant transition-smooth cursor-pointer" onClick={() => navigate("/test/enneagram")}>
              <CardHeader>
                <CardTitle>Eneagrama</CardTitle>
                <CardDescription>Sistema de 9 Tipos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explore suas motivações profundas através de 9 tipos de personalidade distintos.
                </p>
                <Button variant="outline" className="w-full">
                  Fazer Teste
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-elegant transition-smooth cursor-pointer" onClick={() => navigate("/test/bigfive")}>
              <CardHeader>
                <CardTitle>Big Five</CardTitle>
                <CardDescription>Modelo OCEAN</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Avalie seus traços em 5 dimensões: Abertura, Conscienciosidade, Extroversão, Amabilidade e Neuroticismo.
                </p>
                <Button variant="outline" className="w-full">
                  Fazer Teste
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <TrendingUp className="w-16 h-16 mx-auto mb-6 text-primary animate-fade-in" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se a milhares de pessoas que já descobriram mais sobre si mesmas com Pathfinder.
          </p>
          <Button variant="hero" size="xl" onClick={() => navigate("/test/mbti")} className="hover-scale">
            Fazer Teste Gratuito Agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                <Brain className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-semibold">Pathfinder</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Pathfinder. Seu ecossistema de autoconhecimento.
            </div>
            <Button variant="link" onClick={() => navigate("/about")}>
              Nossa Filosofia
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
