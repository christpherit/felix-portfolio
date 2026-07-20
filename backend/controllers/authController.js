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
