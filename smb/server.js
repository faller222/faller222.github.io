const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { testConnection } = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
// Authentication route (public)
app.use('/login', authRoutes);

// Protected API routes
app.use('/api/user', userRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, async () => {
  await testConnection();
  console.log(`Server running on port ${PORT}`);
}); 