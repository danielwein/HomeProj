import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();

// Ensure express can parse JSON bodies
app.use(express.json()); 
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:5173", // Allow your frontend to make requests to this backend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

connectDB(); // 🔹 Calls function to ensure DB schema exists

app.use("/auth", authRoutes);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
