const User = require("../models/userModel");
const path = require("path");

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = { addUser };
