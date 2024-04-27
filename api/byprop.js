// api/byprop.js
const client = require("./client");

export default async (req, res) => {
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
  