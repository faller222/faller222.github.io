const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

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