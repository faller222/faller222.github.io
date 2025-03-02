const SmbProxy = require('./smbProxy');
const CryptoJS = require('crypto-js');

/**
 * SmbService class for handling interactions with sexomercadobcn.com
 * Each instance maintains its own SmbProxy instance
 */
class SmbService {
  /**
   * Create a new SmbService instance
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    // Create a new SmbProxy instance
    this.proxy = new SmbProxy(options);
    
    // Define URLs for various SMB operations
    this.urls = {
      main: '/',
      login: '/login.php?do=login',
      cPanel: '/usercp.php',
      messages: '/private.php',
      highlights: '/profile.php?do=highlights',
      advertisingStats: '/profile.php?do=advertisingStats',
      stats: '/estadisticas.php'
    };
    
    // Initialize authentication state
    this.isAuthenticated = false;
  }
  
  /**
   * Check if user is authenticated
   * @param {string} html - HTML content to check
   * @returns {boolean} - True if authenticated, false otherwise
   */
  checkAuthentication(html) {
    // Check if login form is present (indicating not authenticated)
    const hasLoginForm = html.includes('<form action="login.php?do=login" method="post"');
    const hasPermissionError = html.includes('No has iniciado sesión o no tienes permiso para ver esta página');
    
    // If login form or permission error is present, user is not authenticated
    return !(hasLoginForm || hasPermissionError);
  }
  
  /**
   * Make a custom GET request using the proxy
   * @param {string} url - URL to request (relative or absolute)
   * @param {Object} options - Additional axios options
   * @returns {Promise} - Axios response with isAuthenticated flag
   */
  async customGET(url, options = {}) {
    const response = await this.proxy.customGET(url, options);
    
    // Add authentication status to response
    if (response && response.data && typeof response.data === 'string') {
      // Update instance authentication state
      this.isAuthenticated = this.checkAuthentication(response.data);
      response.isAuthenticated = this.isAuthenticated;
    } else {
      this.isAuthenticated = false;
      response.isAuthenticated = false;
    }
    
    return response;
  }
  
  /**
   * Make a custom POST request using the proxy
   * @param {string} url - URL to request (relative or absolute)
   * @param {Object} data - Data to send
   * @param {Object} options - Additional axios options
   * @returns {Promise} - Axios response with isAuthenticated flag
   */
  async customPOST(url, data = {}, options = {}) {
    const response = await this.proxy.customPOST(url, data, options);
    
    // Add authentication status to response
    if (response && response.data && typeof response.data === 'string') {
      // Update instance authentication state
      this.isAuthenticated = this.checkAuthentication(response.data);
      response.isAuthenticated = this.isAuthenticated;
    } else {
      this.isAuthenticated = false;
      response.isAuthenticated = false;
    }
    
    return response;
  }
  
  /**
   * Login to SMB with email and password
   * @param {string} email - User email
   * @param {string} password - User password (plain text, will be hashed with MD5)
   * @returns {Promise} - Axios response
   */
  async login(email, password) {
    // Hash the password with MD5
    const hashedPassword = CryptoJS.MD5(password).toString();
    return this.loginHash(email, hashedPassword);
  }

  /**
   * Login to SMB with email and hash
   * @param {string} email - User email
   * @param {string} hashedPassword - User password (hashed with MD5)
   * @returns {Promise} - Axios response
   */
  async loginHash(email, hashedPassword) {
    
    const formData = {
      vb_login_username: email,
      vb_login_password: '',
      s: '',
      securitytoken: 'guest',
      do: 'login',
      vb_login_md5password: hashedPassword,
      vb_login_md5password_utf: hashedPassword
    };

    return await this.customPOST(this.urls.login, formData);
  }
  
  /**
   * Check if the current instance is authenticated
   * @returns {boolean} - True if authenticated, false otherwise
   */
  getAuthenticationStatus() {
    return this.isAuthenticated;
  }
  
  /**
   * Verify authentication by making a request to the main page
   * This is useful to refresh the authentication status
   * @returns {Promise<boolean>} - True if authenticated, false otherwise
   */
  async verifyAuthentication() {
    try {
      await this.main();
    } catch (error) {
      console.error('Error verifying authentication:', error.message);
      this.isAuthenticated = false;
    }
    return this.isAuthenticated;
  }
  
  /**
   * Visit the main page
   * @returns {Promise} - Axios response
   */
  async main() {
    return this.customGET(this.urls.main);
  }
  
  /**
   * Visit the control panel
   * @returns {Promise} - Axios response
   */
  async cPanel() {
    return this.customGET(this.urls.cPanel);
  }
  
  /**
   * Get comprehensive user data including URLs and images
   * @returns {Promise<Object>} - Complete user data
   */
  async getUserData() {
    try {
      console.log('Fetching comprehensive user data...');
      
      // First, get the control panel data
      const cpanelResponse = await this.cPanel();
      
      // Check if authenticated
      if (!cpanelResponse.isAuthenticated) {
        console.error('User is not authenticated');
        return {
          success: false,
          message: 'User is not authenticated',
          isAuthenticated: false
        };
      }
      
      // Extract URLs from control panel
      const albumMatch = cpanelResponse.data.match(/<a\s+href="([^"]+)"[^>]*>Mi Álbum de Fotos<\/a>/i);
      const blogMatch = cpanelResponse.data.match(/<a\s+href="([^"]+)"[^>]*>Mi Blog<\/a>/i);
      
      const albumUrl = albumMatch ? albumMatch[1].replace(/&amp;/g, '&') : null;
      const blogUrl = blogMatch ? blogMatch[1].replace(/&amp;/g, '&') : null;
      
