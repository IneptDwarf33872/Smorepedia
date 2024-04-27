// api/byid.js
const client = require("./client");

export default async (req, res) => {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
      const result = await client.query('SELECT * FROM pages');
      res.status(200).json(result.row);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  