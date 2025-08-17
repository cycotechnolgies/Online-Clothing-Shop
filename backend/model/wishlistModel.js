const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
}, {
  timestamps: true,
  collection: "wishlists"
});

module.exports = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);
