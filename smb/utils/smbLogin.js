const SmbProxy = require('./smbProxy');

// Create a single instance of SmbProxy to be used across all methods
const smbProxy = new SmbProxy();


/**
 * Login to SMB with email and password
 * @param {String} email - User email
 * @param {String} hashedPassword - User password (hashed)
 * @returns {Promise} - Login result with authentication status and URLs
 */
async function loginSMB(email, hashedPassword) {
  try {
    console.log(`Attempting login for ${email}`);
    
    // Make login request using the shared smbProxy instance
    const loginResponse = await smbProxy.login(email, hashedPassword);

    // Get cookies from the proxy
    const cookies = smbProxy.getCookieString();

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
    const verifyResponse = await smbProxy.cPanel();

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
    console.log(`Getting images from URL: ${url}`);
    
    // Make request to the URL using the shared smbProxy instance
    const response = await smbProxy.customGET(url);
    
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

/**
 * Get reply URL from blog
 * @param {String} url - Blog URL to fetch reply URL from
 * @returns {Promise} - Object containing reply URL and response data
 */
async function getBlogReplyUrl(url) {
  try {
    console.log(`Getting reply URL from blog: ${url}`);
    
    // Make request to the URL using the shared smbProxy instance
    const response = await smbProxy.customGET(url);
    
    // Extract reply URL using regex pattern
    const match = response.data.match(/<a\s+[^>]*href="([^"]+)"[^>]*>\s*Responder\s*<\/a>/i);
    const replyUrl = match ? match[1].replace(/&amp;/g, '&') : null;
    
    console.log(`Reply URL found: ${replyUrl}`);
    
    return {
      data: response.data,
      cookies: smbProxy.getCookieString(),
      status: response.status,
      reply: replyUrl
    };
  } catch (error) {
    console.error('Error in getBlogReplyUrl:', error.message);
    return {
      success: false,
      message: `Error fetching reply URL: ${error.message}`,
      reply: null
    };
  }
}

module.exports = {
  loginSMB,
  getImagesFromURL,
  getBlogReplyUrl
}; 