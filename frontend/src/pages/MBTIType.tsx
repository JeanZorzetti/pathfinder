import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowRight, Briefcase, Heart, TrendingUp, AlertCircle } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { mbtiTypesData } from "@/data/mbtiTypesData";

const MBTIType = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const typeData = type ? mbtiTypesData[type.toLowerCase()] : null;

  if (!typeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Tipo não encontrado</CardTitle>
            <CardDescription>O tipo MBTI solicitado não foi encontrado</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/mbti")}>Voltar ao Guia MBTI</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${typeData.title} - Guia Completo de Personalidade`,
    "description": typeData.description,
    "author": {
      "@type": "Organization",
      "name": "Pathfinder"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <SEOHead
        title={`${typeData.title} - Características, Carreiras e Relacionamentos | Pathfinder`}
        description={`${typeData.description.substring(0, 155)}...`}
        keywords={`${type?.toUpperCase()}, ${typeData.title}, personalidade, MBTI, carreiras, relacionamentos`}
        canonicalUrl={`https://pathfinder.roilabs.com.br/types/${type?.toLowerCase()}`}
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
            <Button variant="ghost" onClick={() => navigate("/mbti")}>
              Guia MBTI
            </Button>
            <Button onClick={() => navigate("/test/mbti")}>
              Fazer Teste
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <button onClick={() => navigate("/mbti")} className="hover:text-foreground">
              Guia MBTI
            </button>
            <span>/</span>
            <span>{type?.toUpperCase()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{typeData.title}</span>
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">{typeData.subtitle}</p>
          <Alert>
            <Brain className="h-4 w-4" />
            <AlertDescription className="text-base">
              {typeData.description}
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Strengths & Weaknesses */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="shadow-elegant border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Pontos Fortes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {typeData.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-secondary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                <AlertCircle className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Desafios e Áreas de Crescimento</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {typeData.weaknesses.map((weakness, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Careers */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Carreiras Ideais</CardTitle>
                    <CardDescription>
                      Profissões que se alinham com os pontos fortes do {type?.toUpperCase()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-3">
                  {typeData.careers.map((career, i) => (
                    <div key={i} className="p-3 rounded-lg bg-accent/50 border border-accent text-center">
                      {career}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Relationships */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <CardTitle>Relacionamentos</CardTitle>
                  <CardDescription>Como {type?.toUpperCase()} se comporta em relacionamentos</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">{typeData.relationships}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Growth */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elegant border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle>Desenvolvimento Pessoal</CardTitle>
                  <CardDescription>Caminhos de crescimento para {type?.toUpperCase()}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">{typeData.growth}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Descubra Seu Tipo MBTI</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Não tem certeza do seu tipo? Faça nosso teste gratuito e descubra agora.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="xl" variant="hero" onClick={() => navigate("/test/mbti")}>
              Fazer Teste Gratuito
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="xl" variant="outline" onClick={() => navigate("/mbti")}>
              Ver Todos os Tipos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MBTIType;
