const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Use DATABASE_URL if available (Heroku provides this), otherwise use individual config params
let dbConfig;

if (process.env.DATABASE_URL) {
  dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  };
} else {
  dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'smb_db',
    ssl: { rejectUnauthorized: false }
  };
}

// console.log('Database config:', process.env.DATABASE_URL ? 'Using DATABASE_URL' : dbConfig);

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