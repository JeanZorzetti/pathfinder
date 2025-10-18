/**
 * Teste E2E - Journal API
 *
 * Testa todo o fluxo do JournalModule:
 * 1. Criar entrada
 * 2. Listar entradas
 * 3. Buscar entrada específica
 * 4. Atualizar entrada
 * 5. Buscar prompts diários
 * 6. Buscar estatísticas
 * 7. Deletar entrada
 */

const BASE_URL = 'http://localhost:3001/api/v1';

// Mock user ID (em produção seria do JWT)
const USER_ID = '00000000-0000-0000-0000-000000000000';

let createdEntryId = null;

async function testJournalE2E() {
  console.log('🧪 Iniciando Testes E2E - Journal API\n');

  try {
    // 1. Criar entrada
    console.log('1️⃣  Testando: POST /journal/entries');
    const createResponse = await fetch(`${BASE_URL}/journal/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': USER_ID
      },
      body: JSON.stringify({
        content: 'Teste E2E: Primeira entrada do diário para validar o sistema',
        mood: 'reflexivo',
        tags: ['teste', 'e2e', 'validacao']
      })
    });

    if (!createResponse.ok) {
      throw new Error(`Create failed: ${createResponse.status}`);
    }

    const created = await createResponse.json();
    createdEntryId = created.id;
    console.log(`✅ Entrada criada com ID: ${createdEntryId}`);
    console.log(`   Mood: ${created.mood}, Tags: ${created.tags?.join(', ')}\n`);

    // 2. Listar entradas
    console.log('2️⃣  Testando: GET /journal/entries');
    const listResponse = await fetch(`${BASE_URL}/journal/entries?page=1&limit=10`, {
      headers: { 'user-id': USER_ID }
    });

    if (!listResponse.ok) {
      throw new Error(`List failed: ${listResponse.status}`);
    }

    const list = await listResponse.json();
    const entries = Array.isArray(list) ? list : (list.data || []);
    const total = list.total || entries.length;
    console.log(`✅ Entradas listadas: ${entries.length} entradas`);
    if (list.currentPage) {
      console.log(`   Páginas: ${list.currentPage}/${list.totalPages}`);
    }
    console.log();

    // 3. Buscar entrada específica
    console.log('3️⃣  Testando: GET /journal/entries/:id');
    const getResponse = await fetch(`${BASE_URL}/journal/entries/${createdEntryId}`, {
      headers: { 'user-id': USER_ID }
    });

    if (!getResponse.ok) {
      throw new Error(`Get failed: ${getResponse.status}`);
    }

    const entry = await getResponse.json();
    console.log(`✅ Entrada recuperada: ${entry.id}`);
    console.log(`   Conteúdo: "${entry.content.substring(0, 50)}..."\n`);

    // 4. Atualizar entrada
    console.log('4️⃣  Testando: PATCH /journal/entries/:id');
    const updateResponse = await fetch(`${BASE_URL}/journal/entries/${createdEntryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'user-id': USER_ID
      },
      body: JSON.stringify({
        content: 'Teste E2E: Entrada atualizada com sucesso!',
        mood: 'feliz',
        tags: ['teste', 'e2e', 'atualizado']
      })
    });

    if (!updateResponse.ok) {
      throw new Error(`Update failed: ${updateResponse.status}`);
    }

    const updated = await updateResponse.json();
    console.log(`✅ Entrada atualizada: ${updated.id}`);
    console.log(`   Novo mood: ${updated.mood}\n`);

    // 5. Buscar prompts diários
    console.log('5️⃣  Testando: GET /journal/prompts/daily');
    const promptResponse = await fetch(`${BASE_URL}/journal/prompts/daily?mbtiType=INTJ`, {
      headers: { 'user-id': USER_ID }
    });

    if (!promptResponse.ok) {
      throw new Error(`Prompt failed: ${promptResponse.status}`);
    }

    const prompt = await promptResponse.json();
    console.log(`✅ Prompt do dia recuperado:`);
    console.log(`   "${prompt.text}"`);
    console.log(`   Categoria: ${prompt.category}\n`);

    // 6. Buscar estatísticas
    console.log('6️⃣  Testando: GET /journal/stats');
    const statsResponse = await fetch(`${BASE_URL}/journal/stats`, {
      headers: { 'user-id': USER_ID }
    });

    if (!statsResponse.ok) {
      throw new Error(`Stats failed: ${statsResponse.status}`);
    }

    const stats = await statsResponse.json();
    console.log(`✅ Estatísticas recuperadas:`);
    console.log(`   Total de entradas: ${stats.totalEntries}`);
    console.log(`   Entradas este mês: ${stats.entriesThisMonth}`);
    console.log(`   Streak atual: ${stats.currentStreak} dias`);
    console.log(`   Streak mais longo: ${stats.longestStreak} dias`);
    console.log(`   Top tags: ${stats.topTags.slice(0, 3).map(t => `${t.tag}(${t.count})`).join(', ')}\n`);

    // 7. Deletar entrada
    console.log('7️⃣  Testando: DELETE /journal/entries/:id');
    const deleteResponse = await fetch(`${BASE_URL}/journal/entries/${createdEntryId}`, {
      method: 'DELETE',
      headers: { 'user-id': USER_ID }
    });

    if (!deleteResponse.ok) {
      throw new Error(`Delete failed: ${deleteResponse.status}`);
    }

    console.log(`✅ Entrada deletada: ${createdEntryId}\n`);

    // 8. Verificar deleção
    console.log('8️⃣  Verificando deleção');
    const verifyResponse = await fetch(`${BASE_URL}/journal/entries/${createdEntryId}`, {
      headers: { 'user-id': USER_ID }
    });

    if (verifyResponse.status === 404) {
      console.log(`✅ Confirmado: entrada foi deletada\n`);
    } else {
      throw new Error('Entrada deveria ter sido deletada');
    }

    // Resultado final
    console.log('═══════════════════════════════════════');
    console.log('✅ TODOS OS TESTES PASSARAM!');
    console.log('═══════════════════════════════════════');
    console.log('Journal API está 100% funcional! 🎉\n');

  } catch (error) {
    console.error('\n❌ ERRO NO TESTE:');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Aguardar 5 segundos para o backend iniciar
console.log('⏳ Aguardando backend iniciar...\n');
setTimeout(testJournalE2E, 5000);
