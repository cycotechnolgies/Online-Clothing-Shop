const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1, min: 1 }
    }
  ]
}, {
  timestamps: true,
  collection: "carts"
});

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
