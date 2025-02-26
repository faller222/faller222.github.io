const { pool } = require('../config/database');

class LoginDAO {
  /**
   * Record a new login for a user
   * @param {number} userId - User ID
   * @returns {Promise<Object>} - Created login record
   */
  async recordLogin(userId) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO logins (user_id) VALUES ($1) RETURNING id, user_id, timestamp',
        [userId]
      );
      
      return result.rows[0];
    } catch (error) {
      console.error('Error recording login:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get login history for a user
   * @param {number} userId - User ID
   * @param {number} limit - Maximum number of records to return
   * @returns {Promise<Array>} - Array of login records
   */
  async getLoginHistory(userId, limit = 10) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, user_id, timestamp FROM logins WHERE user_id = $1 ORDER BY timestamp DESC LIMIT $2',
        [userId, limit]
      );
      
      return result.rows;
    } catch (error) {
      console.error('Error getting login history:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get last login for a user
   * @param {number} userId - User ID
   * @returns {Promise<Object|null>} - Last login record or null
   */
  async getLastLogin(userId) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, user_id, timestamp FROM logins WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 1',
        [userId]
      );
      
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error getting last login:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = new LoginDAO(); 