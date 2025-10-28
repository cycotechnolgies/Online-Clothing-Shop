const express = require('express');
const router = express.Router();

// Import controllers
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  inviteUser
} = require('../controller/userController'); 

// Import middleware
const requireAuth = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

// Admin User-Management Routes
// All routes here are protected and require admin access
// We chain the middleware: first check auth, then check role.
const requireAdmin = [requireAuth, allowRoles('admin', 'Admin')]; // Allow 'admin' or 'Admin'

// GET /api/users
// POST /api/users/invite
router.route('/')
  .get(requireAdmin, getAllUsers);
  
router.route('/invite')
  .post(requireAdmin, inviteUser);

// GET /api/users/:id
// PUT /api/users/:id
// DELETE /api/users/:id
router.route('/:id')
  .get(requireAdmin, getUserById)
  .put(requireAdmin, updateUser)
  .delete(requireAdmin, deleteUser);

module.exports = router;