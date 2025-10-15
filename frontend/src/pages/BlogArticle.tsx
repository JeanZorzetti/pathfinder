import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Clock, Tag, ArrowLeft, ArrowRight, User } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { blogArticles, getClusterArticles } from "@/data/blogArticles";

const BlogArticle = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  
  const article = articleId ? blogArticles[articleId] : null;
  
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Artigo não encontrado</h2>
            <p className="text-muted-foreground mb-4">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Button onClick={() => navigate("/blog")}>Voltar ao Blog</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedArticles = article.pillar 
    ? getClusterArticles(article.pillar).filter(a => a.id !== article.id).slice(0, 3) 
    : [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Organization",
      "name": article.author
    },
    "datePublished": article.publishedDate,
    "articleSection": article.category
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <SEOHead
        title={`${article.title} | Pathfinder Blog`}
        description={article.description}
        keywords={article.tags.join(", ")}
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
          <Button variant="ghost" onClick={() => navigate("/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Blog
          </Button>
        </div>
      </nav>

      {/* Article Header */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {article.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 pb-12 max-w-4xl">
        <Card className="shadow-elegant">
          <CardContent className="pt-8">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                {article.content.introduction}
              </p>

              {/* Sections */}
              {article.content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    {section.heading}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}

              {/* Conclusion */}
              <div className="mt-12 p-6 bg-primary/5 rounded-lg border-l-4 border-primary">
                <h3 className="text-xl font-bold mb-3 text-foreground">Conclusão</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {article.content.conclusion}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Artigos Relacionados</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Card
                  key={related.id}
                  className="cursor-pointer hover:shadow-elegant transition-smooth"
                  onClick={() => navigate(`/blog/${related.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary">{related.category}</span>
                      <span className="text-xs text-muted-foreground">{related.readTime}</span>
                    </div>
                    <CardTitle className="text-lg">{related.title}</CardTitle>
                    <CardDescription>{related.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="shadow-sm border-primary/20">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">Descubra seu tipo de personalidade</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Faça nosso teste gratuito e receba insights personalizados sobre sua personalidade
              </p>
              <Button size="lg" variant="hero" onClick={() => navigate("/test/mbti")}>
                Fazer Teste MBTI Gratuito
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  );
};

export default BlogArticle;
