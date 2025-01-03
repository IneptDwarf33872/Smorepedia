// api/byid.js
const client = require("./client");
function applyCorsHeaders(res) {

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  res.setHeader('Access-Control-Allow-Credentials', 'true');
}
export default async (req, res) =>{
  applyCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    // Return 200 to indicate preflight request is allowed
    res.status(200).end();  // No further processing needed
    return;
  }
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
      const result = await client.query('SELECT * FROM pages');
      console.log(result);
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err });
      
    }
  };
