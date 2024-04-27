// api/add.js
const client = require("./client");
export default async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { id, title, content, infobox } = req.body;
  
    try {
      const result = await client.put('pages', {
        id,
        title,
        content,
        infobox,
      });
  
      res.status(200).json({ success: result.success });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  