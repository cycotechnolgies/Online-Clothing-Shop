const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  inStock: { type: Boolean, default: true },
  category: { type: String, required: true },
  sizes: [{ type: String }],
  image: { type: String, required: true },
  isFeatured: { type: Boolean, default: false }
}, {
  timestamps: true, // adds createdAt and updatedAt
  collection: "products" // explicitly set collection name
});

// Check if model already exists (prevents overwrite errors)
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
