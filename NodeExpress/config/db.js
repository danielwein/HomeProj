import mongoose from "mongoose";
import User from "../models/User.js"; // Import User model

const MONGO_URI = "mongodb://localhost:27017/jwtAuthDB";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Ensure the User collection exists
    await ensureCollections();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

// Function to ensure collections exist
const ensureCollections = async () => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  const collectionNames = collections.map((col) => col.name);

  if (!collectionNames.includes("users")) {
    console.log("📌 'users' collection missing. Creating...");
    await mongoose.connection.createCollection("users");
    console.log("✅ 'users' collection created.");
  } else {
    console.log("📌 'users' collection already exists.");
  }
};

export default connectDB;

