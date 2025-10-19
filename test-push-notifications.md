# 🔔 Testando Push Notifications - Pathfinder

## ✅ Migração Concluída

A tabela `push_subscriptions` foi criada com sucesso no banco de dados.

---

## 📋 Próximos Passos para Testar

### 1️⃣ Verificar Backend em Produção

Primeiro, confirme que o backend está rodando com o código atualizado:

```bash
curl https://pathfinder-backend.easypanel.host/api/v1/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-19T..."
}
```

---

### 2️⃣ Fazer Login e Obter Token JWT

```bash
curl -X POST https://pathfinder-backend.easypanel.host/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@pathfinder.com",
    "password": "sua-senha"
  }'
```

**Salve o token retornado:**
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 3️⃣ Testar Endpoint de Subscribe (Frontend fará isso)

O frontend vai fazer isso automaticamente quando o usuário permitir notificações, mas você pode testar manualmente:

```bash
curl -X POST https://pathfinder-backend.easypanel.host/api/v1/notifications/subscribe \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "https://fcm.googleapis.com/fcm/send/exemplo123",
    "keys": {
      "p256dh": "BCVxsr7N_eNgVRqvHtD0zTZsEc6-VV-JvLexhqUzORcx...",
      "auth": "BTBZMqHH6r4Tts7J_aSIgg"
    }
  }'
```

**Resposta esperada:**
```json
{
  "id": "uuid-da-subscription",
  "userId": "uuid-do-usuario",
  "endpoint": "https://fcm.googleapis.com/fcm/send/exemplo123",
  "createdAt": "2025-01-19T..."
}
```

---

### 4️⃣ Verificar Subscriptions do Usuário

```bash
curl -X GET https://pathfinder-backend.easypanel.host/api/v1/notifications/subscriptions \
  -H "Authorization: Bearer $TOKEN"
```

**Resposta esperada:**
```json
[
  {
    "id": "uuid",
    "endpoint": "https://fcm.googleapis.com/fcm/send/...",
    "createdAt": "2025-01-19T..."
  }
]
```

---

### 5️⃣ Enviar Notificação de Teste

```bash
curl -X POST https://pathfinder-backend.easypanel.host/api/v1/notifications/test \
  -H "Authorization: Bearer $TOKEN"
```

**Resposta esperada:**
```json
{
  "message": "Test notification sent to 1 device(s)",
  "results": [
    { "success": true }
  ]
}
```

---

### 6️⃣ Enviar Notificação Personalizada

```bash
curl -X POST https://pathfinder-backend.easypanel.host/api/v1/notifications/send \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "🎯 Pathfinder",
    "body": "Você tem um novo insight disponível!",
    "icon": "/icons/icon-192x192.png",
    "url": "/dashboard",
    "tag": "test-notification"
  }'
```

---

## 🌐 Teste Real no Navegador

### Passo 1: Acesse o Frontend
```
https://pathfinder-main.vercel.app
```

### Passo 2: Faça Login

### Passo 3: Procure o Componente de Notificações
- O componente `NotificationSettings` deve aparecer em algum lugar da UI
- Ou você pode adicionar temporariamente no Dashboard para testar

### Passo 4: Clique em "Ativar Notificações"
- O navegador vai pedir permissão
- Aceite a permissão
- O Service Worker vai registrar a subscription no backend

### Passo 5: Envie uma Notificação de Teste
- Use o curl do passo 5️⃣ acima
- A notificação deve aparecer no navegador!

---

## 🔍 Verificar no Banco de Dados

```sql
-- Ver todas as subscriptions
SELECT
  ps.id,
  ps.user_id,
  u.email,
  ps.endpoint,
  ps.created_at
FROM push_subscriptions ps
JOIN users u ON u.id = ps.user_id
ORDER BY ps.created_at DESC;

-- Contar subscriptions por usuário
SELECT
  u.email,
  COUNT(ps.id) as total_subscriptions
FROM users u
LEFT JOIN push_subscriptions ps ON ps.user_id = u.id
GROUP BY u.id, u.email
ORDER BY total_subscriptions DESC;
```

---

## 🐛 Troubleshooting

### Erro: "Endpoint not found"
- ✅ Verifique se o usuário fez subscribe primeiro
- ✅ Confirme que o token JWT é válido

### Erro: "VAPID keys not configured"
- ✅ Verifique se as variáveis de ambiente estão no Easypanel:
  - `VAPID_PUBLIC_KEY`
  - `VAPID_PRIVATE_KEY`
  - `VAPID_SUBJECT`

### Notificação não aparece no navegador
- ✅ Verifique se o Service Worker está registrado (`Application > Service Workers` no DevTools)
- ✅ Confirme que as permissões de notificação foram concedidas
- ✅ Teste em modo anônimo (algumas extensões bloqueiam notificações)

### Erro: "Invalid VAPID key"
- ✅ Confirme que a chave pública no frontend (`pushNotifications.ts`) é a mesma do backend

---

## 📊 Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/v1/notifications/subscribe` | Registrar nova subscription |
| POST | `/api/v1/notifications/unsubscribe` | Remover subscription |
| GET | `/api/v1/notifications/subscriptions` | Listar subscriptions do usuário |
| POST | `/api/v1/notifications/test` | Enviar notificação de teste |
| POST | `/api/v1/notifications/send` | Enviar notificação personalizada |

Todos os endpoints requerem autenticação JWT via header `Authorization: Bearer <token>`.

---

## 🎯 Próximos Passos (Opcional)

1. **Integrar NotificationSettings no Dashboard**
   - Adicionar botão "Configurar Notificações" no menu

2. **Criar Notificações Automáticas (Cron Jobs)**
   - Daily Insights às 9h
   - Challenge Reminders às 18h
   - Streak Reminders às 23h

3. **Adicionar Event Hooks**
   - Notificação quando completar desafio
   - Notificação quando desbloquear achievement
   - Notificação de streak quebrado

4. **Analytics**
   - Taxa de opt-in de notificações
   - Taxa de cliques em notificações
   - Dispositivos mais usados

---

## ✅ Checklist de Verificação

- [ ] Backend está rodando em produção
- [ ] Variáveis VAPID configuradas no Easypanel
- [ ] Endpoint `/subscribe` retorna 200
- [ ] Endpoint `/test` envia notificação
- [ ] Notificação aparece no navegador
- [ ] Banco de dados registra subscriptions
- [ ] Service Worker está ativo
- [ ] Permissões concedidas no navegador

---

**Status:** Pronto para testar! 🚀
