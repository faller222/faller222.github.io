const AuthService = require('../services/AuthService');

const auth = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');

  // Check if no token
  if (!authHeader) {
    return res.status(401).json({message: 'No token, authorization denied'});
  }

  // Check if token format is correct (Bearer token)
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({message: 'Invalid token format, use Bearer token'});
  }

  try {
    // Extract token from Bearer format
    const token = authHeader.split(' ')[1];

    // Use AuthService to verify and decode the token
    const decodedData = AuthService.verifyToken(token);

    // Add decoded data to request
    req.user = {email: decodedData.email};
    req.urls = decodedData.urls;

    next();
  } catch (err) {
    const statusCode = err.statusCode || 401;
    res.status(statusCode).json({message: err.message || 'Token is not valid'});
  }
};

module.exports = auth; 