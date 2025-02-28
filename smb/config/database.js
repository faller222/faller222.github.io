const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'smb_db',
  ssl: { rejectUnauthorized: false }
}

console.log(dbConfig);

// Database configuration
const pool = new Pool(dbConfig);

// Test the database connection
const testConnection = async () => {
  try {
    await queryExecutor('SELECT NOW()');
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

function queryExecutor(query, params = []) {
  return pool.connect()
    .then(client => {
      return client.query(query, params)
        .finally(() => client.release());
    })
    .catch(e => {
      throw e;
    });
}


module.exports = {
  pool,
  testConnection,
  queryExecutor
}; 