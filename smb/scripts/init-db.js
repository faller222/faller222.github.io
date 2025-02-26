const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Configuración de la base de datos
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'smb_db',
});

// Función para ejecutar el script DDL
async function initializeDatabase() {
  const client = await pool.connect();
  try {
    console.log('Conectado a la base de datos PostgreSQL');
    
    // Leer el archivo DDL.sql
    const ddlPath = path.join(__dirname, '..', 'DDL.sql');
    const ddlScript = fs.readFileSync(ddlPath, 'utf8');
    
    console.log('Ejecutando script DDL...');
    
    // Ejecutar el script DDL
    await client.query(ddlScript);
    
    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

// Ejecutar la función
initializeDatabase(); 