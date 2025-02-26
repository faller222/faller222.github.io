const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.API_URL || 'http://localhost:3000';

// Test credentials
const testEmail = process.argv[2] || process.env.SMB_EMAIL || 'user@example.com';
const testPassword = process.argv[3] || process.env.SMB_PASSWORD || 'yourpassword';

async function testLogin() {
  console.log('=== TEST DE AUTENTICACIÓN SMB ===');
  console.log(`Intentando login con email: ${testEmail}`);
  console.log('--------------------------------');
  
  try {
    // Attempt to login
    const loginResponse = await axios.post(`${API_URL}/login`, {
      email: testEmail,
      password: testPassword
    });
    
    console.log('✅ Login exitoso!');
    console.log('Respuesta del login:', JSON.stringify(loginResponse.data, null, 2));
    
    // If we have a token, get user data
    if (loginResponse.data.access_token) {
      console.log('\n=== OBTENIENDO DATOS DEL USUARIO ===');
      console.log('Accediendo a la ruta protegida con el token...');
      console.log('--------------------------------------');
      
      try {
        const userDataResponse = await axios.get(`${API_URL}/api/user`, {
          headers: {
            'Authorization': `Bearer ${loginResponse.data.access_token}`
          }
        });
        
        console.log('✅ Datos del usuario obtenidos correctamente!');
        console.log('Información del usuario:');
        console.log(JSON.stringify(userDataResponse.data, null, 2));
      } catch (error) {
        console.error('❌ Error al obtener datos del usuario:');
        console.error(error.response?.data || error.message);
        if (error.response) {
          console.error('Status:', error.response.status);
        }
      }
    }
  } catch (error) {
    console.error('❌ Login fallido!');
    console.error('Error:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
    }
  }
}

testLogin(); 