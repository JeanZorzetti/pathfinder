/**
 * React hooks for Pathfinder API
 */

import { useState, useEffect, useCallback } from 'react';
import { api, XPSource } from '@/lib/api';

// ==================== useProgress ====================

export function useProgress() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addXP = useCallback(async (source: XPSource, amount: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.addXP(source, amount);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getProgressStats();
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getHistory = useCallback(async (limit = 50) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getXPHistory(limit);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { addXP, getStats, getHistory, loading, error };
}

// ==================== useDashboard ====================

export function useDashboard() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getDashboard();
      setDashboard(data);
      return data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Erro ao carregar dashboard';
      setError(errorMessage);
      console.warn('Dashboard fetch failed:', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Don't auto-fetch - let Dashboard component decide when to fetch
  // useEffect(() => {
  //   fetchDashboard();
  // }, [fetchDashboard]);

  return { data: dashboard, loading, error, refetch: fetchDashboard };
}

export function useDashboardStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getDashboardStats();
      setStats(data);
      return data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Erro ao carregar estatísticas';
      setError(errorMessage);
      console.warn('Dashboard stats fetch failed:', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Don't auto-fetch - let component decide when to fetch
  // useEffect(() => {
  //   fetchStats();
  // }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}

// ==================== useChallenges ====================

export function useChallenges() {
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentChallenge = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCurrentChallenge();
      setChallenge(data);
      return data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Erro ao carregar desafio';
      setError(errorMessage);
      console.warn('Challenge fetch failed:', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const completeDay = useCallback(async (day: number) => {
    setError(null);
    try {
      const result = await api.completeChallengeDay(day);
      // Refetch challenge after completing day
      await fetchCurrentChallenge();
      return result;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Erro ao completar dia do desafio';
      setError(errorMessage);
      return null;
    }
  }, [fetchCurrentChallenge]);

  const getHistory = useCallback(async (limit = 10) => {
    setError(null);
    try {
      const result = await api.getChallengeHistory(limit);
      return result;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Erro ao carregar histórico';
      setError(errorMessage);
      return null;
    }
  }, []);

  const getStats = useCallback(async () => {
    setError(null);
    try {
      const result = await api.getChallengeStats();
      return result;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Erro ao carregar estatísticas';
      setError(errorMessage);
      return null;
    }
  }, []);

  // Don't auto-fetch - let Dashboard component decide when to fetch
  // useEffect(() => {
  //   fetchCurrentChallenge();
  // }, [fetchCurrentChallenge]);

  return {
    currentChallenge: challenge,
    loading,
    error,
    completeDay,
    getHistory,
    getStats,
    getCurrentChallenge: fetchCurrentChallenge,
  };
}

// ==================== useJournal ====================

export function useJournal() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEntry = useCallback(async (
    content: string,
    mood?: string,
    tags?: string[]
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.createJournalEntry(content, mood, tags);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getEntries = useCallback(async (page = 1, limit = 20) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getJournalEntries(page, limit);
      setEntries(result.entries || []);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEntry = useCallback(async (
    id: string,
    content: string,
    mood?: string,
    tags?: string[]
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.updateJournalEntry(id, content, mood, tags);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEntry = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.deleteJournalEntry(id);
      // Refetch entries after deletion - inline to avoid circular dependency
      const entriesResult = await api.getJournalEntries(1, 20);
      setEntries(entriesResult.entries || []);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies - uses only setters which are stable

  const getDailyPrompt = useCallback(async (mbtiType?: string) => {
    setError(null);
    try {
      const result = await api.getDailyPrompt(mbtiType);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  const getStats = useCallback(async () => {
    setError(null);
    try {
      const result = await api.getJournalStats();
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    entries,
    loading,
    error,
    createEntry,
    getEntries,
    updateEntry,
    deleteEntry,
    getDailyPrompt,
    getStats,
  };
}

// ==================== useComparison ====================

export function useComparison() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCode = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getComparisonCode();
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const compareWith = useCallback(async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.compareWith(code);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getHistory = useCallback(async (limit = 20) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getComparisonHistory(limit);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getComparisonStats();
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getCode, compareWith, getHistory, getStats, loading, error };
}
