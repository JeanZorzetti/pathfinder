-- Verificar se o usuário do token existe
SELECT id, email, mbti_type, created_at
FROM users
WHERE id = 'fc45f21e-0b08-41d3-b4b0-53c50c590dd7';

-- Listar todos os usuários
SELECT id, email, mbti_type, created_at
FROM users
ORDER BY created_at DESC
LIMIT 5;
