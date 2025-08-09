const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('../controller/authController');

module.exports = function requireAuth(req, res, next) {
  const token =
    req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  if (isBlacklisted(token)) return res.status(403).json({ message: 'Token is blacklisted' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { sub, userType, userId, iat, exp }
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
