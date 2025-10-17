/**
 * Pathfinder API Client
 * Centralizes all backend API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

export type XPSource =
  | 'test_completed'
  | 'journal_entry'
  | 'challenge_day_completed'
  | 'challenge_completed'
  | 'content_consumed'
  | 'daily_login';

export interface ApiError {
  message: string;
  error?: string;
  statusCode: number;
}

class PathfinderAPIClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic GET request
   */
  private async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  /**
   * Generic POST request
   */
  private async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  /**
   * Generic PATCH request
   */
  private async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  /**
   * Generic DELETE request
   */
  private async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  // ==================== Gamification ====================

  /**
   * Add XP to user
   */
  async addXP(source: XPSource, amount: number) {
    return this.post('/progress/xp', { source, amount });
  }

  /**
   * Get XP history
   */
  async getXPHistory(limit: number = 50) {
    return this.get(`/progress/xp/history?limit=${limit}`);
  }

  /**
   * Get progress stats (XP, level, etc.)
   */
  async getProgressStats() {
    return this.get('/progress/stats');
  }

  // ==================== Dashboard ====================

  /**
   * Get full dashboard data
   */
  async getDashboard() {
    return this.get('/dashboard');
  }

  /**
   * Get dashboard stats only
   */
  async getDashboardStats() {
    return this.get('/dashboard/stats');
  }

  /**
   * Get daily insight
   */
  async getDailyInsight() {
    return this.get('/dashboard/insights/daily');
  }

  // ==================== Challenges ====================

  /**
   * Get current challenge
   */
  async getCurrentChallenge() {
    return this.get('/challenges/current');
  }

  /**
   * Complete a challenge day
   */
  async completeChallengeDay(day: number) {
    return this.post('/challenges/complete-day', { day });
  }

  /**
   * Get challenge history
   */
  async getChallengeHistory(limit: number = 10) {
    return this.get(`/challenges/history?limit=${limit}`);
  }

  /**
   * Get challenge stats
   */
  async getChallengeStats() {
    return this.get('/challenges/stats');
  }

  // ==================== Journal ====================

  /**
   * Create journal entry
   */
  async createJournalEntry(content: string, mood?: string, tags?: string[]) {
    return this.post('/journal/entries', { content, mood, tags });
  }

  /**
   * Get journal entries
   */
  async getJournalEntries(page: number = 1, limit: number = 20) {
    return this.get(`/journal/entries?page=${page}&limit=${limit}`);
  }

  /**
   * Get specific journal entry
   */
  async getJournalEntry(id: string) {
    return this.get(`/journal/entries/${id}`);
  }

  /**
   * Update journal entry
   */
  async updateJournalEntry(id: string, content: string, mood?: string, tags?: string[]) {
    return this.patch(`/journal/entries/${id}`, { content, mood, tags });
  }

  /**
   * Delete journal entry
   */
  async deleteJournalEntry(id: string) {
    return this.delete(`/journal/entries/${id}`);
  }

  /**
   * Get daily journal prompt
   */
  async getDailyPrompt(mbtiType?: string) {
    const query = mbtiType ? `?mbtiType=${mbtiType}` : '';
    return this.get(`/journal/prompts/daily${query}`);
  }

  /**
   * Get journal stats
   */
  async getJournalStats() {
    return this.get('/journal/stats');
  }

  // ==================== Comparison ====================

  /**
   * Get or create comparison code
   */
  async getComparisonCode() {
    return this.get('/comparison/code');
  }

  /**
   * Compare with another code
   */
  async compareWith(code: string) {
    return this.post('/comparison/compare', { code });
  }

  /**
   * Get comparison history
   */
  async getComparisonHistory(limit: number = 20) {
    return this.get(`/comparison/history?limit=${limit}`);
  }

  /**
   * Get comparison stats
   */
  async getComparisonStats() {
    return this.get('/comparison/stats');
  }

  // ==================== Health ====================

  /**
   * Check API health
   */
  async healthCheck() {
    return this.get('/health');
  }
}

// Export singleton instance
export const api = new PathfinderAPIClient();

// Export class for testing
export { PathfinderAPIClient };
