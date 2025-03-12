import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateJWT } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: "All fields are required" });

  const saltRounds = 10;
  const pwsHash = await bcrypt.hash(password, saltRounds);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already in use" });
  }
  try {
    const newUser = await User.create({ email, pwsHash, name });
    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid email or password" });

  const isMatch = await bcrypt.compare(password, user.pwsHash);
  if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

  const token = generateJWT({ userId: user._id, email: user.email }, "1h");
  res.json({ token });
};
