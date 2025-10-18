/**
 * Swagger Documentation Review
 * Valida a documentação da API no Swagger
 */

const BASE_URL = 'http://localhost:3001';

async function reviewSwaggerDocs() {
  try {
    console.log('\n📚 Swagger Documentation Review\n');
    console.log('═'.repeat(80) + '\n');

    // Fetch Swagger JSON
    const response = await fetch(`${BASE_URL}/api/docs-json`);
    const swagger = await response.json();

    // Info básica
    console.log('📖 Informações Gerais:');
    console.log(`   Título: ${swagger.info.title}`);
    console.log(`   Versão: ${swagger.info.version}`);
    console.log(`   Descrição: ${swagger.info.description}\n`);

    // Tags
    console.log('🏷️  Tags Disponíveis:');
    swagger.tags.forEach(tag => {
      console.log(`   - ${tag.name}: ${tag.description}`);
    });
    console.log();

    // Contar endpoints
    const paths = Object.keys(swagger.paths);
    let totalEndpoints = 0;
    const endpointsByTag = {};

    paths.forEach(path => {
      const methods = Object.keys(swagger.paths[path]);
      methods.forEach(method => {
        totalEndpoints++;
        const operation = swagger.paths[path][method];
        const tag = operation.tags?.[0] || 'untagged';

        if (!endpointsByTag[tag]) {
          endpointsByTag[tag] = [];
        }

        endpointsByTag[tag].push({
          method: method.toUpperCase(),
          path,
          summary: operation.summary,
          responses: Object.keys(operation.responses || {})
        });
      });
    });

    console.log(`📊 Total de Endpoints: ${totalEndpoints}\n`);

    // Listar por tag
    console.log('📋 Endpoints por Categoria:\n');

    Object.entries(endpointsByTag).forEach(([tag, endpoints]) => {
      console.log(`   ${tag.toUpperCase()} (${endpoints.length} endpoints):`);
      endpoints.forEach(ep => {
        console.log(`      ${ep.method.padEnd(6)} ${ep.path}`);
        console.log(`             ${ep.summary || 'Sem descrição'}`);
        console.log(`             Responses: ${ep.responses.join(', ')}`);
      });
      console.log();
    });

    // Verificar completude
    console.log('✅ Verificação de Completude:\n');

    let hasDescriptions = 0;
    let hasResponses = 0;
    let hasRequestBody = 0;
    let totalPosts = 0;

    paths.forEach(path => {
      const methods = Object.keys(swagger.paths[path]);
      methods.forEach(method => {
        const operation = swagger.paths[path][method];

        if (operation.summary) hasDescriptions++;
        if (operation.responses && Object.keys(operation.responses).length > 0) hasResponses++;

        if (['post', 'put', 'patch'].includes(method)) {
          totalPosts++;
          if (operation.requestBody) hasRequestBody++;
        }
      });
    });

    const descPercent = ((hasDescriptions / totalEndpoints) * 100).toFixed(1);
    const respPercent = ((hasResponses / totalEndpoints) * 100).toFixed(1);
    const bodyPercent = totalPosts > 0 ? ((hasRequestBody / totalPosts) * 100).toFixed(1) : 0;

    console.log(`   Endpoints com descrição: ${hasDescriptions}/${totalEndpoints} (${descPercent}%)`);
    console.log(`   Endpoints com responses: ${hasResponses}/${totalEndpoints} (${respPercent}%)`);
    console.log(`   POST/PUT/PATCH com requestBody: ${hasRequestBody}/${totalPosts} (${bodyPercent}%)\n`);

    // Avaliação final
    const avgCompleteness = (parseFloat(descPercent) + parseFloat(respPercent) + parseFloat(bodyPercent)) / 3;

    let grade = '';
    if (avgCompleteness >= 90) {
      grade = '🟢 A+ (Excelente)';
    } else if (avgCompleteness >= 80) {
      grade = '🟢 A (Muito Bom)';
    } else if (avgCompleteness >= 70) {
      grade = '🟡 B (Bom)';
    } else if (avgCompleteness >= 60) {
      grade = '🟡 C (Aceitável)';
    } else {
      grade = '🔴 D (Precisa Melhorias)';
    }

    console.log(`📊 Completude Média: ${avgCompleteness.toFixed(1)}%`);
    console.log(`📈 Nota: ${grade}\n`);

    console.log('═'.repeat(80));
    console.log('✓ Documentation review concluído!\n');

    // Swagger UI disponível
    console.log(`📖 Acesse a documentação interativa em: ${BASE_URL}/api/docs\n`);

  } catch (error) {
    console.error('❌ Erro ao fazer review da documentação:', error.message);
    process.exit(1);
  }
}

reviewSwaggerDocs();
