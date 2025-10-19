const https = require('https');
const jwt = require('./backend/node_modules/jsonwebtoken');

const userId = '4134f520-f46b-42aa-af80-411e53371206';
const JWT_SECRET = 'b0ec2cd68f2a2d42f36baaaf3a81259a3fe8575e209ec2d340c91488b5fb31d9';

const token = jwt.sign({ sub: userId, email: 'teste@pathfinder.com', subscriptionStatus: 'free' }, JWT_SECRET, { expiresIn: '7d' });

console.log('Testing comparison/code endpoint...');
console.log('User ID:', userId);

const options = {
  hostname: 'pathback.roilabs.com.br',
  path: '/api/v1/comparison/code',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.end();
