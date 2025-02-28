const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.API_URL || 'http://localhost:3000';

// Test credentials
const testEmail = process.argv[2] || process.env.SMB_EMAIL || 'user@example.com';
const testPassword = process.argv[3] || process.env.SMB_PASSWORD || 'yourpassword';

async function testLogin() {
  try {
    console.log('Testing login endpoint...');
    
    // Use credentials from .env file
    const credentials = {
      email: process.env.SMB_EMAIL || 'vene356@gmail.com',
      password: process.env.SMB_PASSWORD || '@Venezolana356'
    };
    
    const response = await axios.post('http://localhost:3000/login', credentials);
    
    if (response.status === 200 && response.data.access_token) {
      console.log('Login successful!');
      console.log('Token:', response.data.access_token);
      
      // Test user data endpoint with the token
      console.log('\nTesting user data endpoint...');
      const userResponse = await axios.get('http://localhost:3000/api/user', {
        headers: {
          'Authorization': `Bearer ${response.data.access_token}`
        }
      });
      
      if (userResponse.status === 200) {
        console.log('User data retrieved successfully!');
        console.log('Email:', userResponse.data.email);
        console.log('Login count:', userResponse.data.logins ? userResponse.data.logins.length : 0);
        console.log('Image count:', userResponse.data.images ? userResponse.data.images.length : 0);
      }
    } else {
      console.log('Login failed:', response.data);
    }
  } catch (error) {
    console.error('Error testing login:', error.response ? error.response.data : error.message);
  }
}

testLogin(); 