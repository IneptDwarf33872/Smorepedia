// api/maxid.js
const client = require("./client");

export default async (req, res) => {
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
  