const axios = require('axios');
const querystring = require('querystring');
const CryptoJS = require('crypto-js');

// Configuration
const config = {
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

/**
 * Clean cookies from Set-Cookie header
 * @param {Array|String} setCookieHeader - Cookies from response headers
 * @returns {String} - Cleaned cookies string
 */
function cleanCookies(setCookieHeader) {
  if (!setCookieHeader) return '';

  const cookiesArray = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : setCookieHeader.split(', ');

  return cookiesArray
    .map(cookie => cookie.split(';')[0])
    .join('; ');
}

/**
 * Login to SMB with email and password
 * @param {String} email - User email
 * @param {String} hashedPassword - User password (hashed)
 * @returns {Promise} - Login result with authentication status and URLs
 */
async function loginSMB(email, hashedPassword) {
  try {
    console.log(`Attempting login for ${email}`);

    const formData = {
      vb_login_username: email,
      vb_login_password: '',
      s: '',
      securitytoken: 'guest',
      do: 'login',
      vb_login_md5password: hashedPassword,
      vb_login_md5password_utf: hashedPassword
    };

    // Make login request
    const loginResponse = await axios.post(
      config.urls.login,
      querystring.stringify(formData),
      {
        headers: {...config.headers.base, ...config.headers.form},
        withCredentials: true
      }
    );

    // Extract cookies
    let cookies = '';
    if (loginResponse.headers['set-cookie']) {
      cookies = cleanCookies(loginResponse.headers['set-cookie']);
    }

    // Check login success
    const isLoggedIn = loginResponse.data.includes("Gracias por iniciar sesión");

    if (!isLoggedIn) {
      return {
        success: false,
        message: 'Login failed',
        cookies: cookies
      };
    }

    console.log('Login successful, verifying authentication...');

    // Wait briefly for session establishment
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verify authentication and get URLs
    const verifyResponse = await axios.get(
      config.urls.cPanel,
      {
        headers: {
          ...config.headers.base,
          'Cookie': cookies
        },
        withCredentials: true
      }
    );

    // Extract URLs
    const albumMatch = verifyResponse.data.match(/<a\s+href="([^"]+)"[^>]*>Mi Álbum de Fotos<\/a>/i);
    const blogMatch = verifyResponse.data.match(/<a\s+href="([^"]+)"[^>]*>Mi Blog<\/a>/i);

    const albumUrl = albumMatch ? albumMatch[1] : null;
    const blogUrl = blogMatch ? blogMatch[1] : null;

    return {
      success: true,
      message: 'Login successful',
      cookies: cookies,
      isAuthenticated: !!albumMatch,
      urls: {
        album: albumUrl,
        blog: blogUrl
      }
    };
  } catch (error) {
    console.error('Error in loginSMB:', error.message);
    return {
      success: false,
      message: `Login error: ${error.message}`,
      error: error
    };
  }
}

/**
 * Get images from a URL
 * @param {String} url - URL to fetch images from
 * @returns {Promise<Array>} - Array of image URLs
 */
async function getImagesFromURL(url) {
  try {
    console.log(`Getting images from URL: https://www.sexomercadobcn.com/${url}`);
    
    // Make request to the URL without cookies for now
    const response = await axios.get(
      `https://www.sexomercadobcn.com/${url}`,
      {
        headers: {
          ...config.headers.base
        },
        withCredentials: true
      }
    );
    
    // Extract image URLs using regex pattern
    const imageUrls = [...response.data.matchAll(/<a[^>]*href="\.(\/albumpics\/[^"]*)"[^>]*>/gi)]
      .map(match => "https://www.sexomercadobcn.com" + match[1]);
    
    console.log(`Found ${imageUrls.length} images`);
    
    return {
      data: response.data,
      status: response.status,
      images: imageUrls
    };
  } catch (error) {
    console.error('Error in getImagesFromURL:', error.message);
    return {
      success: false,
      message: `Error fetching images: ${error.message}`,
      images: []
    };
  }
}

module.exports = {
  loginSMB,
  cleanCookies,
  getImagesFromURL
}; 