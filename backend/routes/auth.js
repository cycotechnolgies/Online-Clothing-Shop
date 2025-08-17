const express = require("express");
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');
const { register, login, logoutUser } = require('../controller/authController');
const rateLimit = require('express-rate-limit');

// Rate limiter for sensitive routes (e.g., admin-only)
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
// POST route for login
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logoutUser);


// Example protected route (admin only)
router.get('/admin-only', adminLimiter, requireAuth, allowRoles('admin'), (req, res) => {
  res.json({ message: 'Hello Admin!' });
});

// Rate limiter for logout route
const logoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 logout requests per windowMs
  message: 'Too many logout requests from this IP, please try again later.'
});

router.post('/logout', logoutLimiter, requireAuth, logoutUser);

module.exports = router;
