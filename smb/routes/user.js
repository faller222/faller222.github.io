const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { UserService } = require('../services');

// @route   GET /api/user
// @desc    Get user data with nested images and logins
// @access  Private (requires token)
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Use UserService to get user data
    const userData = await UserService.getUserData(userId);
    res.json(userData);
    
  } catch (error) {
    // Use status code from service if available
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Server error';
    
    res.status(statusCode).json({ message });
  }
});

// @route   PUT /api/user/image/:id
// @desc    Update image active status
// @access  Private (requires token)
router.put('/image/:id', auth, async (req, res) => {
  try {
    const { isActivePost } = req.body;
    const imageId = req.params.id;
    const userId = req.user.id;
    
    // Use UserService to update image status
    const updatedImage = await UserService.updateImageStatus(imageId, userId, isActivePost);
    res.json(updatedImage);
    
  } catch (error) {
    // Use status code from service if available
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Server error';
    
    res.status(statusCode).json({ message });
  }
});

module.exports = router; 