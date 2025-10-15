# 🔗 Guia de Integração Frontend → Backend

Este guia mostra como conectar o frontend React/TypeScript do Pathfinder ao backend NestJS.

---

## 📋 Índice

1. [Setup Inicial](#setup-inicial)
2. [Configuração de Variáveis](#configuração-de-variáveis)
3. [Cliente HTTP (Axios)](#cliente-http-axios)
4. [Autenticação JWT](#autenticação-jwt)
5. [Fluxos Principais](#fluxos-principais)
6. [Tipos TypeScript](#tipos-typescript)
7. [Tratamento de Erros](#tratamento-de-erros)
8. [Exemplos Práticos](#exemplos-práticos)

---

## 🚀 Setup Inicial

### 1. Instalar Dependências

```bash
cd frontend
npm install axios
npm install -D @types/axios
```

### 2. Configurar Variáveis de Ambiente

Crie `.env.local` no frontend:

```env
# Development
VITE_API_URL=http://localhost:3001
VITE_API_PREFIX=api/v1

# Production (Vercel)
# VITE_API_URL=https://api.pathfinder.com
```

---

## ⚙️ Configuração de Variáveis

### `src/config/api.ts`

```typescript
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  prefix: import.meta.env.VITE_API_PREFIX || 'api/v1',
  timeout: 30000, // 30 segundos
};

// URL completa da API
export const API_BASE_URL = `${API_CONFIG.baseURL}/${API_CONFIG.prefix}`;
```

---

## 🌐 Cliente HTTP (Axios)

### `src/lib/api-client.ts`

```typescript
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/config/api';

// Criar instância do Axios
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT automaticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para refresh token automático
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Se erro 401 e não é retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('No refresh token');

        // Tentar renovar o token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token } = response.data.data;
        localStorage.setItem('access_token', access_token);

        // Retentar request original com novo token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh falhou, fazer logout
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 🔐 Autenticação JWT

### `src/services/auth.service.ts`

```typescript
import apiClient from '@/lib/api-client';

export interface RegisterDTO {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginDTO {
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
    subscriptionStatus: 'free' | 'premium' | 'enterprise';
  };
}

class AuthService {
  async register(data: RegisterDTO): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/register', data);
    this.saveTokens(response.data.data);
    return response.data.data;
  }

  async login(data: LoginDTO): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', data);
    this.saveTokens(response.data.data);
    return response.data.data;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data.data;
  }

  private saveTokens(data: AuthResponse): void {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export const authService = new AuthService();
```

---

## 📝 Fluxos Principais

### 1. Registro de Usuário

```typescript
// src/pages/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth.service';

export function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await authService.register({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        fullName: formData.get('fullName') as string,
      });

      // Redirecionar para dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      // Mostrar erro para o usuário
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input name="fullName" placeholder="Nome Completo" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Senha" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Criar Conta'}
      </button>
    </form>
  );
}
```

### 2. Login

```typescript
// src/pages/Login.tsx
const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
    await authService.login({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### 3. Listar Frameworks

```typescript
// src/services/personality.service.ts
import apiClient from '@/lib/api-client';

export interface Framework {
  id: string;
  code: 'mbti' | 'bigfive' | 'enneagram';
  name: string;
  description: string;
  shortDescription: string;
}

class PersonalityService {
  async getFrameworks(): Promise<Framework[]> {
    const response = await apiClient.get('/personality-tests/frameworks');
    return response.data.data;
  }

  async getQuestions(frameworkCode: string) {
    const response = await apiClient.get(
      `/personality-tests/frameworks/${frameworkCode}/questions`
    );
    return response.data.data;
  }

  async startTest(frameworkCode: string) {
    const response = await apiClient.post('/personality-tests/start', {
      frameworkCode,
    });
    return response.data.data;
  }

  async submitAnswers(testResultId: string, answers: Array<{ questionId: string; selectedValue: string }>) {
    const response = await apiClient.post(
      `/personality-tests/${testResultId}/submit`,
      { answers }
    );
    return response.data.data;
  }

  async getMyResults() {
    const response = await apiClient.get('/personality-tests/my-results');
    return response.data.data;
  }
}

export const personalityService = new PersonalityService();
```

### 4. Fazer Teste MBTI (Fluxo Completo)

```typescript
// src/pages/TakeMBTITest.tsx
import { useState, useEffect } from 'react';
import { personalityService } from '@/services/personality.service';

export function TakeMBTITestPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [testId, setTestId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTest();
  }, []);

  const loadTest = async () => {
    try {
      // 1. Carregar questões
      const questionsData = await personalityService.getQuestions('mbti');
      setQuestions(questionsData);

      // 2. Iniciar sessão de teste
      const testSession = await personalityService.startTest('mbti');
      setTestId(testSession.id);
    } catch (error) {
      console.error('Failed to load test:', error);
    }
  };

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (!testId) return;

    setLoading(true);
    try {
      // 3. Converter respostas para formato da API
      const answersArray = Object.entries(answers).map(([questionId, selectedValue]) => ({
        questionId,
        selectedValue,
      }));

      // 4. Submeter respostas
      const result = await personalityService.submitAnswers(testId, answersArray);

      // 5. Redirecionar para resultado
      window.location.href = `/results/${result.testResultId}`;
    } catch (error) {
      console.error('Failed to submit test:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Teste MBTI</h1>
      {questions.map((q: any) => (
        <div key={q.id}>
          <p>{q.questionText}</p>
          {q.options.map((opt: any) => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(q.id, opt.value)}
              className={answers[q.id] === opt.value ? 'selected' : ''}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} disabled={loading || Object.keys(answers).length < questions.length}>
        {loading ? 'Processando...' : 'Ver Resultado'}
      </button>
    </div>
  );
}
```

---

## 📦 Tipos TypeScript

### `src/types/api.types.ts`

```typescript
// Tipos do Backend

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  subscriptionStatus: 'free' | 'premium' | 'enterprise';
  createdAt: string;
  updatedAt: string;
}

export interface PersonalityType {
  id: string;
  code: string;
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  relationships: string;
  growth: string;
  traits: Record<string, string>;
}

export interface Question {
  id: string;
  questionText: string;
  dimension: string;
  options: Array<{
    label: string;
    value: string;
    score?: number;
  }>;
  orderIndex: number;
}

export interface TestResult {
  id: string;
  userId: string;
  frameworkId: string;
  personalityTypeId: string | null;
  personalityType?: PersonalityType;
  scores: Record<string, number>;
  status: 'in_progress' | 'completed';
  completedAt: string | null;
  createdAt: string;
}
```

---

## ⚠️ Tratamento de Erros

### `src/lib/error-handler.ts`

```typescript
import { AxiosError } from 'axios';
import { toast } from 'sonner'; // ou sua biblioteca de toast

export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message;

    switch (error.response?.status) {
      case 400:
        toast.error('Dados inválidos: ' + message);
        break;
      case 401:
        toast.error('Não autorizado. Faça login novamente.');
        break;
      case 403:
        toast.error('Acesso negado.');
        break;
      case 404:
        toast.error('Recurso não encontrado.');
        break;
      case 409:
        toast.error('Conflito: ' + message);
        break;
      case 500:
        toast.error('Erro no servidor. Tente novamente mais tarde.');
        break;
      default:
        toast.error('Erro desconhecido: ' + message);
    }

    return message;
  }

  toast.error('Erro inesperado');
  return 'Erro inesperado';
}
```

---

## 💡 Exemplos Práticos

### Hook Customizado para Autenticação

```typescript
// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';

export function useAuth() {
  const [user, setUser] = useState(authService.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return { user, isAuthenticated, login, logout };
}
```

### Protected Route Component

```typescript
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { authService } from '@/services/auth.service';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
```

### Uso no Router

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tests/:framework"
          element={
            <ProtectedRoute>
              <TakeTestPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🎯 Checklist de Integração

- [ ] ✅ Axios instalado e configurado
- [ ] ✅ API_BASE_URL configurada no .env
- [ ] ✅ Cliente HTTP com interceptors
- [ ] ✅ AuthService implementado
- [ ] ✅ PersonalityService implementado
- [ ] ✅ Tipos TypeScript criados
- [ ] ✅ Error handling implementado
- [ ] ✅ Protected routes configuradas
- [ ] ✅ Login/Register funcionando
- [ ] ✅ Teste MBTI funcionando
- [ ] ✅ Resultados exibindo corretamente

---

## 📞 Suporte

Para dúvidas sobre os endpoints da API, consulte:
- **Swagger Docs**: http://localhost:3001/api/docs
- **README Backend**: `backend/README.md`
- **Postman Collection**: (criar se necessário)

**Feito com ❤️ para o Pathfinder MVP**