      console.log('Extracted URLs from cPanel:', { albumUrl, blogUrl });
      
      // Prepare result object
      const result = {
        success: true,
        isAuthenticated: true,
        urls: {
          albumUrl,
          blogUrl,
          replyUrl: null
        },
        albumImages: []
      };
      
      // Get blog reply URL if blog URL exists
      if (blogUrl) {
        console.log('Fetching blog reply URL...');
        const blogResponse = await this.getBlogReplyUrl(blogUrl);
        result.urls.replyUrl = blogResponse.reply;
      }
      
      // Get album images if album URL exists
      if (albumUrl) {
        console.log('Fetching album images...');
        const imagesResponse = await this.getImagesFromURL(albumUrl);
        result.albumImages = imagesResponse.images || [];
        console.log(`Found ${result.albumImages.length} images in album`);
      }
      
      return result;
    } catch (error) {
      console.error('Error in getUserData:', error.message);
      return {
        success: false,
        message: `Error fetching user data: ${error.message}`,
        isAuthenticated: false
      };
    }
  }
  
  /**
   * Visit the messages page
   * @returns {Promise} - Axios response
   */
  async messages() {
    return this.customGET(this.urls.messages);
  }
  
  /**
   * Visit the highlights page
   * @returns {Promise} - Axios response
   */
  async highlights() {
    return this.customGET(this.urls.highlights);
  }
  
  /**
   * Visit the advertising stats page
   * @returns {Promise} - Axios response
   */
  async advertisingStats() {
    return this.customGET(this.urls.advertisingStats);
  }
  
  /**
   * Visit the stats page
   * @returns {Promise} - Axios response
   */
  async stats() {
    return this.customGET(this.urls.stats);
  }
  
  /**
   * Publish a message to the forum
   * @param {String} message - Message to post
   * @param {String} replyUrl - Reply URL
   * @returns {Promise<Object>} - Post result
   */
  async publishMessage(message, replyUrl) {
    console.log('Publishing message to forum:', replyUrl);
    
    try {
      // Make GET request to get the form
      const response = await this.customGET(replyUrl);
      
      // Find the response form
      const formMatch = response.data.match(/<form[^>]*action="newreply\.php[^>]*>([\s\S]*?)<\/form>/i);
      
      if (!formMatch) {
        console.error('No form found in the response');
        return { success: false, message: 'No form found in the response' };
      }
      
      // Extract the form action URL
      const actionMatch = formMatch[0].match(/<form[^>]*action=["']([^"']*)["']/);
      
      let actionUrl;
      if (actionMatch) {
        actionUrl = actionMatch[1].replace(/&amp;/g, '&');
      } else {
        console.error('No action URL found in the form');
        return { success: false, message: 'No action URL found in the form' };
      }
      
      const params = {};
      
      // Extract form parameters
      const formContent = formMatch[1];  // Content inside the form
      const inputs = [...formContent.matchAll(/<input[^>]+>/gi)];
      
      inputs.forEach(input => {
        const nameMatch = input[0].match(/name="([^"]+)"/);
        const valueMatch = input[0].match(/value="([^"]*)"/);
        const typeMatch = input[0].match(/type="([^"]+)"/);
        
        // Exclude submit or button inputs
        if (nameMatch && valueMatch && (!typeMatch || (typeMatch[1] !== 'submit' && typeMatch[1] !== 'button'))) {
          params[nameMatch[1]] = valueMatch[1];
          console.log(`Found form parameter: ${nameMatch[1]} = ${valueMatch[1]}`);
        }
      });
      
      // Add the message to the form parameters
      const newParams = {
        message: message,
        ...params,
        parseame: 1,
        parseame_check: 1,
        emailupdate: 1
      };
      
      console.log('Posting with parameters:', Object.keys(newParams).join(', '));
      
      // Submit the form
      const result = await this.customPOST(actionUrl, newParams);
      
      console.log(`Post result status: ${result.status}`);
      
      return {
        success: result.status === 200,
        status: result.status,
        data: result.data
      };
    } catch (error) {
      console.error('Error publishing message:', error.message);
      return {
        success: false,
        message: `Error publishing: ${error.message}`
      };
    }
  }
  
  /**
   * Get images from a specific URL
   * @param {String} url - URL to fetch images from
   * @returns {Promise<Object>} - Object containing images and response data
   */
  async getImagesFromURL(url) {
    try {
      console.log(`Getting images from URL: ${url}`);

      // Make request to the URL using the proxy instance
      const response = await this.customGET(url);

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
   * @returns {Promise<Object>} - Object containing reply URL and response data
   */
  async getBlogReplyUrl(url) {
    try {
      // console.log(`Getting reply URL from blog: ${url}`);

      // Make request to the URL using the proxy instance
      const response = await this.customGET(url);

      // Extract reply URL using regex pattern
      const match = response.data.match(/<a\s+[^>]*href="([^"]+)"[^>]*>\s*Responder\s*<\/a>/i);
      const replyUrl = match ? match[1].replace(/&amp;/g, '&') : null;

      // console.log(`Reply URL found: ${replyUrl}`);

      return {
        data: response.data,
        cookies: this.getCookieString(),
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
  
  /**
   * Get the current cookies from the proxy
   * @returns {Object} - Current cookies
   */
  getCookies() {
    return this.proxy.getCookies();
  }
  
  /**
   * Get all cookies as a string for HTTP headers
   * @returns {string} - Cookies formatted for HTTP header
   */
  getCookieString() {
    return this.proxy.getCookieString();
  }
}

module.exports = SmbService; 