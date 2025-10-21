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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-secondary animate-pulse" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-lg sm:text-2xl flex items-center gap-2">
                Insight do Dia
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1 truncate">
                {mbtiType
                  ? `Uma reflexão personalizada para ${mbtiType}`
                  : "Uma reflexão personalizada para sua jornada"
                }
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="capitalize font-medium text-xs sm:text-sm w-fit">
            {insight.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-4 border-primary/30 pl-3 sm:pl-4 italic">
          <p className="text-sm sm:text-lg leading-relaxed text-foreground">
            {insight.insight_text}
          </p>
        </blockquote>
      </CardContent>
    </Card>
  );
};
