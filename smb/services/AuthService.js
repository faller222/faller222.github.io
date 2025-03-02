const jwt = require('jsonwebtoken');
const {UserDAO, LoginDAO} = require('../daos');
const CryptoJS = require('crypto-js');

const smbFactory = require('../utils/smbFactory');

class AuthService {
  /**
   * Authenticate a user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {Object} deviceInfo - Device information (ip, device, os, browser)
   * @returns {Promise<Object>} - Authentication result with token
   * @throws {Error} - If credentials are invalid or server error occurs
   */
  async login(email, password, deviceInfo = {}) {
    const smbService = smbFactory(email);

    try {
      // Hash the password
      const hashedPassword = CryptoJS.MD5(password).toString();

      // Authenticate with SMB using refactored loginSMB
      const smbLoginResult = await smbService.login(email, password);

      if (!smbLoginResult.isAuthenticated) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
      }

      // Check if user exists in our database
      let user = await UserDAO.findUserByEmail(email);

      // If user doesn't exist, create one
      if (!user) {
        console.log('User does not exist, creating new user');
        user = await UserDAO.createUser(email, hashedPassword);
      } else {
        // If the user exists but the hash is different, update it
        if (user.hash !== hashedPassword) {
          console.log('Hash is different, updating user hash');
          await UserDAO.updateUserHash(user.id, hashedPassword);
        } else {
          console.log('Hash is the same, no update needed');
        }
      }

      // Record login with device information
      await LoginDAO.recordLogin(user.id, deviceInfo);

      // Generate JWT token
      const token = this.generateToken(email);

      return {
        access_token: token,
        token_type: 'Bearer',
        expires_in: process.env.JWT_EXPIRATION || 3600
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Verify and decode a JWT token
   * @param {string} token - JWT token to verify
   * @returns {Object} - Decoded token data containing user email and URLs
   * @throws {Error} - If token is invalid or verification fails
   */
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecrettoken');
      const smbService = smbFactory(decoded.user.email);

      let user = await UserDAO.findUserByEmail(decoded.user.email);
      if (!smbService.getAuthenticationStatus()) {
        await smbService.loginHash(user.email, user.hash);
      }

      return {
        email: decoded.user.email
      };
    } catch (err) {
      const error = new Error('Token is not valid');
      error.statusCode = 401;
      throw error;
    }
  }

  /**
   * Generate a JWT token for a user
   * @param {string} email - User's email
   * @returns {string} - JWT token
   */
  generateToken(email) {
    // Create JWT payload
    const payload = {
      user: {
        email: email
      }
    };

    // Sign and return token
    return jwt.sign(
      payload,
      process.env.JWT_SECRET || 'mysecrettoken',
      { expiresIn: process.env.JWT_EXPIRATION || '48h' }
    );
  }
}

module.exports = new AuthService(); 