const { pool } = require('../config/database');
const CryptoJS = require('crypto-js');

class UserDAO {
  /**
   * Create a new user
   * @param {string} email - User's email
   * @param {string} password - User's password (will be hashed)
   * @returns {Promise<Object>} - Created user object
   */
  async createUser(email, password) {
    const client = await pool.connect();
    try {
      // Hash the password with MD5 (as per the existing login function)
      const hash = CryptoJS.MD5(password).toString();
      
      const result = await client.query(
        'INSERT INTO users (email, hash) VALUES ($1, $2) RETURNING id, email',
        [email, hash]
      );
      
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Find a user by email
   * @param {string} email - User's email
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  async findUserByEmail(email) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, email, hash FROM users WHERE email = $1',
        [email]
      );
      
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Find a user by ID with nested images and logins
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} - User object with nested images and logins, or null if not found
   */
  async findUserById(id) {
    const client = await pool.connect();
    try {
      // Get user data
      const userResult = await client.query(
        'SELECT id, email FROM users WHERE id = $1',
        [id]
      );
      
      if (userResult.rows.length === 0) {
        return null;
      }
      
      const user = userResult.rows[0];
      
      // Get user images
      const imagesResult = await client.query(
        'SELECT id, url, is_active_post FROM images WHERE user_id = $1',
        [id]
      );
      
      // Get user logins
      const loginsResult = await client.query(
        'SELECT id, timestamp FROM logins WHERE user_id = $1 ORDER BY timestamp DESC',
        [id]
      );
      
      // Add nested data to user object
      user.images = imagesResult.rows;
      user.logins = loginsResult.rows;
      
      return user;
    } catch (error) {
      console.error('Error finding user by ID with nested data:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Validate user credentials
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object|null>} - User object if valid, null otherwise
   */
  async validateUser(email, password) {
    const client = await pool.connect();
    try {
      // Hash the password with MD5
      const hashedPassword = CryptoJS.MD5(password).toString();
      
      const result = await client.query(
        'SELECT id, email FROM users WHERE email = $1 AND hash = $2',
        [email, hashedPassword]
      );
      
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error validating user:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Update user's password hash
   * @param {number} userId - User ID
   * @param {string} newHash - New password hash
   * @returns {Promise<boolean>} - True if update was successful
   */
  async updateUserHash(userId, newHash) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'UPDATE users SET hash = $1 WHERE id = $2 RETURNING id',
        [newHash, userId]
      );
      
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error updating user hash:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = new UserDAO(); 