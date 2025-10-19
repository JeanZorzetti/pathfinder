/**
 * Test Daily Insight Endpoint
 * Verifies that daily insights are being returned correctly
 */

const https = require('https');

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYzQ1ZjIxZS0wYjA4LTQxZDMtYjRiMC01M2M1MGM1OTBkZDciLCJlbWFpbCI6InRlc3RlX2RlYnVnM0BwYXRoZmluZGVyLmNvbSIsInN1YnNjcmlwdGlvblN0YXR1cyI6ImZyZWUiLCJpYXQiOjE3NjA4MDg1MDgsImV4cCI6MTc2MTQxMzMwOH0.oax2FkkFoDJLbcpj-jiuLnQuDqD-3VNX1zSLVU_MEyM';

const options = {
  hostname: 'pathback.roilabs.com.br',
  port: 443,
  path: '/api/v1/dashboard',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }
};

console.log('🔍 Testing Daily Insight endpoint...\n');

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const json = JSON.parse(data);

      console.log('📊 Status Code:', res.statusCode);
      console.log('\n📝 Daily Insight Data:');
      console.log(JSON.stringify(json.data.dailyInsight, null, 2));

      const insight = json.data.dailyInsight;

      console.log('\n✅ Field Check:');
      console.log(`   - text: ${insight.text ? '✓ HAS DATA' : '❌ NULL'}`);
      console.log(`   - category: ${insight.category ? '✓ HAS DATA' : '❌ NULL'}`);
      console.log(`   - actionItem: ${insight.actionItem ? '✓ HAS DATA' : '❌ NULL'}`);

      if (!insight.text) {
        console.log('\n⚠️  WARNING: Daily Insight text is NULL!');
        console.log('   Possible causes:');
        console.log('   1. Backend build not yet deployed');
        console.log('   2. Entity mapping still incorrect');
        console.log('   3. No insights in database for user MBTI type');

        console.log('\n📋 User Info:');
        console.log(`   - MBTI Type: ${json.data.profile.mbtiType}`);
        console.log(`   - User ID: ${json.data.profile.id}`);
      } else {
        console.log('\n✅ SUCCESS! Daily Insight is working correctly');
      }

    } catch (error) {
      console.error('❌ Error parsing response:', error.message);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
});

req.end();
