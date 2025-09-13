const express = require("express");
const router = express.Router();

// Import controller functions using require()
const { getProductsByCategory, getAllProducts } = require("../controller/productController");

// Routes
router.get("/", getAllProducts); // GET all products
router.get("/:category", getProductsByCategory); // GET by category

module.exports = router; // ✅ Export router using CommonJS
