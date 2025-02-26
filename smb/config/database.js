const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Database configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'smb_db',
});

// Test the database connection
const testConnection = async () => {
  const client = await pool.connect();
  try {
    await client.query('SELECT NOW()');
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    client.release();
  }
};


module.exports = {
  pool,
  testConnection
}; 