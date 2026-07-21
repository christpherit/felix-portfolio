import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Sign JWT token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallbacksecret', {
    expiresIn: '30d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Find user by username OR email
    const query = {};
    if (username) query.username = username;
    if (email) query.email = email;

    if (!username && !email) {
      return res.status(400).json({ success: false, message: 'Please provide email or username.' });
    }

    const user = await User.findOne(query);

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(user._id.toString()),
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid authentication credentials.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify current JWT session token
// @route   GET /api/auth/verify
// @access  Private
export const verifyAdmin = async (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      data: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  } else {
    res.status(401).json({ success: false, message: 'Session token invalid.' });
  }
};

// @desc    Get all admins
// @route   GET /api/auth/admins
// @access  Private
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({}, '-password'); // exclude password hash from listing
    res.json({ success: true, data: admins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new admin
// @route   POST /api/auth/admins
// @access  Private
export const createAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate duplicate emails
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ success: false, message: 'Username/Name already in use.' });
    }

    const newAdmin = await User.create({
      username,
      email,
      password // User pre-save hook handles bcrypt hashing
    });

    res.status(201).json({
      success: true,
      data: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete admin
// @route   DELETE /api/auth/admins/:id
// @access  Private
export const deleteAdmin = async (req, res) => {
  try {
    // Prevent self-deletion
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ success: false, message: 'Self-deletion is not permitted.' });
    }

    const deletedAdmin = await User.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ success: false, message: 'Admin account not found.' });
    }

    res.json({ success: true, message: 'Admin account deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Change admin password
// @route   PUT /api/auth/admins/:id/password
// @access  Private
export const changeAdminPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    const admin = await User.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin account not found.' });
    }

    admin.password = newPassword; // Pre-save hook hashes password since it is modified
    await admin.save();

    res.json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
