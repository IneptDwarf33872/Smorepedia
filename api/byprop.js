// api/byprop.js
const client = require("./client");

function applyCorsHeaders(res) {
  // Allow all origins (be cautious with this in production)
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Allow HTTP methods typically used in REST APIs
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Allow common headers, add others if needed
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // If allowing credentials, ensure the origin isn't '*'
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

export default async (req, res) => {
  
  applyCorsHeaders(res);
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { prop } = req.query; // Use query parameters for GET requests
  
    try {
      const result = await client.query(`SELECT ${prop} FROM pages`);
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  