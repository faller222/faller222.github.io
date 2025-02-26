const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { loginSMB } = require('../utils/smbLogin');

// @route   POST api/smb/login
// @desc    Authenticate user with SMB & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email, passwordProvided: !!password });

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Proceed with normal authentication
    console.log('Attempting SMB login for:', email);
    const loginResult = await loginSMB(email, password);
    
    console.log('Login result flags:', { 
      usuarioInvalido: loginResult.usuarioInvalido, 
      usuarioCorrecto: loginResult.usuarioCorrecto 
    });

    if (loginResult.usuarioInvalido) {
      console.log('Invalid credentials detected for:', email);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    if (loginResult.usuarioCorrecto) {
      console.log('Successful authentication for:', email);
      // User authenticated, create JWT payload
      const payload = {
        user: {
          email: loginResult.email,
          cookies: loginResult.cookies
        }
      };

      // Sign token
      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'mysecrettoken',
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ 
            success: true, 
            message: 'Authentication successful',
            token 
          });
        }
      );
    } else {
      console.log('Unexpected response for:', email, 'Neither success nor failure flags were set');
      // If neither usuarioInvalido nor usuarioCorrecto is set, something unexpected happened
      return res.status(500).json({ 
        success: false, 
        message: 'Authentication error: Unexpected response from server' 
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during authentication' 
    });
  }
});

module.exports = router; 