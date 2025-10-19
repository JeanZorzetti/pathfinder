/**
 * JourneyCard Component - Jornada de Crescimento
 *
 * Sprint 2: Gamificação + Jornada de Crescimento
 *
 * Exibe:
 * - Nível atual do usuário
 * - Barra de progresso para próximo nível
 * - Próximas 3 conquistas desbloqueáveis
 * - Link para página de todas conquistas
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Lock } from "lucide-react";
import { calculateLevelProgress } from "@/types/gamification";
import { Achievement } from "@/types/gamification";
import { getNextAchievements, RARITY_COLORS } from "@/data/achievements";

interface JourneyCardProps {
  xp: number;
  achievements: Achievement[];
  onViewAll?: () => void;
}

export function JourneyCard({ xp, achievements, onViewAll }: JourneyCardProps) {
  const { current, next, progressXP, requiredXP, percentage } = calculateLevelProgress(xp);
  const nextAchievements = getNextAchievements(achievements, 3);

  console.log('[JourneyCard] Input achievements:', achievements.length);
  console.log('[JourneyCard] Next achievements:', nextAchievements.length, nextAchievements);

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Jornada de Crescimento
        </CardTitle>
        <CardDescription>
          Seu progresso de autoconhecimento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Nível Atual */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{current.badge}</span>
              <div>
                <p className="font-bold text-lg">Nível {current.level}</p>
                <p className="text-sm text-muted-foreground">{current.title}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold" style={{ color: current.color }}>
                {xp} XP
              </p>
            </div>
          </div>

          {/* Barra de Progresso */}
          {next && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {progressXP} / {requiredXP} XP
                </span>
                <span className="font-semibold" style={{ color: next.color }}>
                  {next.badge} {next.title}
                </span>
              </div>
              <Progress value={percentage} className="h-3" style={{
                // @ts-ignore - Custom CSS variable
                '--progress-background': current.color
              }} />
              <p className="text-xs text-muted-foreground text-center">
                {requiredXP - progressXP} XP para o próximo nível
              </p>
            </div>
          )}

          {/* Nível Máximo */}
          {!next && (
            <div className="text-center py-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <p className="text-lg font-bold text-yellow-800">
                🎉 Nível Máximo Alcançado!
              </p>
              <p className="text-sm text-yellow-700">
                Você dominou a jornada de autoconhecimento
              </p>
            </div>
          )}
        </div>

        {/* Próximas Conquistas */}
        {nextAchievements.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" />
              Próximas Conquistas
            </h3>
            <div className="space-y-3">
              {nextAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm truncate">
                          {achievement.title}
                        </p>
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            borderColor: RARITY_COLORS[achievement.rarity],
                            color: RARITY_COLORS[achievement.rarity]
                          }}
                        >
                          +{achievement.xpReward} XP
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      {achievement.progress && (
                        <div className="space-y-1">
                          <Progress
                            value={(achievement.progress.current / achievement.progress.total) * 100}
                            className="h-1.5"
                          />
                          <p className="text-xs text-muted-foreground">
                            {achievement.progress.current} / {achievement.progress.total}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Ver Todas */}
        <Button
          variant="outline"
          className="w-full"
          onClick={onViewAll}
        >
          <Lock className="w-4 h-4 mr-2" />
          Ver Todas as Conquistas ({achievements.length})
        </Button>
      </CardContent>
    </Card>
  );
}
