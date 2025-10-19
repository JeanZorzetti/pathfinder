const https = require('https');

// Token do usuário teste
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYzQ1ZjIxZS0wYjA4LTQxZDMtYjRiMC01M2M1MGM1OTBkZDciLCJlbWFpbCI6InRlc3RlX2RlYnVnM0BwYXRoZmluZGVyLmNvbSIsInN1YnNjcmlwdGlvblN0YXR1cyI6ImZyZWUiLCJpYXQiOjE3NjA4MDg1MDgsImV4cCI6MTc2MTQxMzMwOH0.oax2FkkFoDJLbcpj-jiuLnQuDqD-3VNX1zSLVU_MEyM";

console.log('🧪 Testing Comparison endpoints...\n');

// Test 1: GET /comparison/code
const testGetCode = () => {
  return new Promise((resolve) => {
    const options = {
      hostname: 'pathback.roilabs.com.br',
      path: '/api/v1/comparison/code',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    console.log('📍 Testing: GET /api/v1/comparison/code');

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        console.log(`   Headers:`, res.headers);

        if (res.statusCode === 200) {
          console.log(`   ✅ Response:`, JSON.parse(data));
        } else {
          console.log(`   ❌ Error Response:`, data);
        }
        console.log('');
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log(`   ❌ Request Error:`, error.message);
      console.log('');
      resolve();
    });

    req.end();
  });
};

// Test 2: GET /comparison/history
const testGetHistory = () => {
  return new Promise((resolve) => {
    const options = {
      hostname: 'pathback.roilabs.com.br',
      path: '/api/v1/comparison/history?limit=5',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    console.log('📍 Testing: GET /api/v1/comparison/history');

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);

        if (res.statusCode === 200) {
          console.log(`   ✅ Response:`, JSON.parse(data));
        } else {
          console.log(`   ❌ Error Response:`, data);
        }
        console.log('');
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log(`   ❌ Request Error:`, error.message);
      console.log('');
      resolve();
    });

    req.end();
  });
};

// Test 3: GET /comparison/stats
const testGetStats = () => {
  return new Promise((resolve) => {
    const options = {
      hostname: 'pathback.roilabs.com.br',
      path: '/api/v1/comparison/stats',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    console.log('📍 Testing: GET /api/v1/comparison/stats');

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);

        if (res.statusCode === 200) {
          console.log(`   ✅ Response:`, JSON.parse(data));
        } else {
          console.log(`   ❌ Error Response:`, data);
        }
        console.log('');
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log(`   ❌ Request Error:`, error.message);
      console.log('');
      resolve();
    });

    req.end();
  });
};

// Test 4: Check if backend is up
const testHealth = () => {
  return new Promise((resolve) => {
    const options = {
      hostname: 'pathback.roilabs.com.br',
      path: '/api/v1/health',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log('📍 Testing: GET /api/v1/health');

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);

        if (res.statusCode === 200) {
          console.log(`   ✅ Backend is UP:`, JSON.parse(data));
        } else {
          console.log(`   ❌ Backend might be DOWN:`, data);
        }
        console.log('');
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log(`   ❌ Request Error:`, error.message);
      console.log('');
      resolve();
    });

    req.end();
  });
};

// Run all tests
(async () => {
  await testHealth();
  await testGetCode();
  await testGetHistory();
  await testGetStats();

  console.log('✅ All tests completed!');
})();
