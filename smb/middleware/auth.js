const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');

  // Check if no token
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Check if token format is correct (Bearer token)
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format, use Bearer token' });
  }

  try {
    // Extract token from Bearer format
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth; 