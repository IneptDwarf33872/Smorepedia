// api/byid.js
const client = require("./client");

export default async (req, res) => {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { id } = req.query; // Note the use of query parameters for GET requests
  
    try {
      const result = await client.get('pages', { id });
      res.status(200).json(result.row);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  