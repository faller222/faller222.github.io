const jwt = require('jsonwebtoken');
const {UserDAO, LoginDAO} = require('../daos');
const {loginSMB, getBlogReplyUrl} = require('../utils/smbLogin');
const CryptoJS = require('crypto-js');

class AuthService {
  /**
   * Authenticate a user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} - Authentication result with token
   * @throws {Error} - If credentials are invalid or server error occurs
   */
  async login(email, password) {
    try {
      // Hash the password
      const hashedPassword = CryptoJS.MD5(password).toString();

      // Authenticate with SMB using refactored loginSMB
      const smbLoginResult = await loginSMB(email, hashedPassword);

      if (!smbLoginResult.success) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
      }

      // Check if user exists in our database
      let user = await UserDAO.findUserByEmail(email);

      // If user doesn't exist, create one
      if (!user) {
        console.log('User does not exist, creating new user');
        user = await UserDAO.createUser(email, password);
      } else {
        // If the user exists but the hash is different, update it
        if (user.hash !== hashedPassword) {
          console.log('Hash is different, updating user hash');
          await UserDAO.updateUserHash(user.id, hashedPassword);
        } else {
          console.log('Hash is the same, no update needed');
        }
      }

      // Record login
      await LoginDAO.recordLogin(user.id);

      // Get reply URL from blog if blog URL exists
      let replyUrl = null;
      if (smbLoginResult.urls.blog) {
        const blogResult = await getBlogReplyUrl(smbLoginResult.urls.blog, smbLoginResult.cookies);
        replyUrl = blogResult.reply;
      }

      // Create JWT payload with URLs
      const payload = {
        user: {
          email: user.email
        },
        urls: {
          album: smbLoginResult.urls.album,
          blog: smbLoginResult.urls.blog,
          reply: replyUrl
        }
      };

      // Sign and return token
      return new Promise((resolve, reject) => {
        jwt.sign(
          payload,
          process.env.JWT_SECRET || 'mysecrettoken',
          {expiresIn: '1h'},
          (err, token) => {
            if (err) {
              reject(err);
              return;
            }

            resolve({
              token_type: 'Bearer',
              access_token: token,
              expires_in: 3600
            });
          }
        );
      });
    } catch (error) {
      // Rethrow with status code if it's already set
      if (error.statusCode) {
        throw error;
      }

      // Otherwise log and throw a server error
      console.error('Login error:', error);
      const serverError = new Error('Server error');
      serverError.statusCode = 500;
      throw serverError;
    }
  }

  /**
   * Verify and decode a JWT token
   * @param {string} token - JWT token to verify
   * @returns {Object} - Decoded token data containing user email and URLs
   * @throws {Error} - If token is invalid or verification fails
   */
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecrettoken');
      return {
        email: decoded.user.email,
        urls: {
          album: decoded.urls.album,
          blog: decoded.urls.blog,
          reply: decoded.urls.reply
        }
      };
    } catch (err) {
      const error = new Error('Token is not valid');
      error.statusCode = 401;
      throw error;
    }
  }
}

module.exports = new AuthService(); 