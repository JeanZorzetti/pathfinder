/**
 * useXP Hook - Gerenciamento de XP e Gamificação
 *
 * @deprecated Este hook está DEPRECATED - Use useProgress do useAPI.ts
 *
 * Sprint 5 Migration: Este hook foi substituído pela nova API backend.
 *
 * MIGRAÇÃO:
 * ```typescript
 * // ❌ ANTES (Supabase direto)
 * import { useXP } from '@/hooks/useXP';
 * const { addXP } = useXP();
 * await addXP(userId, 'test_completed', currentXP, lastXpGain);
 *
 * // ✅ DEPOIS (API backend)
 * import { useProgress } from '@/hooks/useAPI';
 * const { addXP, loading, error } = useProgress();
 * await addXP('test_completed', 100);
 * ```
 *
 * Benefícios da nova API:
 * - ✅ Não precisa passar userId (autenticação no backend)
 * - ✅ Não precisa passar currentXP (backend calcula)
 * - ✅ Validações centralizadas no backend
 * - ✅ Hooks com estados de loading/error
 *
 * Sprint 2: Gamificação (LEGACY)
 *
 * Hook para adicionar XP, desbloquear conquistas e atualizar nível
 */

import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase-client';
import { XPSource, XP_VALUES, shouldGainXP, calculateLevel } from '@/types/gamification';
import { Achievement } from '@/types/gamification';
import { toast } from 'sonner';

export function useXP() {
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Adiciona XP ao usuário
   */
  const addXP = useCallback(async (
    userId: string,
    source: XPSource,
    currentXP: number,
    lastXpGain?: string | null
  ): Promise<{ newXP: number; leveledUp: boolean; newLevel: number } | null> => {
    setIsProcessing(true);

    try {
      // Verificar se deve ganhar XP (evitar spam de journal_entry no mesmo dia)
      if (!shouldGainXP(source, lastXpGain)) {
        setIsProcessing(false);
        return null;
      }

      const xpToAdd = XP_VALUES[source];
      const newXP = currentXP + xpToAdd;

      // Calcular nível
      const oldLevel = calculateLevel(currentXP);
      const newLevel = calculateLevel(newXP);
      const leveledUp = newLevel.level > oldLevel.level;

      // Atualizar no banco
      const { error } = await supabase
        .from('profiles')
        .update({
          xp: newXP,
          level: newLevel.level,
          last_xp_gain: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        console.error('Erro ao adicionar XP:', error);
        toast.error('Erro ao processar XP');
        setIsProcessing(false);
        return null;
      }

      // Notificação de sucesso
      toast.success(`+${xpToAdd} XP`, {
        description: getXPSourceLabel(source),
        duration: 2000,
      });

      // Notificação de Level Up
      if (leveledUp) {
        toast.success(`🎉 Level Up! Nível ${newLevel.level}`, {
          description: `Você é agora ${newLevel.title}!`,
          duration: 4000,
        });
      }

      setIsProcessing(false);
      return {
        newXP,
        leveledUp,
        newLevel: newLevel.level
      };
    } catch (error) {
      console.error('Erro no addXP:', error);
      toast.error('Erro ao processar XP');
      setIsProcessing(false);
      return null;
    }
  }, []);

  /**
   * Desbloqueia uma conquista
   */
  const unlockAchievement = useCallback(async (
    userId: string,
    achievement: Achievement,
    currentAchievements: Achievement[]
  ): Promise<Achievement[] | null> => {
    setIsProcessing(true);

    try {
      // Marcar como desbloqueada
      const updatedAchievement = {
        ...achievement,
        unlockedAt: new Date().toISOString()
      };

      // Atualizar array de conquistas
      const updatedAchievements = currentAchievements.map((a) =>
        a.id === achievement.id ? updatedAchievement : a
      );

      // Salvar no banco
      const { error } = await supabase
        .from('profiles')
        .update({
          achievements: updatedAchievements
        })
        .eq('id', userId);

      if (error) {
        console.error('Erro ao desbloquear conquista:', error);
        toast.error('Erro ao desbloquear conquista');
        setIsProcessing(false);
        return null;
      }

      // Notificação
      toast.success(`🏆 Conquista Desbloqueada!`, {
        description: `${achievement.icon} ${achievement.title} (+${achievement.xpReward} XP)`,
        duration: 5000,
      });

      setIsProcessing(false);
      return updatedAchievements;
    } catch (error) {
      console.error('Erro no unlockAchievement:', error);
      toast.error('Erro ao desbloquear conquista');
      setIsProcessing(false);
      return null;
    }
  }, []);

  /**
   * Atualiza progresso de uma conquista
   */
  const updateAchievementProgress = useCallback(async (
    userId: string,
    achievementId: string,
    progress: { current: number; total: number },
    currentAchievements: Achievement[]
  ): Promise<{ achievements: Achievement[]; unlocked?: Achievement } | null> => {
    try {
      // Encontrar conquista
      const achievement = currentAchievements.find((a) => a.id === achievementId);
      if (!achievement) return null;

      // Já foi desbloqueada?
      if (achievement.unlockedAt) return null;

      // Atualizar progresso
      const updatedAchievement = {
        ...achievement,
        progress
      };

      let updatedAchievements = currentAchievements.map((a) =>
        a.id === achievementId ? updatedAchievement : a
      );

      // Verificar se completou
      if (progress.current >= progress.total) {
        // Desbloquear automaticamente
        const result = await unlockAchievement(userId, updatedAchievement, updatedAchievements);
        if (result) {
          return {
            achievements: result,
            unlocked: updatedAchievement
          };
        }
      } else {
        // Apenas salvar progresso
        const { error } = await supabase
          .from('profiles')
          .update({
            achievements: updatedAchievements
          })
          .eq('id', userId);

        if (error) {
          console.error('Erro ao atualizar progresso:', error);
          return null;
        }
      }

      return { achievements: updatedAchievements };
    } catch (error) {
      console.error('Erro no updateAchievementProgress:', error);
      return null;
    }
  }, [unlockAchievement]);

  return {
    addXP,
    unlockAchievement,
    updateAchievementProgress,
    isProcessing
  };
}

/**
 * Helper: Label amigável para fonte de XP
 */
function getXPSourceLabel(source: XPSource): string {
  const labels: Record<XPSource, string> = {
    test_completed: 'Teste completado',
    journal_entry: 'Entrada no diário',
    streak_milestone: 'Marco de streak',
    content_read: 'Conteúdo lido',
    challenge_completed: 'Desafio completado',
    share_result: 'Resultado compartilhado',
    achievement_unlocked: 'Conquista desbloqueada'
  };

  return labels[source] || 'XP ganho';
}
