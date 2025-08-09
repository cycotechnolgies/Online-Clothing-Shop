const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["User", "Admin", "Vendor"], default: "User" },
}, {
  timestamps: true,
  collection: "users"
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
