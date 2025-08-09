const express = require('express');
const { register, login, me, logoutUser } = require('../controller/authController');
const requireAuth = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, me);

// Example protected route (admin only)
router.get('/admin-only', requireAuth, allowRoles('admin'), (req, res) => {
  res.json({ message: 'Hello Admin!' });
});

router.post('/logout', requireAuth, logoutUser);

module.exports = router;
