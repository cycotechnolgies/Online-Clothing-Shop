const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

// Routes
router.get("/", getAllProducts);
router.get("/:category", getProductsByCategory);
router.post("/", createProduct); // Add product
router.put("/:id", updateProduct); // Update product
router.delete("/:id", deleteProduct); // Delete product

module.exports = router;
