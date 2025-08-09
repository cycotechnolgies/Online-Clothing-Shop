const express = require("express");
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');
const { register, login, logoutUser } = require('../controller/authController');

// POST route for login
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logoutUser);


// Example protected route (admin only)
router.get('/admin-only', requireAuth, allowRoles('admin'), (req, res) => {
  res.json({ message: 'Hello Admin!' });
});

router.post('/logout', requireAuth, logoutUser);

module.exports = router;
