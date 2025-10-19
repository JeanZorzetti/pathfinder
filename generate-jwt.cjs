const jwt = require('jsonwebtoken');

// User from database: teste@pathfinder.com
const userId = '4134f520-f46b-42aa-af80-411e53371206';
const email = 'teste@pathfinder.com';

// JWT Secret from environment (you need to check this in Easypanel)
const JWT_SECRET = 'b0ec2cd68f2a2d42f36baaaf3a81259a3fe8575e209ec2d340c91488b5fb31d9';

const payload = {
  sub: userId,
  email: email,
  subscriptionStatus: 'free',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
};

const token = jwt.sign(payload, JWT_SECRET);

console.log('✅ Generated JWT Token:');
console.log(token);
console.log('\n📋 Token payload:');
console.log(JSON.stringify(payload, null, 2));

// Test the token
const https = require('https');

console.log('\n🧪 Testing /comparison/code endpoint...\n');

const options = {
  hostname: 'pathback.roilabs.com.br',
  path: '/api/v1/comparison/code',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log('Response:', data);

    if (res.statusCode === 200) {
      console.log('\n✅ SUCCESS! Comparison endpoint is working!');
      const response = JSON.parse(data);
      console.log('\n📦 Comparison Code:', response);
    } else {
      console.log('\n❌ Endpoint failed with status', res.statusCode);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
});

req.end();
