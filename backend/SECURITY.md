# 🛡️ Pathfinder Backend - Segurança

Este documento descreve as medidas de segurança implementadas no backend do Pathfinder.

## 📋 Índice

1. [Rate Limiting](#rate-limiting)
2. [Security Headers (Helmet)](#security-headers)
3. [CORS](#cors)
4. [Input Validation](#input-validation)
5. [Authentication](#authentication)
6. [Variáveis de Ambiente](#variáveis-de-ambiente)
7. [Checklist de Deploy](#checklist-de-deploy)

---

## 🚦 Rate Limiting

### Implementação

O Pathfinder usa **@nestjs/throttler** com 3 níveis de proteção:

```typescript
{
  short: {
    ttl: 1000,    // 1 segundo
    limit: 3      // 3 requests/segundo
  },
  medium: {
    ttl: 10000,   // 10 segundos
    limit: 20     // 20 requests/10s
  },
  long: {
    ttl: 60000,   // 1 minuto
    limit: 100    // 100 requests/minuto (configurável)
  }
}
```

### Configuração

Defina no `.env`:

```bash
RATE_LIMIT_MAX=100  # Máximo de requests por minuto
```

### Exceções

Para desabilitar rate limiting em endpoints específicos, use o decorator `@SkipThrottle()`:

```typescript
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Get('public-endpoint')
publicEndpoint() {
  return { message: 'Este endpoint não tem rate limit' };
}
```

### Headers de Resposta

Quando o rate limit é aplicado, o cliente recebe:

- `X-RateLimit-Limit`: Limite total
- `X-RateLimit-Remaining`: Requests restantes
- `X-RateLimit-Reset`: Timestamp do reset

Se exceder o limite:
- **Status**: `429 Too Many Requests`
- **Mensagem**: `ThrottlerException: Too Many Requests`

---

## 🔒 Security Headers (Helmet)

### Headers Configurados

O Helmet adiciona os seguintes headers de segurança:

#### 1. **Content-Security-Policy (CSP)**
Previne ataques XSS controlando quais recursos podem ser carregados:

```
Content-Security-Policy:
  default-src 'self';
  style-src 'self' 'unsafe-inline';
  script-src 'self';
  img-src 'self' data: https:;
```

#### 2. **Strict-Transport-Security (HSTS)**
Força HTTPS por 1 ano:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

#### 3. **X-Frame-Options**
Previne clickjacking:

```
X-Frame-Options: SAMEORIGIN
```

#### 4. **X-Content-Type-Options**
Previne MIME sniffing:

```
X-Content-Type-Options: nosniff
```

#### 5. **X-DNS-Prefetch-Control**
Controla DNS prefetching:

```
X-DNS-Prefetch-Control: off
```

#### 6. **Referrer-Policy**
Controla informações de referer:

```
Referrer-Policy: no-referrer
```

---

## 🌐 CORS (Cross-Origin Resource Sharing)

### Configuração Atual

```typescript
{
  origin: [
    'http://localhost:5173',              // Dev local
    'https://pathfinder.roilabs.com.br'   // Produção
  ],
  credentials: true,                       // Permite cookies
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
  maxAge: 3600                             // Cache preflight por 1 hora
}
```

### Adicionar Nova Origem

No `.env`:

```bash
FRONTEND_URL=http://localhost:5173
VERCEL_FRONTEND_URL=https://pathfinder.roilabs.com.br
```

---

## ✅ Input Validation

### ValidationPipe Global

Todas as requests passam por validação rigorosa:

```typescript
new ValidationPipe({
  whitelist: true,              // Remove propriedades não definidas
  forbidNonWhitelisted: true,   // Rejeita propriedades extras
  transform: true,               // Transforma tipos automaticamente
  disableErrorMessages: NODE_ENV === 'production'  // Oculta detalhes em prod
})
```

### Exemplo de DTO

```typescript
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsString()
  @MaxLength(100)
  name: string;
}
```

### Comportamento

- ❌ **Propriedades extras**: Rejeitadas com erro `400 Bad Request`
- ❌ **Tipos inválidos**: Rejeitados automaticamente
- ✅ **Tipos corretos**: Convertidos automaticamente (ex: string `"123"` → number `123`)

---

## 🔐 Authentication

### JWT Tokens

O Pathfinder usa **JWT (JSON Web Tokens)** para autenticação:

#### Access Token
- **Validade**: 7 dias (configurável)
- **Uso**: Autenticação de requests
- **Header**: `Authorization: Bearer <token>`

#### Refresh Token
- **Validade**: 30 dias (configurável)
- **Uso**: Renovar access tokens expirados
- **Storage**: HttpOnly cookie (mais seguro)

### Configuração de Secrets

⚠️ **IMPORTANTE**: Em produção, use secrets fortes!

```bash
# Gerar secrets seguros:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

No `.env` de produção:

```bash
JWT_SECRET=<secret_gerado_64_caracteres>
JWT_REFRESH_SECRET=<outro_secret_diferente_64_caracteres>
JWT_EXPIRATION=7d
JWT_REFRESH_EXPIRATION=30d
```

### Proteção de Rotas

Por padrão, todas as rotas requerem autenticação. Para tornar uma rota pública:

```typescript
import { Public } from '@/modules/auth/decorators/public.decorator';

@Public()
@Get('health')
healthCheck() {
  return { status: 'ok' };
}
```

---

## 🔑 Variáveis de Ambiente

### Secrets Críticos

Estas variáveis **NUNCA** devem ser commitadas:

```bash
# JWT - Gerar com: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=seu_secret_aqui_minimo_32_caracteres
JWT_REFRESH_SECRET=outro_secret_diferente_32_chars

# Database
DATABASE_PASSWORD=senha_forte_do_postgres
```

### Configuração de Segurança

```bash
# Bcrypt (hashing de senhas)
BCRYPT_SALT_ROUNDS=10          # 10 = bom balanço segurança/performance

# Rate Limiting
RATE_LIMIT_MAX=100             # Requests por minuto
RATE_LIMIT_TTL=60              # Janela em segundos

# Database SSL
DATABASE_SSL=false             # true se PostgreSQL usar SSL
```

---

## 📝 Checklist de Deploy em Produção

### Antes do Deploy

- [ ] Gerar novos JWT secrets fortes (32+ caracteres)
- [ ] Configurar `DATABASE_SSL=true` se aplicável
- [ ] Definir `NODE_ENV=production`
- [ ] Configurar CORS com domínio correto do frontend
- [ ] Revisar rate limits (ajustar se necessário)
- [ ] Verificar logs de erro (remover console.log)

### Após o Deploy

- [ ] Testar autenticação (login/register)
- [ ] Testar rate limiting (fazer 100+ requests)
- [ ] Verificar security headers com https://securityheaders.com
- [ ] Testar CORS com frontend em produção
- [ ] Monitorar logs de erro no Easypanel

### Ferramentas de Teste

#### 1. **Security Headers**
```bash
curl -I https://pathback.roilabs.com.br/api/v1/health
```

Verifique se aparecem:
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Strict-Transport-Security`

#### 2. **Rate Limiting**
```bash
# Fazer 10 requests rápidas
for i in {1..10}; do
  curl https://pathback.roilabs.com.br/api/v1/health
done
```

Após ~5 requests, deve retornar `429 Too Many Requests`.

#### 3. **CORS**
```bash
curl -H "Origin: https://exemplo.com" \
     -I https://pathback.roilabs.com.br/api/v1/health
```

Origem não permitida não deve ter header `Access-Control-Allow-Origin`.

---

## 🚨 Vulnerabilidades Conhecidas

### Atualizações de Dependências

Para verificar vulnerabilidades:

```bash
npm audit

# Fix automático (cuidado com breaking changes):
npm audit fix

# Fix forçado (pode quebrar o app):
npm audit fix --force
```

### Atualizações Recomendadas

```bash
# Atualizar dependências menores (patches):
npm update

# Atualizar dependências maiores:
npm outdated
npm install <package>@latest
```

---

## 📞 Contato e Reporte de Segurança

Se encontrar uma vulnerabilidade de segurança:

1. **NÃO** abra uma issue pública
2. Envie email para: security@roilabs.com.br
3. Inclua:
   - Descrição da vulnerabilidade
   - Steps to reproduce
   - Impacto potencial
   - Sugestão de fix (opcional)

---

## 📚 Recursos

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NestJS Security](https://docs.nestjs.com/security/helmet)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Rate Limiting Guide](https://www.cloudflare.com/learning/bots/what-is-rate-limiting/)

---

**Última atualização**: 2025-01-16
