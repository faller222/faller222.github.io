const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/protected
// @desc    Get protected data
// @access  Private (requires token)
router.get('/', auth, (req, res) => {
  res.json({
    message: 'You have access to protected data',
    userId: req.user.id,
    timestamp: new Date().toISOString()
  });
});

// @route   GET api/protected/profile
// @desc    Get user profile data
// @access  Private (requires token)
router.get('/profile', auth, (req, res) => {
  // In a real app, you would fetch user data from a database
  const userData = {
    id: req.user.id,
    username: `user${req.user.id}`,
    email: `user${req.user.id}@example.com`,
    role: 'user'
  };
  
  res.json(userData);
});

module.exports = router; 