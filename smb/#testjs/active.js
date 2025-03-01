const axios = require('axios');
const CryptoJS = require('crypto-js');
const querystring = require('querystring');
require('dotenv').config();

// Configuration
const config = {
  email: process.argv[2] || process.env.SMB_EMAIL || 'user@example.com',
  password: process.argv[3] || process.env.SMB_PASSWORD || 'yourpassword',
  urls: {
    login: 'https://www.sexomercadobcn.com/login.php?do=login'
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
 * Login to SMB and return cookies
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
    
    // Get cookies
    let cookies = '';
    if (response.headers['set-cookie']) {
      cookies = cleanCookies(response.headers['set-cookie']);
    }
    
    const loginSuccess = response.data.includes("Gracias por iniciar sesión");
    
    return {
      success: loginSuccess,
      cookies: cookies
    };
  } catch (error) {
    console.error('Login failed:', error.message);
    return {
      success: false,
      cookies: ''
    };
  }
};

/**
 * Main execution flow
 */
const main = async () => {
  console.log(`Attempting login with: ${config.email}`);
  
  const loginResult = await login();
  
  if (loginResult.success) {
    console.log('Login successful');
    console.log('Cookies:', loginResult.cookies);
  } else {
    console.log('Login failed');
  }
};

// Run the main function
main(); 