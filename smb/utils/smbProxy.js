const axios = require('axios');
const querystring = require('querystring');

/**
 * SmbProxy class for handling HTTP interactions with cookies
 * Each instance maintains its own cookies and axios instance
 */
class SmbProxy {
  /**
   * Create a new SmbProxy instance
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    // Base configuration
    this.baseURL = options.baseURL || 'https://www.sexomercadobcn.com';
    
    // Default headers
    this.headers = {
      base: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      form: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    
    // Override defaults with provided options
    if (options.headers) {
      this.headers = { ...this.headers, ...options.headers };
    }
    
    // Initialize cookies storage
    this.cookies = {};
    
    // Create axios instance with baseURL
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      withCredentials: true
    });
    
    // Add response interceptor to automatically process cookies
    this.axiosInstance.interceptors.response.use(
      (response) => {
        this._processCookies(response.headers['set-cookie']);
        return response;
      },
      (error) => {
        if (error.response && error.response.headers['set-cookie']) {
          this._processCookies(error.response.headers['set-cookie']);
        }
        return Promise.reject(error);
      }
    );
  }
  
  /**
   * Process and update cookies from Set-Cookie header
   * @private
   * @param {Array|string} setCookieHeader - Set-Cookie header from response
   */
  _processCookies(setCookieHeader) {
    if (!setCookieHeader) return;
    
    const cookiesArray = Array.isArray(setCookieHeader) 
      ? setCookieHeader 
      : setCookieHeader.split(', ');
  
    cookiesArray.forEach(cookieStr => {
      const cookieParts = cookieStr.split(';')[0].split('=');
      if (cookieParts.length >= 2) {
        const name = cookieParts[0].trim();
        const value = cookieParts.slice(1).join('=').trim();
        this.cookies[name] = value;
      }
    });
    console.log("Cookies updated", this._getCookieString());
  }
  
  /**
   * Get all cookies as a string for HTTP headers
   * @private
   * @returns {string} - Cookies formatted for HTTP header
   */
  _getCookieString() {
    return Object.entries(this.cookies)
      .map(([name, value]) => `${name}=${value}`)
      .join('; ');
  }
  
  /**
   * Get current headers with cookies
   * @private
   * @param {boolean} isFormSubmission - Whether this is a form submission
   * @returns {Object} - Headers with cookies
   */
  _getHeaders(isFormSubmission = false) {
    const headers = { ...this.headers.base };
    
    if (isFormSubmission) {
      Object.assign(headers, this.headers.form);
    }
    
    const cookieString = this._getCookieString();
    if (cookieString) {
      headers['Cookie'] = cookieString;
    }
    
    return headers;
  }
  
  /**
   * Make a custom GET request
   * @param {string} url - URL to request (relative or absolute)
   * @param {Object} options - Additional axios options
   * @returns {Promise} - Axios response
   */
  async customGET(url, options = {}) {
    try {
      // No need to modify the URL since axios instance has baseURL
      // It will automatically handle relative URLs
      const headers = this._getHeaders();
      
      const response = await this.axiosInstance.get(url, {
        headers,
        ...options
      });
      
      return response;
    } catch (error) {
      console.error(`Error in customGET for ${url}:`, error.message);
      throw error;
    }
  }
  
  /**
   * Make a custom POST request
   * @param {string} url - URL to request (relative or absolute)
   * @param {Object} data - Data to send
   * @param {Object} options - Additional axios options
   * @returns {Promise} - Axios response
   */
  async customPOST(url, data = {}, options = {}) {
    try {
      // No need to modify the URL since axios instance has baseURL
      // It will automatically handle relative URLs
      const headers = this._getHeaders(true);
      
      let formattedData = data;
      if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        formattedData = querystring.stringify(data);
      }
      
      const response = await this.axiosInstance.post(url, formattedData, {
        headers,
        ...options
      });
      
      return response;
    } catch (error) {
      console.error(`Error in customPOST for ${url}:`, error.message);
      throw error;
    }
  }
  
  /**
   * Get the current cookies
   * @returns {Object} - Current cookies
   */
  getCookies() {
    return { ...this.cookies };
  }
  
  /**
   * Get all cookies as a string for HTTP headers
   * @returns {string} - Cookies formatted for HTTP header
   */
  getCookieString() {
    return this._getCookieString();
  }
}

module.exports = SmbProxy; 