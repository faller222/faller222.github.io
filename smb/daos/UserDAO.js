const {queryExecutor} = require('../config/database');

class UserDAO {
  /**
   * Create a new user
   * @param {string} email - User's email
   * @param {string} hashedPassword - User's password (hashed)
   * @returns {Promise<Object>} - Created user object
   */
  async createUser(email, hashedPassword) {
    try {
      const result = await queryExecutor(
        'INSERT INTO users (email, hash) VALUES ($1, $2) RETURNING id, email',
        [email, hashedPassword]
      );

      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Find a user by email
   * @param {string} email - User's email
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  async findUserByEmail(email) {
    try {
      const result = await queryExecutor(
        'SELECT id, email, hash FROM users WHERE email = $1',
        [email]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  /**
   * Find a user by ID with nested images and logins
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} - User object with nested images and logins, or null if not found
   */
  async findUserById(id) {
    try {
      const result = await queryExecutor(
        'SELECT id, email, hash FROM users WHERE id = $1',
        [id]
      );

      return result.rows[0] || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  /**
   * Validate user credentials
   * @param {string} email - User's email
   * @param {string} hashedPassword - User's password
   * @returns {Promise<Object|null>} - User object if valid, null otherwise
   */
  async validateUser(email, hashedPassword) {
    try {
      const result = await queryExecutor(
        'SELECT id, email FROM users WHERE email = $1 AND hash = $2',
        [email, hashedPassword]
      );

      return result.rows[0] || null;
    } catch (error) {
      console.error('Error validating user:', error);
      throw error;
    }
  }

  /**
   * Update user's password hash
   * @param {number} userId - User ID
   * @param {string} newHash - New password hash
   * @returns {Promise<boolean>} - True if update was successful
   */
  async updateUserHash(userId, newHash) {
    try {
      const result = await queryExecutor(
        'UPDATE users SET hash = $1 WHERE id = $2 RETURNING id',
        [newHash, userId]
      );

      return result.rows.length > 0;
    } catch (error) {
      console.error('Error updating user hash:', error);
      throw error;
    }
  }
}

module.exports = new UserDAO(); 