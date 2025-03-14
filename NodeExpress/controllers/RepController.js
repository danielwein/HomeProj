
import { verifyJWT } from "../utils/jwt.js"; // Import your JWT functions
import Rep from "../models/Rep.js";

import AWS from "aws-sdk";
import path from "path";
import fs from "fs";

// Initialize the S3 client
const s3 = new AWS.S3({
  endpoint: "http://localhost:4566", // LocalStack endpoint (use actual AWS endpoint in production)
  s3ForcePathStyle: true,
  region: "us-east-1",
  accessKeyId: "test",
  secretAccessKey: "test",
});


export const uploadFile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - Missing token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyJWT(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const userId = decoded.userId;
    const { name, desc } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Repository Name:', name);
    console.log('Description:', desc);
    console.log('User ID:', userId);
    console.log('File:', req.file);

    // Create new repository entry
    const newRep = await Rep.create({
      UserID: userId,
      Repname: name,
      Desc: desc,
      FilePath: null,
      CreatedAT: new Date(),
      LastChanged: new Date(),
    });

    // Ensure the file path exists
    const fileExtension = path.extname(req.file.originalname);
    const newFileName = `${newRep.id}${fileExtension}`;
    const localFilePath = path.join('uploads', newFileName); // Keep the path simple

    // Rename the file to match the newRep id
    fs.renameSync(req.file.path, localFilePath); // req.file.path should be the file's current location

    // Read the renamed file into a buffer
    const fileBuffer = fs.readFileSync(localFilePath);

    // Upload the file to S3
    const s3Params = {
      Bucket: 'my-local-bucket', // Your bucket name
      Key: newFileName, // S3 file name
      Body: fileBuffer,
      ContentType: req.file.mimetype,
    };

    const s3UploadResult = await s3.upload(s3Params).promise();

    // Update the FilePath in the database with the S3 URL
    await Rep.updateOne({ _id: newRep.id }, { $set: { FilePath: s3UploadResult.Location } });

    // Optional: Remove the local file after upload
    fs.unlinkSync(localFilePath);

    return res.json({
      message: 'File uploaded successfully',
      userId,
      fileName: newFileName,
      originalName: req.file.originalname,
      name,
      desc,
      filePath: s3UploadResult.Location, // The S3 file URL
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


  export const getRep = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized - Missing token" });
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = verifyJWT(token);
      if (!decoded) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
  
      const userId = decoded.userId;
  
      // Fetch repositories for the user
      const repositories = await Rep.find({ UserID: userId });
  
      return res.json({ repositories });
    } catch (error) {
      console.error("Error fetching repositories:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  export const getZip = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized - Missing token" });
      }
      const { RepID } = req.body;  // Assuming RepID is passed as a route parameter
      console.log("repID",RepID)
      // Step 1: Get the file path (S3 key) from the database using RepID
      const rep = await Rep.findById(RepID);  // Adjust this to your DB query logic
      if (!rep) {
        return res.status(404).json({ error: 'Repository not found' });
      }
   // The S3 path stored in the database
  
      // Step 2: Download the file from S3 using the file path (S3 key)
      const s3Params = {
        Bucket: 'my-local-bucket',  // Replace with your LocalStack bucket name
        Key: `${RepID}.zip`,  // S3 file path (key)
      };
  
      // Fetch the file from S3
      const s3Object = await s3.getObject(s3Params).promise();
      
      // Step 3: Send the file back in the response
    
      res.setHeader('Content-Type', s3Object.ContentType);  // Optional: Set the correct content type
      res.send(s3Object.Body);  // Send the file data to the client
  
    } catch (error) {
      console.error('Error getting file from S3:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };