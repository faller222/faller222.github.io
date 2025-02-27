const {queryExecutor} = require('../config/database');

class ImageDAO {
  /**
   * Create a new image record
   * @param {number} userId - User ID
   * @param {string} url - Image URL
   * @param {boolean} isActivePost - Whether the image is an active post
   * @returns {Promise<Object>} - Created image record
   */
  async createImage(userId, url, isActivePost = false) {
    try {
      const result = await queryExecutor(
        'INSERT INTO images (user_id, url, is_active_post) VALUES ($1, $2, $3) RETURNING id, user_id, url, is_active_post',
        [userId, url, isActivePost]
      );

      return result.rows[0];
    } catch (error) {
      console.error('Error creating image:', error);
      throw error;
    }
  }

  /**
   * Get all images for a user
   * @param {number} userId - User ID
   * @returns {Promise<Array>} - Array of image records
   */
  async getUserImages(userId) {
    try {
      const result = await queryExecutor(
        'SELECT id, url, is_active_post as active FROM images WHERE user_id = $1',
        [userId]
      );

      return result.rows;
    } catch (error) {
      console.error('Error getting user images:', error);
      throw error;
    }
  }

  /**
   * Get active post images for a user
   * @param {number} userId - User ID
   * @returns {Promise<Array>} - Array of active image records
   */
  async getActiveImages(userId) {
    try {
      const result = await queryExecutor(
        'SELECT id, url FROM images WHERE user_id = $1 AND is_active_post = true',
        [userId]
      );

      return result.rows;
    } catch (error) {
      console.error('Error getting active images:', error);
      throw error;
    }
  }

  /**
   * Update image active status
   * @param {number} imageId - Image ID
   * @param {boolean} isActivePost - New active status
   * @returns {Promise<Object|null>} - Updated image record or null if not found
   */
  async updateImageStatus(imageId, isActivePost) {
    try {
      const result = await queryExecutor(
        'UPDATE images SET is_active_post = $1 WHERE id = $2 RETURNING id, user_id, url, is_active_post',
        [isActivePost, imageId]
      );

      return result.rows[0] || null;
    } catch (error) {
      console.error('Error updating image status:', error);
      throw error;
    }
  }

  /**
   * Delete an image
   * @param {number} imageId - Image ID
   * @returns {Promise<boolean>} - True if deleted, false if not found
   */
  async deleteImage(imageId) {
    try {
      const result = await queryExecutor(
        'DELETE FROM images WHERE id = $1 RETURNING id',
        [imageId]
      );

      return result.rowCount > 0;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
}

module.exports = new ImageDAO(); 