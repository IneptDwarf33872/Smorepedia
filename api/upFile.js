// api/add.js
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
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { id, title, image, pageTitle, type } = req.body;
  
    try {
        console.log("Image: " + image);
        if(typeof image == "string"){
            const binaryString = atob(image); // Decodes the Base64 string
            const length = binaryString.length;
            const arrayBuffer = new ArrayBuffer(length); // Creates an ArrayBuffer of the correct size
            const uint8Array = new Uint8Array(arrayBuffer);
          
            // Fill the Uint8Array with bytes from the decoded binary string
            for (let i = 0; i < length; i++) {
              uint8Array[i] = binaryString.charCodeAt(i);
            }
            const result = await client.put('Assets', {
                id,
                title,
                uint8Array,
                pageTitle,
                type,
            });
            res.status(200).json({ success: result.success });
        }
  
      
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  