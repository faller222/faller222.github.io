const axios = require('axios');
const CryptoJS = require('crypto-js');
const querystring = require('querystring');
require('dotenv').config();

// Configuration
const config = {
  email: process.argv[2] || process.env.SMB_EMAIL || 'user@example.com',
  password: process.argv[3] || process.env.SMB_PASSWORD || 'yourpassword',
  urls: {
    login: 'https://www.sexomercadobcn.com/login.php?do=login',
    cPanel: 'https://www.sexomercadobcn.com/usercp.php'
  },
  headers: {
    base: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    form: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
};

// State
let cookies = '';

/**
 * Clean cookies from Set-Cookie header
 */
const cleanCookies = (setCookieHeader) => {
  if (!setCookieHeader) return '';
  
  const cookiesArray = Array.isArray(setCookieHeader) 
    ? setCookieHeader 
    : setCookieHeader.split(', ');

  return cookiesArray
    .map(cookie => cookie.split(';')[0])
    .join('; ');
};

/**
 * Login to SMB
 */
const login = async () => {
  try {
    const hashedPassword = CryptoJS.MD5(config.password).toString();
    
    const formData = {
      vb_login_username: config.email,
      vb_login_password: '',
      s: '',
      securitytoken: 'guest',
      do: 'login',
      vb_login_md5password: hashedPassword,
      vb_login_md5password_utf: hashedPassword
    };

    const response = await axios.post(
      config.urls.login, 
      querystring.stringify(formData), 
      {
        headers: { ...config.headers.base, ...config.headers.form },
        withCredentials: true
      }
    );
    
    // Save cookies
    if (response.headers['set-cookie']) {
      cookies = cleanCookies(response.headers['set-cookie']);
    }
    
    return response.data.includes("Gracias por iniciar sesión");
  } catch (error) {
    console.error('Login failed:', error.message);
    return false;
  }
};

/**
 * Check if user is authenticated
 */
const checkAuth = async () => {
  try {
    const response = await axios.get(
      config.urls.cPanel, 
      {
        headers: { 
          ...config.headers.base, 
          'Cookie': cookies 
        },
        withCredentials: true
      }
    );
    
    // Check for authentication indicators
    const albumMatch = response.data.match(/<a\s+href="([^"]+)"[^>]*>Mi Álbum de Fotos<\/a>/i);

    const isAuthenticated = !!albumMatch ;
    
    if (albumMatch) {
      console.log('Album URL:', albumMatch[1]);
    }
    
    return isAuthenticated;
  } catch (error) {
    console.error('Auth check failed:', error.message);
    return false;
  }
};

/**
 * Main execution flow
 */
const main = async () => {
  console.log(`Attempting login with: ${config.email}`);
  
  const isLoggedIn = await login();
  
  if (isLoggedIn) {
    console.log('Login successful');
    console.log('Cookies:', cookies);
    
    // Wait for session establishment
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isAuthenticated = await checkAuth();
    console.log('Authentication status:', isAuthenticated ? 'Authenticated' : 'Not authenticated');
  } else {
    console.log('Login failed');
  }
};

// Run the main function
main();
