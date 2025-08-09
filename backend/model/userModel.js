const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // added

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

userSchema.add({
  userId: { type: String, unique: true, sparse: true } // optional custom id
});

// normalize email & hash password on save
userSchema.pre("save", async function (next) {
  if (this.isModified("email") && this.email) {
    this.email = this.email.toLowerCase().trim();
  }
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// instance helper
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};
// --- end additions ---

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
