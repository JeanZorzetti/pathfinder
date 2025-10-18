/**
 * Pathfinder API Client
 * Centralizes all backend API calls with JWT authentication
 */

import axios, { AxiosInstance, AxiosError } from 'axios';

// Determine API URL based on environment
const getApiBaseUrl = (): string => {
  // Production: use pathback.roilabs.com.br
  if (window.location.hostname === 'pathfinder.roilabs.com.br') {
    return 'https://pathback.roilabs.com.br/api/v1';
  }

  // Environment variable (for custom deployments)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Development: localhost
  return 'http://localhost:3001/api/v1';
};

const API_BASE_URL = getApiBaseUrl();

// Debug: Log the API URL being used
console.log('🔧 API Base URL:', API_BASE_URL);
console.log('🔧 Hostname:', window.location.hostname);

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

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pathfinder_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config;

    // If 401 and we have a refresh token, try to refresh
    if (error.response?.status === 401 && originalRequest) {
      const refreshToken = localStorage.getItem('pathfinder_refresh_token');

      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const newToken = response.data.access_token;
          localStorage.setItem('pathfinder_token', newToken);

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return axiosInstance(originalRequest);
        } catch {
          // Refresh failed, logout
          localStorage.removeItem('pathfinder_token');
          localStorage.removeItem('pathfinder_refresh_token');
          localStorage.removeItem('pathfinder_user');
          window.location.href = '/auth';
        }
      }
    }

    return Promise.reject(error);
  }
);

class PathfinderAPIClient {
  /**
   * Generic GET request
   */
  private async get<T>(endpoint: string): Promise<T> {
    const response = await axiosInstance.get<T>(endpoint);
    return response.data;
  }

  /**
   * Generic POST request
   */
  private async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await axiosInstance.post<T>(endpoint, data);
    return response.data;
  }

  /**
   * Generic PATCH request
   */
  private async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await axiosInstance.patch<T>(endpoint, data);
    return response.data;
  }

  /**
   * Generic DELETE request
   */
  private async delete<T>(endpoint: string): Promise<T> {
    const response = await axiosInstance.delete<T>(endpoint);
    return response.data;
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

  // ==================== Users ====================

  /**
   * Get current user profile
   */
  async getUserProfile() {
    return this.get('/users/profile');
  }

  /**
   * Update user profile
   */
  async updateUserProfile(data: {
    full_name?: string;
    mbti_type?: string;
    streak_current?: number;
    streak_longest?: number;
    last_visit?: string;
    visit_history?: string[];
    achievements?: any[];
    comparison_code?: string;
    consumed_content?: string[];
    current_challenge?: any;
  }) {
    return this.patch('/users/profile', data);
  }

  /**
   * Get user subscription status
   */
  async getUserSubscription() {
    return this.get('/users/subscription');
  }

  // ==================== Personality Tests ====================

  /**
   * Get user's test results
   */
  async getMyTestResults(framework?: string) {
    const query = framework ? `?framework=${framework}` : '';
    return this.get(`/personality-tests/my-results${query}`);
  }

  /**
   * Get specific test result
   */
  async getTestResult(testResultId: string) {
    return this.get(`/personality-tests/results/${testResultId}`);
  }

  /**
   * Save a pre-calculated test result (after user completes test client-side)
   */
  async saveCalculatedTestResult(data: {
    framework: string;
    typeCode: string;
    resultData: any;
  }) {
    return this.post('/personality-tests/save-result', data);
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

// Export axios instance for direct use in authService
export { axiosInstance };

// Export singleton instance
export const api = new PathfinderAPIClient();

// Export class for testing
export { PathfinderAPIClient };
