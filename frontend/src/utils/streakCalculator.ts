/**
 * Streak Calculator - Calcula streak de dias consecutivos
 *
 * Sprint 1: Dashboard Core
 *
 * Calcula quantos dias consecutivos o usuário visitou o dashboard
 */

/**
 * Calcula o streak atual baseado nas datas de visita
 * @param lastVisit Data da última visita
 * @param previousVisits Array de datas de visitas anteriores (opcional)
 * @returns Objeto com streak atual e longest streak
 */
export function calculateStreak(
  lastVisit: Date | string | null,
  previousVisits?: (Date | string)[]
): { current: number; longest: number } {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Reset para início do dia

  // Se nunca visitou, streak é 0
  if (!lastVisit) {
    return { current: 0, longest: 0 };
  }

  const lastVisitDate = new Date(lastVisit);
  lastVisitDate.setHours(0, 0, 0, 0);

  // Calcular diferença em dias
  const daysDiff = Math.floor((now.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24));

  // Se visitou hoje, streak continua (ou inicia em 1)
  if (daysDiff === 0) {
    // Se temos histórico de visitas, calcular streak mais preciso
    if (previousVisits && previousVisits.length > 0) {
      return calculateStreakFromHistory([...previousVisits, lastVisit]);
    }
    return { current: 1, longest: 1 };
  }

  // Se visitou ontem, streak continua
  if (daysDiff === 1) {
    if (previousVisits && previousVisits.length > 0) {
      return calculateStreakFromHistory([...previousVisits, lastVisit]);
    }
    return { current: 1, longest: 1 };
  }

  // Se passou mais de 1 dia, streak quebrado
  return { current: 0, longest: 0 };
}

/**
 * Calcula streak a partir de um histórico de visitas
 * @param visits Array de datas de visitas
 * @returns Objeto com streak atual e longest streak
 */
function calculateStreakFromHistory(visits: (Date | string)[]): { current: number; longest: number } {
  if (visits.length === 0) {
    return { current: 0, longest: 0 };
  }

  // Ordenar datas (mais recente primeiro)
  const sortedDates = visits
    .map(v => {
      const date = new Date(v);
      date.setHours(0, 0, 0, 0);
      return date;
    })
    .sort((a, b) => b.getTime() - a.getTime());

  // Remover duplicatas (mesmo dia)
  const uniqueDates = sortedDates.filter((date, index, arr) => {
    if (index === 0) return true;
    return date.getTime() !== arr[index - 1].getTime();
  });

  let currentStreak = 1;
  let longestStreak = 1;
  let tempStreak = 1;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Verificar se a visita mais recente foi hoje ou ontem
  const mostRecent = uniqueDates[0];
  const daysSinceLastVisit = Math.floor((now.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24));

  // Se passou mais de 1 dia, streak atual é 0
  if (daysSinceLastVisit > 1) {
    currentStreak = 0;
  } else {
    // Calcular streak atual (dias consecutivos desde hoje/ontem)
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const current = uniqueDates[i];
      const next = uniqueDates[i + 1];
      const diff = Math.floor((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));

      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calcular longest streak (maior sequência no histórico)
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const current = uniqueDates[i];
    const next = uniqueDates[i + 1];
    const diff = Math.floor((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));

    if (diff === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, currentStreak);

  return { current: currentStreak, longest: longestStreak };
}

/**
 * Verifica se o usuário deve ganhar XP por manter streak
 * @param currentStreak Streak atual
 * @returns Quantidade de XP a ganhar (0 se não deve ganhar)
 */
export function getStreakXP(currentStreak: number): number {
  // Ganhar XP em marcos específicos
  const milestones = [3, 7, 14, 30, 60, 100];

  if (milestones.includes(currentStreak)) {
    return 50; // +50 XP por alcançar milestone
  }

  return 0;
}

/**
 * Formata o streak para exibição
 * @param streak Número de dias de streak
 * @returns String formatada
 */
export function formatStreak(streak: number): string {
  if (streak === 0) return "Comece seu streak!";
  if (streak === 1) return "🔥 1 dia";
  if (streak < 7) return `🔥 ${streak} dias`;
  if (streak < 30) return `🔥 ${streak} dias - Ótimo!`;
  if (streak < 100) return `🔥 ${streak} dias - Incrível!`;
  return `🔥 ${streak} dias - Lenda!`;
}
