import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { blogArticles } from "@/data/blogArticles";

// Extrair artigos pilares (sem pillar definido)
const blogPillars = Object.values(blogArticles).filter(article => !article.pillar);

// Extrair artigos cluster (com pillar definido)
const recentArticles = Object.values(blogArticles).filter(article => article.pillar);

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <SEOHead
        title="Blog Pathfinder - Guias Completos sobre Personalidade e Autoconhecimento"
        description="Artigos completos sobre MBTI, Eneagrama, Big Five e autoconhecimento. Aprenda sobre tipos de personalidade, carreiras, relacionamentos e desenvolvimento pessoal."
        keywords="blog personalidade, guia MBTI, tipos MBTI, eneagrama tipos, big five, autoconhecimento, carreiras por personalidade"
        type="website"
      />
      <StructuredData 
        type="WebSite" 
        data={{
          name: "Blog Pathfinder",
          description: "Hub de conteúdo sobre personalidade e autoconhecimento",
          url: typeof window !== 'undefined' ? window.location.href : ''
        }} 
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
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Hub de Conhecimento</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Guias completos, artigos aprofundados e insights para sua jornada de autoconhecimento
          </p>
          <div className="max-w-md mx-auto">
            <Input
              type="search"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Pillar Articles */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Guias Definitivos</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogPillars.map((pillar) => (
            <Card
              key={pillar.id}
              className="shadow-elegant hover:shadow-glow transition-smooth cursor-pointer border-primary/20"
              onClick={() => navigate(`/blog/${pillar.id}`)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-secondary">{pillar.category}</span>
                  <span className="text-xs text-muted-foreground">{pillar.readTime}</span>
                </div>
                <CardTitle className="text-xl">{pillar.title}</CardTitle>
                <CardDescription className="text-base">{pillar.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Ler Guia Completo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Artigos Recentes</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {recentArticles.map((article) => (
              <Card
                key={article.id}
                className="shadow-sm hover:shadow-elegant transition-smooth cursor-pointer"
                onClick={() => navigate(`/blog/${article.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">{article.category}</span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" className="p-0">
                    Ler artigo →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* pSEO Compatibility Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Compatibilidade entre Tipos MBTI</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-muted-foreground mb-8">
            Explore como diferentes tipos de personalidade se relacionam. Descubra pontos fortes e desafios em combinações específicas.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["INTJ-ENFP", "INFJ-ENTP", "ISTJ-ESFP", "ISTP-ENFJ", "ENTJ-INFP", "INTP-ESFJ", "ESTJ-INFP", "ISFJ-ESTP"].map((combo) => {
              const [t1, t2] = combo.split("-");
              return (
                <Button
                  key={combo}
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/compatibility/${t1}/${t2}`)}
                  className="text-xs"
                >
                  {combo}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Pronto para se conhecer melhor?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Faça nosso teste gratuito e comece sua jornada de autodescoberta
          </p>
          <Button size="xl" onClick={() => navigate("/test/mbti")}>
            Fazer Teste MBTI Gratuito
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
