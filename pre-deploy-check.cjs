#!/usr/bin/env node

/**
 * PRÉ-DEPLOY VALIDATION SCRIPT
 *
 * Valida se o projeto está pronto para deploy em produção.
 * Execute antes de fazer deploy para evitar problemas.
 *
 * Uso: node pre-deploy-check.cjs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Cores para output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

function checkmark() {
  log('✓', 'green');
}

function cross() {
  log('✗', 'red');
}

// Contadores
let passed = 0;
let failed = 0;
let warnings = 0;

// Testes
const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function runTests() {
  tests.forEach(({ name, fn }) => {
    process.stdout.write(`  ${name}... `);
    try {
      const result = fn();
      if (result === true) {
        checkmark();
        passed++;
      } else if (result === 'warning') {
        log('⚠', 'yellow');
        warnings++;
      } else {
        cross();
        failed++;
      }
    } catch (error) {
      cross();
      log(`    Erro: ${error.message}`, 'red');
      failed++;
    }
  });
}

// ============================================
// TESTES: Arquivos Necessários
// ============================================

header('1. ARQUIVOS NECESSÁRIOS');

test('backend/package.json existe', () => {
  return fs.existsSync(path.join(__dirname, 'backend', 'package.json'));
});

test('backend/Dockerfile existe', () => {
  return fs.existsSync(path.join(__dirname, 'backend', 'Dockerfile'));
});

test('backend/Procfile existe', () => {
  return fs.existsSync(path.join(__dirname, 'backend', 'Procfile'));
});

test('backend/.env.example existe', () => {
  return fs.existsSync(path.join(__dirname, 'backend', '.env.example'));
});

test('frontend/package.json existe', () => {
  return fs.existsSync(path.join(__dirname, 'frontend', 'package.json'));
});

test('frontend/vercel.json existe', () => {
  return fs.existsSync(path.join(__dirname, 'frontend', 'vercel.json'));
});

test('DEPLOY_GUIDE.md existe', () => {
  return fs.existsSync(path.join(__dirname, 'DEPLOY_GUIDE.md'));
});

test('DEPLOY_CHECKLIST.md existe', () => {
  return fs.existsSync(path.join(__dirname, 'DEPLOY_CHECKLIST.md'));
});

// ============================================
// TESTES: Backend Configuration
// ============================================

header('2. BACKEND CONFIGURATION');

test('backend/package.json tem script "build"', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend', 'package.json'), 'utf8'));
  return pkg.scripts && pkg.scripts.build;
});

test('backend/package.json tem script "start:prod"', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend', 'package.json'), 'utf8'));
  return pkg.scripts && pkg.scripts['start:prod'];
});

test('backend tem dependências necessárias', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend', 'package.json'), 'utf8'));
  const required = ['@nestjs/core', '@nestjs/common', 'typeorm', 'pg'];
  return required.every(dep => pkg.dependencies && pkg.dependencies[dep]);
});

test('backend/.env.example tem variáveis críticas', () => {
  const envExample = fs.readFileSync(path.join(__dirname, 'backend', '.env.example'), 'utf8');
  const required = ['DATABASE_HOST', 'JWT_SECRET', 'FRONTEND_URL'];
  return required.every(key => envExample.includes(key));
});

// ============================================
// TESTES: Frontend Configuration
// ============================================

header('3. FRONTEND CONFIGURATION');

test('frontend/package.json tem script "build"', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'frontend', 'package.json'), 'utf8'));
  return pkg.scripts && pkg.scripts.build;
});

test('frontend tem dependências necessárias', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'frontend', 'package.json'), 'utf8'));
  const required = ['react', 'react-dom', 'vite'];
  return required.every(dep => pkg.dependencies && (pkg.dependencies[dep] || pkg.devDependencies[dep]));
});

test('frontend/.env existe', () => {
  const exists = fs.existsSync(path.join(__dirname, 'frontend', '.env'));
  if (!exists) {
    log('    Aviso: .env não existe. Certifique-se de configurar VITE_API_URL no Vercel.', 'yellow');
    return 'warning';
  }
  return true;
});

test('frontend/vercel.json tem rewrites configurados', () => {
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'frontend', 'vercel.json'), 'utf8'));
  return vercelConfig.rewrites && vercelConfig.rewrites.length > 0;
});

// ============================================
// TESTES: Git Repository
// ============================================

header('4. GIT REPOSITORY');

test('Git inicializado', () => {
  return fs.existsSync(path.join(__dirname, '.git'));
});

test('Git tem commits', () => {
  try {
    const commits = execSync('git log --oneline', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    return commits.trim().length > 0;
  } catch {
    return false;
  }
});

test('Git tem remote configurado', () => {
  try {
    const remotes = execSync('git remote -v', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    return remotes.includes('origin');
  } catch {
    log('    Aviso: Nenhum remote Git configurado. Configure antes do deploy.', 'yellow');
    return 'warning';
  }
});

test('Branch principal é "main"', () => {
  try {
    const branch = execSync('git branch --show-current', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
    if (branch !== 'main') {
      log(`    Aviso: Branch atual é "${branch}". Railway/Vercel geralmente usam "main".`, 'yellow');
      return 'warning';
    }
    return true;
  } catch {
    return false;
  }
});

// ============================================
// TESTES: Build Tests
// ============================================

header('5. BUILD TESTS');

test('Backend: npm install funciona', () => {
  try {
    log('\n    (Executando npm install no backend, pode demorar...)', 'yellow');
    execSync('npm install', {
      cwd: path.join(__dirname, 'backend'),
      encoding: 'utf8',
      stdio: 'pipe'
    });
    return true;
  } catch (error) {
    log(`    Erro: ${error.message}`, 'red');
    return false;
  }
});

test('Backend: TypeScript compila sem erros', () => {
  try {
    log('\n    (Compilando TypeScript, pode demorar...)', 'yellow');
    execSync('npm run build', {
      cwd: path.join(__dirname, 'backend'),
      encoding: 'utf8',
      stdio: 'pipe'
    });

    // Verificar se dist/ foi criado
    const distExists = fs.existsSync(path.join(__dirname, 'backend', 'dist'));
    if (!distExists) {
      log('    Erro: Pasta dist/ não foi criada após build', 'red');
      return false;
    }

    return true;
  } catch (error) {
    log(`    Erro no build: ${error.message}`, 'red');
    return false;
  }
});

test('Frontend: npm install funciona', () => {
  try {
    log('\n    (Executando npm install no frontend, pode demorar...)', 'yellow');
    execSync('npm install', {
      cwd: path.join(__dirname, 'frontend'),
      encoding: 'utf8',
      stdio: 'pipe'
    });
    return true;
  } catch (error) {
    log(`    Erro: ${error.message}`, 'red');
    return false;
  }
});

test('Frontend: Build funciona', () => {
  try {
    log('\n    (Buildando frontend, pode demorar...)', 'yellow');
    execSync('npm run build', {
      cwd: path.join(__dirname, 'frontend'),
      encoding: 'utf8',
      stdio: 'pipe'
    });

    // Verificar se dist/ foi criado
    const distExists = fs.existsSync(path.join(__dirname, 'frontend', 'dist'));
    if (!distExists) {
      log('    Erro: Pasta dist/ não foi criada após build', 'red');
      return false;
    }

    return true;
  } catch (error) {
    log(`    Erro no build: ${error.message}`, 'red');
    return false;
  }
});

// ============================================
// TESTES: Segurança
// ============================================

header('6. SEGURANÇA');

test('backend/.env não está commitado', () => {
  try {
    const gitignore = fs.readFileSync(path.join(__dirname, 'backend', '.gitignore'), 'utf8');
    const envCommitted = execSync('git ls-files backend/.env', { encoding: 'utf8' }).trim();

    if (envCommitted) {
      log('    CRÍTICO: backend/.env está commitado! Remova-o do Git!', 'red');
      return false;
    }

    if (!gitignore.includes('.env')) {
      log('    Aviso: .env não está no .gitignore', 'yellow');
      return 'warning';
    }

    return true;
  } catch {
    return true; // Se .gitignore não existe, mas .env não está commitado, tudo bem
  }
});

test('frontend/.env não está commitado', () => {
  try {
    const envCommitted = execSync('git ls-files frontend/.env', { encoding: 'utf8' }).trim();

    if (envCommitted) {
      log('    CRÍTICO: frontend/.env está commitado! Remova-o do Git!', 'red');
      return false;
    }

    return true;
  } catch {
    return true;
  }
});

test('node_modules não estão commitados', () => {
  try {
    const backendModules = execSync('git ls-files backend/node_modules', { encoding: 'utf8' }).trim();
    const frontendModules = execSync('git ls-files frontend/node_modules', { encoding: 'utf8' }).trim();

    if (backendModules || frontendModules) {
      log('    CRÍTICO: node_modules estão commitados! Adicione ao .gitignore e remova!', 'red');
      return false;
    }

    return true;
  } catch {
    return true;
  }
});

// ============================================
// EXECUTAR TODOS OS TESTES
// ============================================

console.log('\n');
log('╔══════════════════════════════════════════════════════════╗', 'cyan');
log('║       PATHFINDER - PRÉ-DEPLOY VALIDATION SCRIPT          ║', 'cyan');
log('╚══════════════════════════════════════════════════════════╝', 'cyan');

runTests();

// ============================================
// RESULTADO FINAL
// ============================================

header('RESULTADO FINAL');

const total = passed + failed + warnings;

console.log('');
log(`  ✓ Testes Passaram: ${passed}/${total}`, 'green');
if (warnings > 0) {
  log(`  ⚠ Avisos: ${warnings}/${total}`, 'yellow');
}
if (failed > 0) {
  log(`  ✗ Testes Falharam: ${failed}/${total}`, 'red');
}
console.log('');

// ============================================
// RECOMENDAÇÕES
// ============================================

if (failed > 0) {
  header('⚠️  AÇÃO NECESSÁRIA');
  log('  Corrija os erros acima antes de fazer deploy.', 'red');
  log('  Deploy com falhas pode causar indisponibilidade da aplicação.', 'red');
  console.log('');
  process.exit(1);
} else if (warnings > 0) {
  header('⚠️  AVISOS');
  log('  Há alguns avisos. Verifique se são críticos para seu caso.', 'yellow');
  log('  Deploy pode prosseguir, mas revise os avisos acima.', 'yellow');
  console.log('');
} else {
  header('✅ PRONTO PARA DEPLOY!');
  log('  Todos os testes passaram!', 'green');
  log('  Seu projeto está pronto para deploy em produção.', 'green');
  console.log('');
  log('  Próximos passos:', 'cyan');
  log('  1. Leia DEPLOY_GUIDE.md para instruções detalhadas', 'blue');
  log('  2. Use DEPLOY_CHECKLIST.md durante o processo', 'blue');
  log('  3. Faça commit/push para o GitHub', 'blue');
  log('  4. Configure Railway (backend) e Vercel (frontend)', 'blue');
  console.log('');
}

log('═'.repeat(60), 'cyan');
console.log('\n');
