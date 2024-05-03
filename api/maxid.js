// api/maxid.js
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
    try {
      const result = await client.query('SELECT id FROM pages');
      const rows = result.rows;
  
      let highest = 0;
      for (const row of rows) {
        if (row.id > highest) {
          highest = row.id;
        }
      }
  
      res.status(200).json({ high: highest });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  