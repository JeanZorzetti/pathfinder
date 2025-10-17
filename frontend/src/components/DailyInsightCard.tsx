import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DailyInsightCardProps {
  insight: {
    insight_text: string;
    category: string;
  };
  mbtiType?: string | null;
}

export const DailyInsightCard = ({ insight, mbtiType }: DailyInsightCardProps) => {
  return (
    <Card className="md:col-span-2 shadow-elegant border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-glow transition-smooth">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-secondary animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                Insight do Dia
                <Sparkles className="w-5 h-5 text-primary" />
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                {mbtiType
                  ? `Uma reflexão personalizada para ${mbtiType}`
                  : "Uma reflexão personalizada para sua jornada"
                }
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="capitalize font-medium">
            {insight.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-4 border-primary/30 pl-4 italic">
          <p className="text-lg leading-relaxed text-foreground">
            {insight.insight_text}
          </p>
        </blockquote>
      </CardContent>
    </Card>
  );
};
