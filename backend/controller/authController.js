const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");

const blacklistedTokens = new Set();

const signToken = (user) =>
  jwt.sign(
    { sub: user._id.toString(), userType: user.userType, userId: user.userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const user = await User.create({ name, email, password, userType });
    const token = signToken(user);

    res.status(201).json({
      token,
      userType: user.userType,
      user: { id: user._id, name: user.name, email: user.email, userType: user.userType }
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password name email userType userId");
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    const token = signToken(user);

    res.status(200).json({
      token,
      userType: user.userType,
      user: { id: user._id, name: user.name, email: user.email, userType: user.userType, userId: user.userId }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/auth/me
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.sub).select("name email userType userId");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ id: user._id, name: user.name, email: user.email, userType: user.userType, userId: user.userId });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/logout
exports.logoutUser = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(400).json({ message: "No token provided" });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    blacklistedTokens.add(token);
    res.status(200).json({ message: "Logged out successfully" });
  } catch {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Used by middleware to check blacklist
exports.isBlacklisted = (token) => blacklistedTokens.has(token);
