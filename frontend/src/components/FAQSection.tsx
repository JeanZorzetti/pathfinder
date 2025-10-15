import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Os testes de personalidade do Pathfinder são gratuitos?",
    answer: "Sim! Todos os nossos testes principais (MBTI, Eneagrama e Big Five) são completamente gratuitos. Nossa missão é tornar o autoconhecimento acessível a todos.",
  },
  {
    question: "Qual a diferença entre MBTI, Eneagrama e Big Five?",
    answer: "O MBTI foca em preferências cognitivas (como você processa informação), o Eneagrama explora motivações profundas e medos, e o Big Five mede traços de personalidade em espectro científico. Recomendamos fazer os três para uma visão completa.",
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Absolutamente. Utilizamos criptografia de ponta e nunca compartilhamos seus dados pessoais ou resultados com terceiros. Você mantém controle total sobre suas informações.",
  },
  {
    question: "Preciso criar conta para fazer os testes?",
    answer: "Você pode fazer o teste sem conta, mas para salvar seus resultados e acessar recursos como Insights Diários e Dashboard Pessoal, é necessário criar uma conta gratuita.",
  },
  {
    question: "Com que frequência recebo novos insights?",
    answer: "Usuários registrados recebem um novo insight personalizado todos os dias, baseado no seu tipo de personalidade. É nossa forma de tornar o autoconhecimento um hábito diário.",
  },
  {
    question: "Os testes são baseados em ciência?",
    answer: "Sim. Nossos testes são fundamentados em teorias psicológicas consolidadas, incluindo trabalhos de Myers-Briggs, Howard Gardner, e o modelo Big Five (OCEAN), amplamente validado na psicologia científica.",
  },
  {
    question: "Posso mudar meu tipo de personalidade?",
    answer: "Seu tipo fundamental tende a ser estável ao longo da vida, mas você pode desenvolver funções menos dominantes. O importante é usar o teste como ferramenta de autoconhecimento, não como rótulo fixo.",
  },
  {
    question: "O que é o Pathfinder Plus?",
    answer: "É nossa versão premium (em desenvolvimento) que oferecerá cursos guiados, análises profundas de evolução, relatórios de compatibilidade detalhados e ferramentas avançadas de transformação pessoal.",
  },
];

export const FAQSection = () => {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Tudo que você precisa saber sobre o Pathfinder
            </p>
          </div>
          
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Dúvidas Comuns</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};