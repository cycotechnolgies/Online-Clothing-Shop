const jwt = require('jsonwebtoken');
const User = require('../model/userModel'); // <-- keep this path in sync with your folder name

// simple in-memory blacklist (resets on server restart)
const blacklistedTokens = new Set();

const sign = (u) =>
  jwt.sign(
    { id: u._id, userType: u.userType, userId: u.userId },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType, userId } = req.body;

    // normalize email to match your pre-save logic
    const normEmail = email?.toLowerCase().trim();

    // quick duplicate check (DB unique index will also enforce)
    const exists = await User.findOne({ email: normEmail });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const user = new User({
      firstName,
      lastName,
      email: normEmail,
      password,           // will be hashed by pre('save')
      userType,           // optional; defaults to "User" if omitted
      userId              // optional custom id
    });

    await user.save();
    return res.status(201).json({ ok: true, id: user._id });
  } catch (e) {
    // duplicate key safety
    if (e?.code === 11000 && e?.keyPattern?.email) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    console.error(e);
    return res.status(500).json({ message: 'Registration failed' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const { password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const ok = await user.comparePassword(password); // compares to hashed "password"
    if (!ok) return res.status(400).json({ message: 'Invalid password' });

    const token = sign(user);
    return res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType
      }
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/auth/logout
exports.logoutUser = (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(400).json({ message: 'No token provided' });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    blacklistedTokens.add(token);
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

// Middleware to protect routes
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  if (blacklistedTokens.has(token)) return res.status(403).json({ message: 'Token is blacklisted' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
