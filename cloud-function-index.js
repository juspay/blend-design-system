const functions = require('@google-cloud/functions-framework');

functions.http('ping', (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).send('');
    return;
  }
  
  // Your original logic
  res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);
}); 