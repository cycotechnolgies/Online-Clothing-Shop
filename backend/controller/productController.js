const Product = require("../model/products");

// @desc    Get products by category
// @route   GET /api/products/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({
      category: { $regex: new RegExp(category, "i") }, // case-insensitive
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Export functions for CommonJS
module.exports = {
  getProductsByCategory,
  getAllProducts,
};
