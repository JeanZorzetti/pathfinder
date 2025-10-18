import { axiosInstance } from '@/lib/api';

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    subscriptionStatus: string;
  };
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  subscriptionStatus: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'pathfinder_token';
  private readonly REFRESH_TOKEN_KEY = 'pathfinder_refresh_token';
  private readonly USER_KEY = 'pathfinder_user';

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    this.setSession(response.data);
    return response.data;
  }

  /**
   * Login user
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
    this.setSession(response.data);
    return response.data;
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Get current access token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axiosInstance.post<{ access_token: string }>('/auth/refresh', {
      refresh_token: refreshToken,
    });

    const newToken = response.data.access_token;
    localStorage.setItem(this.TOKEN_KEY, newToken);

    return newToken;
  }

  /**
   * Set session data in localStorage
   */
  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResponse.access_token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, authResponse.refresh_token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
  }

  /**
   * Verify if token is valid
   */
  async verifyToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;

      await axiosInstance.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return true;
    } catch {
      return false;
    }
  }
}

export const authService = new AuthService();
