/**
 * Performance Testing - Pathfinder Backend API
 * Testa tempos de resposta dos principais endpoints
 */

const BASE_URL = 'http://localhost:3001/api/v1';
const USER_ID = '00000000-0000-0000-0000-000000000000';

// Cores para output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

async function measureEndpoint(name, url, options = {}) {
  const startTime = Date.now();

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'user-id': USER_ID,
        ...options.headers
      },
      ...options
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    let status = colors.green + '✓' + colors.reset;
    let statusText = `${response.status} ${response.statusText}`;

    if (!response.ok) {
      status = colors.red + '✗' + colors.reset;
    }

    // Classificar performance
    let perfIndicator = colors.green + '●' + colors.reset; // Excelente < 100ms
    if (duration > 100 && duration <= 200) {
      perfIndicator = colors.cyan + '●' + colors.reset; // Bom < 200ms
    } else if (duration > 200 && duration <= 500) {
      perfIndicator = colors.yellow + '●' + colors.reset; // Aceitável < 500ms
    } else if (duration > 500) {
      perfIndicator = colors.red + '●' + colors.reset; // Lento > 500ms
    }

    console.log(`${status} ${perfIndicator} ${name.padEnd(40)} ${duration.toString().padStart(4)}ms ${colors.gray}${statusText}${colors.reset}`);

    return { name, duration, status: response.status, ok: response.ok };
  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`${colors.red}✗ ●${colors.reset} ${name.padEnd(40)} ${duration.toString().padStart(4)}ms ${colors.red}ERROR: ${error.message}${colors.reset}`);

    return { name, duration, status: 0, ok: false, error: error.message };
  }
}

