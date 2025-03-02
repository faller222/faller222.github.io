const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { UserService } = require('../services');
const { UserDAO } = require('../daos');

// @route   GET /api/user
// @desc    Get user data with nested images and logins
// @access  Private (requires token)
router.get('/', auth, async (req, res) => {
  try {
    // Use UserService to get user data
    const user = await UserService.getUserData(req.user.email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
    
  } catch (error) {
    // Use status code from service if available
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Server error';

    console.error(`Error: ${statusCode} - ${message}`)
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
    
    // Get user ID from email
    const user = await UserDAO.findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Use UserService to update image status
    const updatedImage = await UserService.updateImageStatus(imageId, user.id, isActivePost);
    res.json(updatedImage);
    
  } catch (error) {
    // Use status code from service if available
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Server error';

    console.error(`Error: ${statusCode} - ${message}`)
    res.status(statusCode).json({ message });
  }
});

// @route   POST /api/user/image/sync
// @desc    Sync images for a user
// @access  Private (requires token)
router.post('/image/sync', auth, async (req, res) => {
  try {
    // Use UserService to sync images
    const images = await UserService.syncImages(req.user.email);
    res.json(images);
    
  } catch (error) {
    // Use status code from service if available
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Server error';

    console.error(`Error: ${statusCode} - ${message}`)
    res.status(statusCode).json({ message });
  }
});

module.exports = router; 