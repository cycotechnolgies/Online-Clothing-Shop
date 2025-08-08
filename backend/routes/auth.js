const express = require("express");
const { login, logoutUser } = require("../controller/authController");
const router = express.Router();

// POST route for login
router.post("/login", login);
router.post("/logout", logoutUser);

module.exports = router;
