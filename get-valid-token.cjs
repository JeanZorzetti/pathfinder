const https = require('https');

console.log('🔐 Trying to login and get valid token...\n');

// Try to login with teste@pathfinder.com
const loginData = JSON.stringify({
  email: 'teste@pathfinder.com',
  password: 'Test123!@#' // Common test password
});

const options = {
  hostname: 'pathback.roilabs.com.br',
  path: '/api/v1/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': loginData.length
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`Status: ${res.statusCode}\n`);

    if (res.statusCode === 200 || res.statusCode === 201) {
      const response = JSON.parse(data);
      console.log('✅ Login successful!');
      console.log('📦 Response:', JSON.stringify(response, null, 2));

      if (response.access_token || response.token) {
        const token = response.access_token || response.token;
        console.log('\n🎫 ACCESS TOKEN:');
        console.log(token);

        // Test the comparison endpoint with this token
        testComparisonEndpoint(token);
      }
    } else {
      console.log('❌ Login failed');
      console.log('Response:', data);

      // Try to create a new user instead
      console.log('\n📝 Trying to register new user...');
      registerNewUser();
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
});

req.write(loginData);
req.end();

function testComparisonEndpoint(token) {
  console.log('\n🧪 Testing /comparison/code endpoint...\n');

  const testOptions = {
    hostname: 'pathback.roilabs.com.br',
    path: '/api/v1/comparison/code',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  const testReq = https.request(testOptions, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`Status: ${res.statusCode}`);
      console.log('Response:', data);

      if (res.statusCode === 200) {
        console.log('\n✅ Comparison endpoint is working!');
      } else {
        console.log('\n❌ Comparison endpoint failed');
      }
    });
  });

  testReq.on('error', (error) => {
    console.error('❌ Request error:', error.message);
  });

  testReq.end();
}

function registerNewUser() {
  const registerData = JSON.stringify({
    email: 'test_sprint8@pathfinder.com',
    password: 'TestSprint8!@#',
    name: 'Test Sprint 8 User'
  });

  const options = {
    hostname: 'pathback.roilabs.com.br',
    path: '/api/v1/auth/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': registerData.length
    }
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`Status: ${res.statusCode}\n`);

      if (res.statusCode === 200 || res.statusCode === 201) {
        const response = JSON.parse(data);
        console.log('✅ Registration successful!');
        console.log('📦 Response:', JSON.stringify(response, null, 2));

        if (response.access_token || response.token) {
          const token = response.access_token || response.token;
          console.log('\n🎫 ACCESS TOKEN:');
          console.log(token);

          testComparisonEndpoint(token);
        }
      } else {
        console.log('❌ Registration failed');
        console.log('Response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request error:', error.message);
  });

  req.write(registerData);
  req.end();
}
