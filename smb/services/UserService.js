const { UserDAO, ImageDAO } = require('../daos');

class UserService {
  /**
   * Get user data with nested images and logins
   * @param {number} userId - User ID
   * @returns {Promise<Object>} - User data with nested information
   * @throws {Error} - If user not found or server error occurs
   */
  async getUserData(userId) {
    try {
      const userData = await UserDAO.findUserById(userId);
      
      if (!userData) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      
      return userData;
    } catch (error) {
      // Rethrow with status code if it's already set
      if (error.statusCode) {
        throw error;
      }
      
      // Otherwise log and throw a server error
      console.error('Error fetching user data:', error);
      const serverError = new Error('Server error');
      serverError.statusCode = 500;
      throw serverError;
    }
  }

  /**
   * Update image active status
   * @param {number} imageId - Image ID
   * @param {number} userId - User ID
   * @param {boolean} isActivePost - New active status
   * @returns {Promise<Object>} - Updated image data
   * @throws {Error} - If validation fails, image not found, or server error occurs
   */
  async updateImageStatus(imageId, userId, isActivePost) {
    try {
      if (isActivePost === undefined) {
        const error = new Error('Please provide isActivePost field');
        error.statusCode = 400;
        throw error;
      }

      // Check if the image belongs to the user
      const userImages = await ImageDAO.getUserImages(userId);
      const imageExists = userImages.some(image => image.id == imageId);
      
      if (!imageExists) {
        const error = new Error('You can only update your own images');
        error.statusCode = 403;
        throw error;
      }

      // Update image status
      const updatedImage = await ImageDAO.updateImageStatus(imageId, isActivePost);

      if (!updatedImage) {
        const error = new Error('Image not found');
        error.statusCode = 404;
        throw error;
      }

      return updatedImage;
    } catch (error) {
      // Rethrow with status code if it's already set
      if (error.statusCode) {
        throw error;
      }
      
      // Otherwise log and throw a server error
      console.error('Update image error:', error);
      const serverError = new Error('Server error');
      serverError.statusCode = 500;
      throw serverError;
    }
  }
}

module.exports = new UserService(); 