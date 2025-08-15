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

router.post('/logout', requireAuth, logoutUser);

module.exports = router;
