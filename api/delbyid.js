// api/byid.js
const client = require("./client");
function applyCorsHeaders(res) {

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  res.setHeader('Access-Control-Allow-Credentials', 'true');
}
export default async (req, res) => {
  applyCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    // Return 200 to indicate preflight request is allowed
    res.status(200).end();  // No further processing needed
    return;
  }
    if (req.method !== 'DELETE') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { id } = req.query; // Note the use of query parameters for GET requests
  
    try {
      const result = await client.delete('pages', { id: id });
      res.json({ result: result.success});
  } catch (err) {
      console.error('failed to delete data', err);
      res.status(500).json({ error: err });
  }
  };
  