async function runPerformanceTests() {
  console.log('\n' + colors.cyan + '═'.repeat(80) + colors.reset);
  console.log(colors.cyan + '🚀 Performance Testing - Pathfinder Backend API' + colors.reset);
  console.log(colors.cyan + '═'.repeat(80) + colors.reset + '\n');

  console.log(colors.gray + 'Legend:' + colors.reset);
  console.log(`  ${colors.green}● Excelente${colors.reset} < 100ms | ${colors.cyan}● Bom${colors.reset} < 200ms | ${colors.yellow}● Aceitável${colors.reset} < 500ms | ${colors.red}● Lento${colors.reset} > 500ms\n`);

  const results = [];

  // ==================== Health & System ====================
  console.log(colors.yellow + '📊 Health & System Endpoints' + colors.reset);
  results.push(await measureEndpoint('GET /health', `${BASE_URL}/health`));
  results.push(await measureEndpoint('GET /health/ready', `${BASE_URL}/health/ready`));
  console.log();

  // ==================== Dashboard ====================
  console.log(colors.yellow + '🏠 Dashboard Endpoints' + colors.reset);
  results.push(await measureEndpoint('GET /dashboard', `${BASE_URL}/dashboard`));
  results.push(await measureEndpoint('GET /dashboard/stats', `${BASE_URL}/dashboard/stats`));
  results.push(await measureEndpoint('GET /dashboard/insights/daily', `${BASE_URL}/dashboard/insights/daily`));
  console.log();

  // ==================== Gamification ====================
  console.log(colors.yellow + '🎮 Gamification Endpoints' + colors.reset);
  results.push(await measureEndpoint('GET /progress/stats', `${BASE_URL}/progress/stats`));
  results.push(await measureEndpoint('GET /progress/xp/history', `${BASE_URL}/progress/xp/history`));
  console.log();

  // ==================== Challenges ====================
  console.log(colors.yellow + '🎯 Challenges Endpoints' + colors.reset);
  results.push(await measureEndpoint('GET /challenges/current', `${BASE_URL}/challenges/current`));
  results.push(await measureEndpoint('GET /challenges/history', `${BASE_URL}/challenges/history`));
  results.push(await measureEndpoint('GET /challenges/stats', `${BASE_URL}/challenges/stats`));
  console.log();

  // ==================== Journal ====================
  console.log(colors.yellow + '📔 Journal Endpoints' + colors.reset);
  results.push(await measureEndpoint('GET /journal/entries', `${BASE_URL}/journal/entries`));
  results.push(await measureEndpoint('GET /journal/prompts/daily', `${BASE_URL}/journal/prompts/daily`));
  results.push(await measureEndpoint('GET /journal/stats', `${BASE_URL}/journal/stats`));
  console.log();

  // ==================== Comparison ====================
  console.log(colors.yellow + '🔄 Comparison Endpoints' + colors.reset);
  results.push(await measureEndpoint('GET /comparison/code', `${BASE_URL}/comparison/code`));
  results.push(await measureEndpoint('GET /comparison/history', `${BASE_URL}/comparison/history`));
  results.push(await measureEndpoint('GET /comparison/stats', `${BASE_URL}/comparison/stats`));
  console.log();

  // ==================== Análise de Resultados ====================
  console.log(colors.cyan + '═'.repeat(80) + colors.reset);
  console.log(colors.cyan + '📈 Análise de Performance' + colors.reset);
  console.log(colors.cyan + '═'.repeat(80) + colors.reset + '\n');

  const successfulResults = results.filter(r => r.ok);
  const failedResults = results.filter(r => !r.ok);

  if (successfulResults.length > 0) {
    const avgTime = successfulResults.reduce((sum, r) => sum + r.duration, 0) / successfulResults.length;
    const minTime = Math.min(...successfulResults.map(r => r.duration));
    const maxTime = Math.max(...successfulResults.map(r => r.duration));

    console.log(`Total de endpoints testados: ${results.length}`);
    console.log(`${colors.green}✓ Sucessos: ${successfulResults.length}${colors.reset}`);
    console.log(`${colors.red}✗ Falhas: ${failedResults.length}${colors.reset}\n`);

    console.log(`Tempo médio de resposta: ${colors.cyan}${avgTime.toFixed(2)}ms${colors.reset}`);
    console.log(`Tempo mínimo: ${colors.green}${minTime}ms${colors.reset}`);
    console.log(`Tempo máximo: ${maxTime < 500 ? colors.yellow : colors.red}${maxTime}ms${colors.reset}\n`);

    // Contar por categoria de performance
    const excellent = successfulResults.filter(r => r.duration < 100).length;
    const good = successfulResults.filter(r => r.duration >= 100 && r.duration < 200).length;
    const acceptable = successfulResults.filter(r => r.duration >= 200 && r.duration < 500).length;
    const slow = successfulResults.filter(r => r.duration >= 500).length;

    console.log('Distribuição de Performance:');
    console.log(`  ${colors.green}● Excelente (< 100ms):${colors.reset} ${excellent}`);
    console.log(`  ${colors.cyan}● Bom (100-200ms):${colors.reset} ${good}`);
    console.log(`  ${colors.yellow}● Aceitável (200-500ms):${colors.reset} ${acceptable}`);
    console.log(`  ${colors.red}● Lento (> 500ms):${colors.reset} ${slow}\n`);

    // Avaliação geral
    const score = (excellent * 4 + good * 3 + acceptable * 2 + slow * 1) / successfulResults.length;
    let grade = '';
    let gradeColor = colors.green;

    if (score >= 3.5) {
      grade = 'A+ (Excelente)';
      gradeColor = colors.green;
    } else if (score >= 3.0) {
      grade = 'A (Muito Bom)';
      gradeColor = colors.green;
    } else if (score >= 2.5) {
      grade = 'B (Bom)';
      gradeColor = colors.cyan;
    } else if (score >= 2.0) {
      grade = 'C (Aceitável)';
      gradeColor = colors.yellow;
    } else {
      grade = 'D (Precisa Melhorias)';
      gradeColor = colors.red;
    }

    console.log(`${gradeColor}Nota Geral: ${grade}${colors.reset}\n`);
  }

  if (failedResults.length > 0) {
    console.log(colors.red + 'Endpoints com Falha:' + colors.reset);
    failedResults.forEach(r => {
      console.log(`  ${colors.red}✗${colors.reset} ${r.name} - ${r.error || `Status ${r.status}`}`);
    });
    console.log();
  }

  console.log(colors.cyan + '═'.repeat(80) + colors.reset);
  console.log(colors.green + '✓ Performance testing concluído!' + colors.reset);
  console.log(colors.cyan + '═'.repeat(80) + colors.reset + '\n');
}

// Executar
runPerformanceTests().catch(console.error);
