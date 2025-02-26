const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const smbAuthRoutes = require('./routes/smbAuth');
const smbProtectedRoutes = require('./routes/smbProtected');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/smb', smbAuthRoutes);
app.use('/api/smb/protected', smbProtectedRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 