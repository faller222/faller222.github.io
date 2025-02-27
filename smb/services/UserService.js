const {UserDAO, ImageDAO, LoginDAO} = require('../daos');
const {loginSMB, getRequest, client} = require('../utils/smbLogin');

class UserService {
  /**
   * Get user data with nested images and logins
   * @param {String} email - User email
   * @returns {Promise<Object>} - User data with nested information
   * @throws {Error} - If user not found or server error occurs
   */
  async getUserData(email) {
    try {
      const userData = await UserDAO.findUserByEmail(email);

      if (!userData) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

      let logins = await LoginDAO.getLoginHistory(userData.id);
      let images = await ImageDAO.getUserImages(userData.id);


      return {...userData, logins, images};
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

  /**
   * Sync images for a user
   * @param {String} email - User email
   * @param {String} albumURL - Image Album URL
   * @returns {Promise<Array>} - Array of synced images
   * @throws {Error} - If user not found or server error occurs
   */
  async syncImages(email, albumURL) {
    try {
      const userData = await UserDAO.findUserByEmail(email);

      if (!userData) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

      // Call the SMB utils function to get images
      const {getImagesFromURL} = require('../utils/smbLogin');
      const imagesResult = await getImagesFromURL(albumURL);
      
      console.log('Syncing images for user:', email);
      
      // Get existing images for the user to avoid duplicates
      const existingImages = await ImageDAO.getUserImages(userData.id);
      const existingUrls = existingImages.map(img => img.url);
      
      // Filter out images that already exist in the database
      const newImages = imagesResult.images.filter(url => !existingUrls.includes(url));
      
      // Save new images to the database with is_active_post=false by default
      const savedImages = [];
      for (const url of newImages) {
        const savedImage = await ImageDAO.createImage(userData.id, url, false);
        savedImages.push(savedImage);
      }
      
      return {
        totalFound: imagesResult.images.length,
        newAdded: savedImages.length,
        newImages: savedImages
      };
    } catch (error) {
      // Rethrow with status code if it's already set
      if (error.statusCode) {
        throw error;
      }

      // Otherwise log and throw a server error
      console.error('Error syncing images:', error);
      const serverError = new Error('Server error');
      serverError.statusCode = 500;
      throw serverError;
    }
  }

}

module.exports = new UserService(); 