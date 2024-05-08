const s3 = require("./awsClient");
const Busboy = require("busboy");

function applyCorsHeaders(res) {

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

module.exports = (req, res) => {
  applyCorsHeaders(res);
  const busboy = new Busboy({ headers: req.headers });

  const fields = {};
  const files = [];

  busboy.on("field", (fieldname, val) => {
    fields[fieldname] = val; // Collect other form fields
  });

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    
    const s3Params = {
      Bucket: "smorepediafiles", // Your S3 bucket
      Key: `${fields[pageTitle]}/${fields[title]}`, // Path in S3
      Body: file, // File stream
      ContentType: mimetype, // MIME type from Busboy
    };

    s3.upload(s3Params, (err, data) => {
      if (err) {
        res.status(500).json({ error: "Error uploading to S3", details: err });
      } else {
        files.push({ filename, s3Location: data.Location }); // Track file upload results
      }
    });
  });
  busboy.on("finish", () => {
    res.status(200).json({
      message: "Upload complete",
      fields, // Include other form data in the response
      files, // Include file upload results
    });
  });

  req.pipe(busboy); // Pipe request data through Busboy to parse files
};
























// // api/add.js
// const client = require("./client");
// const CHUNK_SIZE = 1024 * 1024;

// export default async (req, res) => {
//   applyCorsHeaders(res);
//   if (req.method === 'OPTIONS') {
//     // Return 200 to indicate preflight request is allowed
//     res.status(200).end();  // No further processing needed
//     return;
//   }
//     if (req.method !== 'POST') {
//       return res.status(405).json({ error: 'Method not allowed' });
//     }
  
//     const { id, title, image, pageTitle, type } = req.body;
    
//     try {
//         console.log("Image: " + image);
//         if(typeof image == "string"){
//             const binaryString = atob(image); // Decodes the Base64 string
//             const length = binaryString.length;
//             const arrayBuffer = new ArrayBuffer(length); // Creates an ArrayBuffer of the correct size
//             const uint8Array = new Uint8Array(arrayBuffer);
//             const chunks = [];
//   for (let i = 0; i < uint8Array.length; i += chunkSize) {
//     const chunk = uint8Array.slice(i, i + chunkSize);
//     chunks.push(chunk);
//   }
//             // Fill the Uint8Array with bytes from the decoded binary string
//             for (let i = 0; i < length; i++) {
//               uint8Array[i] = binaryString.charCodeAt(i);
//             }
//             for (let i = 0; i < chunks.length; i++) {
//                 const chunk = chunks[i];
              
//                 const response = await client.put("Assets", {
//                   dataId,
//                   chunkIndex: i, // Index of this chunk
//                   totalChunks: chunks.length, // Total number of chunks
//                   data: chunk, // The chunk data
//                   title,
//                   pageTitle,
//                   type,
//                 });
              
//                 console.log(`Sent chunk ${i + 1} of ${chunks.length}`);
//               }
//             res.status(200).json({ success: result.success });
//         }
  
      
//     } catch (err) {
//       res.status(500).json({ error: err });
//     }
//   };
  