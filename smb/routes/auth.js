const express = require('express');
const {AuthService} = require('../services');
const deviceInfoMiddleware = require('../middleware/deviceInfo');
const router = express.Router();

// @route   POST /login
// @desc    Authenticate user & get token
// @access  Public
router.post('/', deviceInfoMiddleware, async (req, res) => {
  try {
    const {email, password} = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({message: 'Please provide email and password'});
    }

    // Use AuthService for login logic with device info
    const authResult = await AuthService.login(email, password, req.deviceInfo);
    res.json(authResult);

  } catch (error) {
    // Use status code from service if available
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Server error';

    console.error(`Error: ${statusCode} - ${message}`)
    res.status(statusCode).json({message});
  }
});

module.exports = router; 