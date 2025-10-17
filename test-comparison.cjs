// Test script for Comparison Module
const https = require('https');

const API_URL = 'http://localhost:3001/api/v1';
const USER_ID = '00000000-0000-0000-0000-000000000000';

async function testComparison() {
  console.log('\n=== Testing Comparison Module ===\n');

  // Test 1: Get comparison code (user needs MBTI first)
  console.log('1. Getting comparison code...');
  try {
    const codeResponse = await fetch(`${API_URL}/comparison/code`);
    const codeData = await codeResponse.json();
    console.log('✅ Code:', JSON.stringify(codeData, null, 2));
  } catch (error) {
    console.log('❌ Error getting code:', error.message);
  }

  // Test 2: Compare with another code
  console.log('\n2. Comparing with ENFP-A7K9M2...');
  try {
    const compareResponse = await fetch(`${API_URL}/comparison/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'ENFP-A7K9M2' })
    });
    const compareData = await compareResponse.json();
    console.log('✅ Compatibility:', JSON.stringify(compareData, null, 2));
  } catch (error) {
    console.log('❌ Error comparing:', error.message);
  }

  // Test 3: Get history
  console.log('\n3. Getting comparison history...');
  try {
    const historyResponse = await fetch(`${API_URL}/comparison/history`);
    const historyData = await historyResponse.json();
    console.log('✅ History:', JSON.stringify(historyData, null, 2));
  } catch (error) {
    console.log('❌ Error getting history:', error.message);
  }

  // Test 4: Get stats
  console.log('\n4. Getting comparison stats...');
  try {
    const statsResponse = await fetch(`${API_URL}/comparison/stats`);
    const statsData = await statsResponse.json();
    console.log('✅ Stats:', JSON.stringify(statsData, null, 2));
  } catch (error) {
    console.log('❌ Error getting stats:', error.message);
  }

  console.log('\n=== Tests Complete ===\n');
}

testComparison().catch(console.error);
