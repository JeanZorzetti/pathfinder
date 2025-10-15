import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, Briefcase, Heart, ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";

const mbtiTypes = [
  { type: "INTJ", title: "O Arquiteto", category: "Analistas" },
  { type: "INTP", title: "O Lógico", category: "Analistas" },
  { type: "ENTJ", title: "O Comandante", category: "Analistas" },
  { type: "ENTP", title: "O Inovador", category: "Analistas" },
  { type: "INFJ", title: "O Advogado", category: "Diplomatas" },
  { type: "INFP", title: "O Mediador", category: "Diplomatas" },
  { type: "ENFJ", title: "O Protagonista", category: "Diplomatas" },
  { type: "ENFP", title: "O Ativista", category: "Diplomatas" },
  { type: "ISTJ", title: "O Logístico", category: "Sentinelas" },
  { type: "ISFJ", title: "O Defensor", category: "Sentinelas" },
  { type: "ESTJ", title: "O Executivo", category: "Sentinelas" },
  { type: "ESFJ", title: "O Cônsul", category: "Sentinelas" },
  { type: "ISTP", title: "O Virtuoso", category: "Exploradores" },
  { type: "ISFP", title: "O Aventureiro", category: "Exploradores" },
  { type: "ESTP", title: "O Empreendedor", category: "Exploradores" },
  { type: "ESFP", title: "O Animador", category: "Exploradores" },
];

const groupedTypes = mbtiTypes.reduce((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item);
  return acc;
}, {} as Record<string, typeof mbtiTypes>);

const MBTIGuide = () => {
  const navigate = useNavigate();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Guia Completo do MBTI: 16 Tipos de Personalidade Explicados",
    "description": "Entenda o Myers-Briggs Type Indicator (MBTI), suas 4 dimensões, os 16 tipos de personalidade e como usar esse conhecimento para autoconhecimento profundo.",
    "author": {
      "@type": "Organization",
      "name": "Pathfinder"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pathfinder",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pathfinder.com/logo.png"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-15"
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <SEOHead
        title="Guia Completo do MBTI - 16 Tipos de Personalidade | Pathfinder"
        description="Descubra tudo sobre o MBTI: as 4 dimensões da personalidade, os 16 tipos detalhados, carreiras ideais e compatibilidade. Guia definitivo baseado em psicologia."
        keywords="MBTI, Myers-Briggs, tipos de personalidade, teste de personalidade, INTJ, ENFP, autoconhecimento"
        type="article"
      />
      <StructuredData type="Article" data={articleSchema} />

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
            <Button variant="ghost" onClick={() => navigate("/blog")}>
              Blog
            </Button>
            <Button variant="ghost" onClick={() => navigate("/about")}>
              Sobre
            </Button>
            <Button onClick={() => navigate("/test/mbti")}>
              Fazer Teste
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Guia Completo do MBTI</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Entenda profundamente os 16 tipos de personalidade do Myers-Briggs Type Indicator 
            e descubra como usar esse conhecimento para crescimento pessoal e profissional.
          </p>
          <Button size="xl" variant="hero" onClick={() => navigate("/test/mbti")}>
            Descubra Seu Tipo MBTI Agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* O que é MBTI */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">O que é o MBTI?</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              O <strong>Myers-Briggs Type Indicator (MBTI)</strong> é uma das ferramentas de avaliação 
              de personalidade mais utilizadas no mundo. Baseado na teoria dos tipos psicológicos de 
              Carl Jung, o MBTI foi desenvolvido por Katharine Cook Briggs e sua filha Isabel Briggs Myers.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              O sistema identifica <strong>16 tipos de personalidade distintos</strong>, cada um representado 
              por quatro letras que indicam suas preferências em quatro dimensões fundamentais do comportamento humano.
            </p>
          </div>
        </div>
      </section>

      {/* As 4 Dimensões */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">As 4 Dimensões do MBTI</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Extroversão (E) vs Introversão (I)</CardTitle>
                  <CardDescription>Como você direciona sua energia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <strong>Extrovertidos</strong> recarregam energias através da interação social. 
                    <strong> Introvertidos</strong> precisam de tempo sozinhos para restaurar suas energias.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sensação (S) vs Intuição (N)</CardTitle>
                  <CardDescription>Como você processa informações</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <strong>Sensoriais</strong> focam em fatos concretos e experiências presentes. 
                    <strong> Intuitivos</strong> preferem padrões, possibilidades e o futuro.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pensamento (T) vs Sentimento (F)</CardTitle>
                  <CardDescription>Como você toma decisões</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <strong>Pensadores</strong> baseiam decisões em lógica e análise objetiva. 
                    <strong> Sentimentais</strong> priorizam valores pessoais e impacto nas pessoas.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Julgamento (J) vs Percepção (P)</CardTitle>
                  <CardDescription>Como você organiza sua vida</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <strong>Julgadores</strong> preferem estrutura, planos e decisões rápidas. 
                    <strong> Perceptivos</strong> valorizam flexibilidade e manter opções abertas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 16 Tipos */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Os 16 Tipos de Personalidade</h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Clique em qualquer tipo para explorar em profundidade suas características, 
            carreiras ideais e compatibilidade com outros tipos.
          </p>

          {Object.entries(groupedTypes).map(([category, types]) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                {category === "Analistas" && <Brain className="w-6 h-6 text-primary" />}
                {category === "Diplomatas" && <Heart className="w-6 h-6 text-secondary" />}
                {category === "Sentinelas" && <Users className="w-6 h-6 text-accent" />}
                {category === "Exploradores" && <Briefcase className="w-6 h-6 text-primary" />}
                {category}
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                {types.map((item) => (
                  <Card 
                    key={item.type}
                    className="cursor-pointer hover:shadow-elegant transition-smooth"
                    onClick={() => navigate(`/mbti/${item.type.toLowerCase()}`)}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl gradient-text">{item.type}</CardTitle>
                      <CardDescription>{item.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" size="sm" className="w-full">
                        Explorar <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artigos Relacionados */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Explore Mais Sobre MBTI</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-elegant transition-smooth" onClick={() => navigate("/blog/mbti-carreiras")}>
                <CardHeader>
                  <Briefcase className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Carreiras por Tipo</CardTitle>
                  <CardDescription>
                    Descubra as melhores profissões para cada personalidade MBTI
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:shadow-elegant transition-smooth" onClick={() => navigate("/blog/mbti-relacionamentos")}>
                <CardHeader>
                  <Heart className="w-8 h-8 text-secondary mb-2" />
                  <CardTitle>Compatibilidade</CardTitle>
                  <CardDescription>
                    Entenda a dinâmica entre diferentes tipos em relacionamentos
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:shadow-elegant transition-smooth" onClick={() => navigate("/blog/mbti-crescimento")}>
                <CardHeader>
                  <Brain className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Desenvolvimento Pessoal</CardTitle>
                  <CardDescription>
                    Como cada tipo pode evoluir e superar seus desafios
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Descubra Seu Tipo MBTI
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Faça nosso teste gratuito e receba um relatório personalizado completo sobre sua personalidade.
          </p>
          <Button size="xl" variant="hero" onClick={() => navigate("/test/mbti")}>
            Fazer Teste Gratuito
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default MBTIGuide;
