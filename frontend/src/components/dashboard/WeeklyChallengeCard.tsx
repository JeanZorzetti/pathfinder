/**
 * WeeklyChallengeCard Component - Desafio da Semana
 *
 * Sprint 3: Desafio Semanal + Diário Inteligente
 *
 * Exibe:
 * - Título e descrição do desafio
 * - Como fazer (instruções)
 * - Por que importa
 * - Checkboxes para Seg-Sex
 * - Botão para marcar hoje
 * - Progress visual
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Check, Lock, Info } from "lucide-react";
import { WeeklyChallenge } from "@/types/challenges";
import {
  WEEKDAY_LABELS,
  getCurrentWeekdayIndex,
  calculateChallengeProgress,
  hasCompletedToday,
} from "@/types/challenges";

interface WeeklyChallengeCardProps {
  challenge: WeeklyChallenge;
  onMarkComplete: () => void;
  isProcessing?: boolean;
}

export function WeeklyChallengeCard({
  challenge,
  onMarkComplete,
  isProcessing = false,
}: WeeklyChallengeCardProps) {
  const progress = calculateChallengeProgress(challenge.daysCompleted);
  const todayIndex = getCurrentWeekdayIndex();
  const completedToday = hasCompletedToday(challenge.daysCompleted, challenge.weekStartDate);

  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              Desafio da Semana
            </CardTitle>
            <CardDescription>
              Esta semana: desenvolva {challenge.targetWeakness}
            </CardDescription>
          </div>
          {challenge.badgeReward && (
            <div className="text-4xl">{challenge.badgeReward}</div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4">
        {/* Título do Desafio */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
            {challenge.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {challenge.description}
          </p>
        </div>

        {/* Como Fazer */}
        <div className="p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/20">
          <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className="text-primary flex-shrink-0">💡</span>
            Como fazer:
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">{challenge.howTo}</p>
        </div>

        {/* Por Que */}
        <div className="p-3 sm:p-4 rounded-lg bg-amber-50 border border-amber-200">
          <h4 className="text-xs sm:text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 flex-shrink-0" />
            Por que isso importa:
          </h4>
          <p className="text-xs sm:text-sm text-amber-800">{challenge.why}</p>
        </div>

        {/* Progresso */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Progresso: {challenge.daysCompleted.filter((d) => d).length}/5 dias
            </span>
            <Badge variant={progress === 100 ? "default" : "secondary"}>
              {progress}%
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Dias da Semana */}
        <div>
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            {weekdays.map((day, index) => {
              const isCompleted = challenge.daysCompleted[index];
              const isToday = todayIndex === index;

              return (
                <div
                  key={day}
                  className={`
                    flex-1 flex flex-col items-center gap-0.5 sm:gap-1 p-1.5 sm:p-2 rounded-lg border-2
                    transition-all
                    ${isCompleted
                      ? 'bg-green-50 border-green-500'
                      : isToday
                      ? 'bg-primary/10 border-primary'
                      : 'bg-gray-50 border-gray-200'
                    }
                  `}
                >
                  <span className="text-[10px] sm:text-xs font-medium">
                    {WEEKDAY_LABELS[day]}
                  </span>
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  ) : isToday ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-primary" />
                  ) : (
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Botão de Ação */}
        <div>
          {todayIndex === null ? (
            <div className="text-center py-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Fim de semana! Descanso Relaxe e volte na segunda 😊
              </p>
            </div>
          ) : completedToday ? (
            <div className="text-center py-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800 flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Desafio de hoje concluído! 🎉
              </p>
            </div>
          ) : (
            <Button
              onClick={onMarkComplete}
              disabled={isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                "Processando..."
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Marcar Hoje como Completo
                </>
              )}
            </Button>
          )}
        </div>

        {/* Recompensa */}
        <div className="text-center text-sm text-muted-foreground">
          Complete todos os 5 dias: <strong>+{challenge.xpReward} XP</strong>
          {challenge.badgeReward && (
            <span> + Badge {challenge.badgeReward}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
