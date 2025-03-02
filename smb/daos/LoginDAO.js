const {queryExecutor} = require('../config/database');

class LoginDAO {
  /**
   * Record a new login for a user
   * @param {number} userId - User ID
   * @param {Object} deviceInfo - Device information (ip, device, os, browser)
   * @returns {Promise<Object>} - Created login record
   */
  async recordLogin(userId, deviceInfo = {}) {
    try {
      const { ip = null, device = null, os = null, browser = null } = deviceInfo;
      
      const result = await queryExecutor(
        `INSERT INTO logins 
         (user_id, ip, device, os, browser) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, user_id, timestamp, ip, device, os, browser`,
        [userId, ip, device, os, browser]
      );

      return result.rows[0];
    } catch (error) {
      console.error('Error recording login:', error);
      throw error;
    }
  }

  /**
   * Get login history for a user
   * @param {number} userId - User ID
   * @param {number} limit - Maximum number of records to return
   * @returns {Promise<Array>} - Array of login records
   */
  async getLoginHistory(userId, limit = 10) {
    try {
      const result = await queryExecutor(
        `SELECT id, user_id, timestamp, ip, device, os, browser 
         FROM logins 
         WHERE user_id = $1 
         ORDER BY timestamp DESC 
         LIMIT $2`,
        [userId, limit]
      );

      return result.rows;
    } catch (error) {
      console.error('Error getting login history:', error);
      throw error;
    }
  }

  /**
   * Get last login for a user
   * @param {number} userId - User ID
   * @returns {Promise<Object|null>} - Last login record or null
   */
  async getLastLogin(userId) {
    try {
      const result = await queryExecutor(
        `SELECT id, user_id, timestamp, ip, device, os, browser 
         FROM logins 
         WHERE user_id = $1 
         ORDER BY timestamp DESC 
         LIMIT 1`,
        [userId]
      );

      return result.rows[0] || null;
    } catch (error) {
      console.error('Error getting last login:', error);
      throw error;
    }
  }
}

module.exports = new LoginDAO(); 