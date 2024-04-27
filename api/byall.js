// api/byid.js
const client = require("./client");

export default async (req, res) => {
    console.log("Found me!");
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        console.log("Trying...");
      const result = await client.query('SELECT * FROM pages');
      res.status(200).json(result.row);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  