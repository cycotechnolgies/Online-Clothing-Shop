const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      priceAtPurchase: { type: Number, required: true }
    }
  ],

  shippingAddress: {
    fullName: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    phone: String
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed", "Refunded"],
    default: "Pending"
  },

  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing"
  },

  totalAmount: { type: Number, required: true },

  paymentMethod: {
    type: String,
    enum: ["COD", "Stripe", "PayHere", "BankTransfer"],
    default: "COD"
  },

  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  deliveredAt: Date
}, {
  timestamps: true,
  collection: "orders"
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
