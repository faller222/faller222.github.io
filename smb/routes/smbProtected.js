const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/smb/protected
// @desc    Get protected SMB data
// @access  Private (requires token)
router.get('/', auth, (req, res) => {
  // Check if the user was authenticated via bypass
  const bypassedAuth = req.user.bypassedAuth || false;
  
  res.json({
    message: 'You have access to protected SMB data',
    email: req.user.email,
    bypassedAuth,
    timestamp: new Date().toISOString()
  });
});

// @route   GET api/smb/protected/status
// @desc    Get SMB authentication status
// @access  Private (requires token)
router.get('/status', auth, (req, res) => {
  const userData = {
    email: req.user.email,
    bypassedAuth: req.user.bypassedAuth || false,
    cookies: req.user.cookies || null,
    authenticated: true,
    tokenExpiry: req.user.exp ? new Date(req.user.exp * 1000).toISOString() : null
  };
  
  res.json(userData);
});

module.exports = router; 