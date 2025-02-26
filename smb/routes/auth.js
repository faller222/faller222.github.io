const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock user database (in a real app, this would be a database)
const users = [
  {
    id: 1,
    username: 'user1',
    password: 'password1'
  },
  {
    id: 2,
    username: 'user2',
    password: 'password2'
  }
];

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  // Check for user
  const user = users.find(user => user.username === username);
  
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check password
  if (password !== user.password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // User matched, create JWT payload
  const payload = {
    user: {
      id: user.id
    }
  };

  // Sign token
  jwt.sign(
    payload,
    process.env.JWT_SECRET || 'mysecrettoken',
    { expiresIn: '1h' },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
});

module.exports = router; 