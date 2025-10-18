/**
 * Teste de Autenticação em Produção
 * Verifica se o backend está recebendo e processando registros
 */

const https = require('https');

const BACKEND_URL = 'https://pathback.roilabs.com.br';

// Dados de teste
const testUser = {
  email: `teste-${Date.now()}@pathfinder.com`,
  password: 'senha123456',
  fullName: 'Teste Automático API'
};

console.log('🔍 Testando API de Autenticação em Produção');
console.log('━'.repeat(60));
console.log(`Backend: ${BACKEND_URL}`);
console.log(`Email teste: ${testUser.email}`);
console.log('━'.repeat(60));

// Função para fazer POST request
function makeRequest(path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);

    const options = {
      hostname: 'pathback.roilabs.com.br',
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: parsed
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

// Teste 1: Health Check
async function testHealthCheck() {
  console.log('\n📡 Teste 1: Health Check');
  console.log('GET /api/v1/health');

  return new Promise((resolve, reject) => {
    https.get(`${BACKEND_URL}/api/v1/health`, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        if (res.statusCode === 200) {
          console.log('✅ Backend está online!');
          try {
            console.log('Response:', JSON.parse(body));
          } catch (e) {
            console.log('Response:', body);
          }
          resolve(true);
        } else {
          console.log('❌ Backend não está respondendo corretamente');
          console.log('Response:', body);
          resolve(false);
        }
      });
    }).on('error', (e) => {
      console.log('❌ Erro ao conectar:', e.message);
      reject(e);
    });
  });
}

// Teste 2: Registro de Usuário
async function testRegister() {
  console.log('\n📝 Teste 2: Registro de Usuário');
  console.log('POST /api/v1/auth/register');
  console.log('Payload:', JSON.stringify(testUser, null, 2));

  try {
    const response = await makeRequest('/api/v1/auth/register', testUser);

    console.log(`Status: ${response.statusCode}`);
    console.log('Response:', JSON.stringify(response.body, null, 2));

    if (response.statusCode === 201 || response.statusCode === 200) {
      console.log('✅ Usuário criado com sucesso!');
      console.log(`✅ Access Token: ${response.body.access_token?.substring(0, 20)}...`);
      console.log(`✅ User ID: ${response.body.user?.id}`);
      return response.body;
    } else if (response.statusCode === 409) {
      console.log('⚠️  Usuário já existe (email duplicado)');
      return null;
    } else {
      console.log('❌ Erro ao criar usuário');
      return null;
    }
  } catch (error) {
    console.log('❌ Erro na requisição:', error.message);
    return null;
  }
}

// Teste 3: Login
async function testLogin(email, password) {
  console.log('\n🔐 Teste 3: Login');
  console.log('POST /api/v1/auth/login');

  try {
    const response = await makeRequest('/api/v1/auth/login', {
      email,
      password
    });

    console.log(`Status: ${response.statusCode}`);

    if (response.statusCode === 200) {
      console.log('✅ Login realizado com sucesso!');
      console.log(`✅ Access Token: ${response.body.access_token?.substring(0, 20)}...`);
      return response.body.access_token;
    } else {
      console.log('❌ Erro no login');
      console.log('Response:', JSON.stringify(response.body, null, 2));
      return null;
    }
  } catch (error) {
    console.log('❌ Erro na requisição:', error.message);
    return null;
  }
}

// Executar todos os testes
async function runTests() {
  try {
    // Teste 1: Health Check
    const healthOk = await testHealthCheck();

    if (!healthOk) {
      console.log('\n❌ Backend não está acessível. Verifique Easypanel.');
      process.exit(1);
    }

    // Teste 2: Registro
    const registerResult = await testRegister();

    // Teste 3: Login (se registro funcionou)
    if (registerResult) {
      await testLogin(testUser.email, testUser.password);
    }

    console.log('\n━'.repeat(60));
    console.log('✅ Testes concluídos!');
    console.log('━'.repeat(60));
    console.log('\n📋 Próximos passos:');
    console.log('1. Verifique se o usuário apareceu no banco de dados');
    console.log(`   Email: ${testUser.email}`);
    console.log('2. Se não aparecer, verifique os logs do backend no Easypanel');
    console.log('3. Verifique se as migrations rodaram corretamente');

  } catch (error) {
    console.error('\n❌ Erro ao executar testes:', error);
    process.exit(1);
  }
}

// Executar
runTests();
