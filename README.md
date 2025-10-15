# 🧭 Pathfinder - Plataforma de Autoconhecimento

Plataforma completa de testes de personalidade e autoconhecimento com MBTI, Big Five e Eneagrama.

## 📁 Estrutura do Projeto

Este é um monorepo contendo o backend (NestJS) e o frontend (React + Vite) da aplicação Pathfinder.

```
pathfinder-main/
├── backend/          # API NestJS + PostgreSQL
│   ├── src/
│   ├── package.json
│   └── README.md     # Documentação detalhada do backend
│
├── frontend/         # App React + Vite + TypeScript
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md     # Documentação do frontend
│
└── README.md         # Este arquivo
```

## 🚀 Quick Start

### Backend (NestJS)

```bash
cd backend
npm install
npm run seed          # Popular banco de dados
npm run start:dev     # Servidor em http://localhost:3001
```

**Documentação completa:** [backend/README.md](backend/README.md)

### Frontend (React)

```bash
cd frontend
npm install
npm run dev          # App em http://localhost:5173
```

**Documentação completa:** [frontend/README.md](frontend/README.md)

## 🎯 Features

### ✅ Backend Completo
- **3 Frameworks de Personalidade:** MBTI, Big Five, Eneagrama
- **31 Tipos de Personalidade:** 16 MBTI + 6 Big Five + 9 Eneagrama
- **97 Questões:** 20 MBTI + 50 Big Five + 27 Eneagrama
- **Autenticação JWT:** Sistema nativo sem Supabase
- **API RESTful:** Documentação Swagger em `/api/docs`
- **PostgreSQL:** Banco relacional na VPS
- **TypeORM:** ORM com migrations e seeds
- **SEO Programático:** Metadados completos para cada tipo

### 🔄 Frontend (Em desenvolvimento)
- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- React Router DOM
- Integração com API do backend

## 📊 Conteúdo do Banco de Dados

Após rodar `npm run seed` no backend:

| Framework | Tipos | Questões | Descrição |
|-----------|-------|----------|-----------|
| **MBTI** | 16 | 20 | Myers-Briggs Type Indicator (4 dimensões) |
| **Big Five** | 6 | 50 | OCEAN (5 dimensões de personalidade) |
| **Eneagrama** | 9 | 27 | Sistema de 9 tipos motivacionais |
| **TOTAL** | **31** | **97** | 3 frameworks completos |

## 🛠️ Stack Tecnológico

### Backend
- **Framework:** NestJS 10.x
- **Linguagem:** TypeScript 5.x
- **Banco de Dados:** PostgreSQL 16
- **ORM:** TypeORM
- **Autenticação:** JWT + bcrypt
- **Validação:** class-validator, class-transformer
- **Documentação:** Swagger/OpenAPI

### Frontend
- **Framework:** React 18.x
- **Build Tool:** Vite 6.x
- **Linguagem:** TypeScript 5.x
- **Estilização:** Tailwind CSS 3.x
- **UI Components:** shadcn/ui
- **Roteamento:** React Router DOM 7.x
- **HTTP Client:** Axios (planejado)

## 📖 Documentação Completa

- **Backend:** [backend/README.md](backend/README.md)
  - Instalação e configuração
  - Estrutura da API
  - Endpoints disponíveis
  - Deploy no Easypanel
  - Integração com frontend

- **Deploy:** [backend/DEPLOY_EASYPANEL.md](backend/DEPLOY_EASYPANEL.md)
  - Guia passo a passo para deploy na VPS
  - Configuração do banco de dados
  - Variáveis de ambiente

- **Integração Frontend:** [backend/FRONTEND_INTEGRATION.md](backend/FRONTEND_INTEGRATION.md)
  - Exemplos de código TypeScript
  - Axios client com interceptors
  - Serviços de autenticação e testes
  - Refresh token automático

## 🌐 Ambiente de Desenvolvimento

### Portas
- **Backend:** `http://localhost:3001`
- **Frontend:** `http://localhost:5173`
- **Swagger Docs:** `http://localhost:3001/api/docs`

### Banco de Dados (VPS)
- **Host:** `31.97.23.166:5432`
- **Database:** `PathPost`
- **User:** `PathPost`

## 🎯 Status do Projeto

- ✅ Backend MVP completo e funcional
- ✅ 3 frameworks de personalidade implementados
- ✅ Autenticação JWT nativa
- ✅ Sistema de testes e resultados
- ✅ Seeds com dados completos em português
- ✅ Documentação completa de deploy
- ✅ Guia de integração com frontend
- 🔄 Frontend em desenvolvimento
- ⏳ Dashboard admin (planejado)
- ⏳ Analytics e métricas (planejado)

## 👨‍💻 Desenvolvimento

### Executar Backend
```bash
cd backend
npm run start:dev
```

### Executar Frontend
```bash
cd frontend
npm run dev
```

### Executar Ambos
Abra dois terminais:
```bash
# Terminal 1
cd backend && npm run start:dev

# Terminal 2
cd frontend && npm run dev
```

## 📝 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

---

**Desenvolvido com ❤️ para ajudar pessoas a se conhecerem melhor**
