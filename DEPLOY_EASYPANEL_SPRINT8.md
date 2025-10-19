# 🚀 Deploy Sprint 8 no Easypanel

## Passo 1: Fazer commit e push do código

Primeiro, vamos commitar o arquivo de migration que acabamos de criar:

```sh
git add backend/run-sprint8-migration.js
git add backend/src/
git add backend/package.json
git commit -m "feat(backend): Sprint 8 - Content Library + Comparison Persistence"
git push origin main
```

## Passo 2: Fazer pull no Easypanel

No Easypanel, abra o terminal do seu serviço backend e execute:

```sh
cd /app
git pull origin main
```

## Passo 3: Executar a migration

```sh
cd /app/backend
NODE_PATH=/app/node_modules node run-sprint8-migration.js
```

## Passo 4: Executar o seed de conteúdo

Agora execute o seed completo com os 40+ conteúdos:

```sh
cd /app && npm run seed:content
```

**Se o comando `npm run seed:content` não existir**, execute manualmente:

```sh
cd /app && NODE_PATH=/app/node_modules ts-node -r tsconfig-paths/register src/database/scripts/seed-content-library.script.ts
```

## Passo 5: Verificar deployment

Execute no terminal do Easypanel:

```sh
# Verificar tabelas criadas
node -e "
const { Client } = require('pg');
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
client.connect().then(async () => {
  const result = await client.query(\`
    SELECT
      (SELECT COUNT(*) FROM content_library) as content_count,
      (SELECT COUNT(*) FROM comparison_codes) as codes_count,
      (SELECT COUNT(*) FROM comparison_history) as history_count
  \`);
  console.log('📊 Database Status:');
  console.log('  Content Library:', result.rows[0].content_count);
  console.log('  Comparison Codes:', result.rows[0].codes_count);
  console.log('  Comparison History:', result.rows[0].history_count);
  await client.end();
});
"
```

## Passo 6: Testar API

Use curl ou Postman para testar:

```sh
# Obter token (faça login primeiro)
TOKEN="seu_token_jwt"

# Testar content library
curl -H "Authorization: Bearer $TOKEN" \
  https://pathfinder.roilabs.com.br/api/v1/content-library/recommended

# Testar comparison
curl -H "Authorization: Bearer $TOKEN" \
  https://pathfinder.roilabs.com.br/api/v1/comparison/code
```

## ✅ Checklist

- [ ] Migration executada sem erros
- [ ] Seed executado com sucesso (40+ conteúdos)
- [ ] Verificação do banco mostra dados inseridos
- [ ] Endpoint `/content-library/recommended` funciona
- [ ] Endpoint `/comparison/code` funciona

## 🐛 Troubleshooting

### Erro: "Cannot find module 'pg'"
```sh
cd /app && npm install
```

### Erro: "ECONNREFUSED"
Verifique as variáveis de ambiente no Easypanel:
- DB_HOST
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
- DB_NAME
- DB_SSL=true

### Seed retorna "0 items inserted"
Isso é normal se os dados já existem. O seed é idempotente.

---

**Após completar todos os passos, me confirme se deu certo para eu marcar o Sprint 8 como deployado em produção!**
