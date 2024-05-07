const s3 = require("./awsClient");
const Busboy = require("busboy");

module.exports = (req, res) => {
  const busboy = new Busboy({ headers: req.headers });

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log("File received:");
    console.log("Field Name:", fieldname);
    console.log("File Name:", filename);
    console.log("Encoding:", encoding);
    console.log("MIME Type:", mimetype);

    // Forward the file to S3
    const s3Params = {
      Bucket: "smorepediafiles", // Your S3 bucket
      Key: `${filename}`, // Path in S3
      Body: file, // File stream
      ContentType: mimetype, // MIME type from Busboy
    };

    s3.upload(s3Params, (err, data) => {
      if (err) {
        console.error("Error uploading to S3:", err);
        res.status(500).json({ error: "Error uploading to S3" });
      } else {
        res.status(200).json({ message: "File uploaded to S3", data });
      }
    });
  });

  req.pipe(busboy); // Pipe request data through Busboy to parse files
};
























// // api/add.js
// const client = require("./client");
// const CHUNK_SIZE = 1024 * 1024;
// function applyCorsHeaders(res) {

//   res.setHeader('Access-Control-Allow-Origin', '*');

//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   res.setHeader('Access-Control-Allow-Credentials', 'true');
// }
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
  