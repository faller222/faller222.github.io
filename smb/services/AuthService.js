const jwt = require('jsonwebtoken');
const { UserDAO, LoginDAO } = require('../daos');
const { loginSMB } = require('../utils/smbLogin');
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
      // Hash the password with MD5
      const hashedPassword = CryptoJS.MD5(password).toString();
      
      // Authenticate with SMB
      const smbLoginResult = await loginSMB(email, hashedPassword);
      
      if (!smbLoginResult.usuarioCorrecto) {
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

      // Create JWT payload
      const payload = {
        user: {
          id: user.id
        }
      };

      // Sign and return token
      return new Promise((resolve, reject) => {
        jwt.sign(
          payload,
          process.env.JWT_SECRET || 'mysecrettoken',
          { expiresIn: '1h' },
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
}

module.exports = new AuthService(); 