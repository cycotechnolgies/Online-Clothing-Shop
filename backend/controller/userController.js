const User = require('../model/userModel'); // Corrected path to ../model/
const crypto = require('crypto');
// const sendEmail = require('../utils/sendEmail'); // For when you implement email

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update user (Admin only) - for role, status, etc.
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.username = req.body.username || user.username;
      user.userType = req.body.userType || user.userType; 
      // Add a status field to your model if you want to toggle 'active'/'suspended'
      // user.status = req.body.status || user.status; 

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        username: updatedUser.username,
        email: updatedUser.email,
        userType: updatedUser.userType,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove(); // or User.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Invite a new user (Admin only)
// @route   POST /api/users/invite
// @access  Private/Admin
const inviteUser = async (req, res) => {
  const { email, userType } = req.body; // userType is the role

  if (!email || !userType) {
    return res.status(400).json({ message: 'Please provide an email and a userType (role)' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // 1. Generate a secure token
    const inviteToken = crypto.randomBytes(32).toString('hex');
    // In a real app, you'd save this token hashed to the DB with an expiry

    // 2. Create the invite link (points to your frontend signup page)
    const inviteLink = `${process.env.FRONTEND_URL}/signup?token=${inviteToken}&email=${email}&role=${userType}`;
    
    // 3. Send the email (using Nodemailer, SendGrid, etc.)
    /*
    await sendEmail({
      to: email,
      subject: 'You are invited to join!',
      html: `
        <p>You have been invited to join as a ${userType}.</p>
        <p>Click this link to complete your registration:</p>
        <a href="${inviteLink}">${inviteLink}</a>
      `
    });
    */

    // For now, we'll just log it
    console.log('INVITE LINK (for testing):', inviteLink);

    res.status(200).json({ message: `Invite sent to ${email}.` });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


module.exports = { 
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    inviteUser
};