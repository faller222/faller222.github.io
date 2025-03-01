const axios = require('axios');
const CryptoJS = require('crypto-js');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration
const config = {
  email: process.env.SMB_EMAIL || 'user@example.com',
  password: process.env.SMB_PASSWORD || 'yourpassword',
  urls: {
    main: 'https://www.sexomercadobcn.com/',
    login: 'https://www.sexomercadobcn.com/login.php?do=login',
    cPanel: 'https://www.sexomercadobcn.com/usercp.php',
    messages: 'https://www.sexomercadobcn.com/private.php',
    highlights: 'https://www.sexomercadobcn.com/profile.php?do=highlights',
    advertisingStats: 'https://www.sexomercadobcn.com/profile.php?do=advertisingStats',
    stats: 'https://www.sexomercadobcn.com/estadisticas.php'
  },
  headers: {
    base: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    form: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  },
  responsesDir: '.responses'
};

// Ensure responses directory exists
if (!fs.existsSync(config.responsesDir)) {
  fs.mkdirSync(config.responsesDir, { recursive: true });
}

// State
let cookieJar = {};

/**
 * Sleep for a random time between min and max seconds
 * @param {number} minSeconds - Minimum sleep time in seconds
 * @param {number} maxSeconds - Maximum sleep time in seconds
 * @returns {Promise} - Promise that resolves after the sleep
 */
const randomSleep = async (minSeconds, maxSeconds) => {
  const sleepTime = Math.floor(Math.random() * (maxSeconds - minSeconds + 1) + minSeconds);
  console.log(`Sleeping for ${sleepTime} seconds...`);
  return new Promise(resolve => setTimeout(resolve, sleepTime * 1000));
};

/**
 * Process and update cookies from Set-Cookie header
 * @param {Array|string} setCookieHeader - Set-Cookie header from response
 */
const processCookies = (setCookieHeader) => {
  if (!setCookieHeader) return;
  
  const cookiesArray = Array.isArray(setCookieHeader) 
    ? setCookieHeader 
    : setCookieHeader.split(', ');

  cookiesArray.forEach(cookieStr => {
    const cookieParts = cookieStr.split(';')[0].split('=');
    if (cookieParts.length >= 2) {
      const name = cookieParts[0].trim();
      const value = cookieParts.slice(1).join('=').trim();
      cookieJar[name] = value;
    }
  });
};

/**
 * Get all cookies as a string for HTTP headers
 * @returns {string} - Cookies formatted for HTTP header
 */
const getCookieString = () => {
  return Object.entries(cookieJar)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');
};

/**
 * Save HTML response to file
 * @param {string} html - HTML content to save
 * @param {string} pageName - Name of the page for filename
 * @param {boolean} isAuthenticated - Authentication status
 */
const saveResponseToFile = (html, pageName, isAuthenticated) => {
  const status = isAuthenticated ? 'authenticated' : 'not-authenticated';
  const filename = `${pageName.toLowerCase().replace(/\s+/g, '-')}-${status}.html`;
  const filePath = path.join(config.responsesDir, filename);
  
  try {
    fs.writeFileSync(filePath, html);
    console.log(`Response saved to ${filePath}`);
  } catch (error) {
    console.error(`Error saving response to file: ${error.message}`);
  }
};

/**
 * Save current cookies to file for debugging
 */
const saveCookiesToFile = () => {
  const filePath = path.join(config.responsesDir, 'cookies.json');
  try {
    fs.writeFileSync(filePath, JSON.stringify(cookieJar, null, 2));
    console.log(`Cookies saved to ${filePath}`);
  } catch (error) {
    console.error(`Error saving cookies to file: ${error.message}`);
  }
};

/**
 * Check if user is authenticated
 * @param {string} html - HTML content to check
 * @returns {boolean} - True if authenticated, false otherwise
 */
const checkAuthentication = (html) => {
  // Check if login form is present (indicating not authenticated)
  const hasLoginForm = html.includes('<form action="login.php?do=login" method="post"');
  const hasPermissionError = html.includes('No has iniciado sesión o no tienes permiso para ver esta página');
  
  // If login form or permission error is present, user is not authenticated
  return !(hasLoginForm || hasPermissionError);
};

/**
 * Visit a URL and check authentication
 * @param {string} url - URL to visit
 * @param {string} pageName - Name of the page for logging
 * @returns {Promise<boolean>} - Promise that resolves to authentication status
 */
const visitPage = async (url, pageName) => {
  try {
    console.log(`Visiting ${pageName}...`);
    
    // Get current cookie string
    const cookieString = getCookieString();
    console.log(`Using cookies (${Object.keys(cookieJar).length} cookies)`);
    
    // Follow redirects automatically
    const response = await axios.get(url, {
      headers: { 
        ...config.headers.base, 
        'Cookie': cookieString,
        'Referer': config.urls.main
      },
      withCredentials: true
    });
    
    // Update cookies if they're set
    if (response.headers['set-cookie']) {
      processCookies(response.headers['set-cookie']);
      console.log(`Updated cookies (now ${Object.keys(cookieJar).length} cookies)`);
      saveCookiesToFile();
    }

    const isAuthenticated = checkAuthentication(response.data);
    console.log(`${pageName} - Authentication status: ${isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);
    
    // Save response if not authenticated
    if (!isAuthenticated) {
      saveResponseToFile(response.data, pageName, isAuthenticated);
    }
    
    return isAuthenticated;
  } catch (error) {
    console.error(`Error visiting ${pageName}:`, error.message);
    
    // Save error information
    if (error.response) {
      saveResponseToFile(
        `Status: ${error.response.status}\nHeaders: ${JSON.stringify(error.response.headers, null, 2)}\nData: ${error.response.data}`, 
        `${pageName}-error`, 
        false
      );
      
      // Update cookies even on error responses
      if (error.response.headers['set-cookie']) {
        processCookies(error.response.headers['set-cookie']);
        console.log(`Updated cookies from error response (now ${Object.keys(cookieJar).length} cookies)`);
        saveCookiesToFile();
      }
    }
    
    return false;
  }
};

/**
 * Login to SMB
 */
const login = async () => {
  try {
    console.log(`Attempting login with: ${config.email}`);
    
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

    // Get current cookie string
    const cookieString = getCookieString();
    
    const response = await axios.post(
      config.urls.login, 
      querystring.stringify(formData), 
      {
        headers: { 
          ...config.headers.base, 
          ...config.headers.form,
          'Cookie': cookieString,
          'Referer': config.urls.main
        },
        withCredentials: true,
        maxRedirects: 5
      }
    );
    
    // Update cookies if they're set
    if (response.headers['set-cookie']) {
      processCookies(response.headers['set-cookie']);
      console.log(`Updated cookies after login (now ${Object.keys(cookieJar).length} cookies)`);
      saveCookiesToFile();
    }
    
    const isAuthenticated = response.data.includes("Gracias por iniciar sesión") ||
                           !response.data.includes('<form action="login.php?do=login" method="post"');
    
    console.log(`Login - Authentication status: ${isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);
    
    // Save response if not authenticated
    if (!isAuthenticated) {
      saveResponseToFile(response.data, 'Login', isAuthenticated);
    }
    
    return isAuthenticated;
  } catch (error) {
    console.error('Login failed:', error.message);
    
    // Save error information
    if (error.response) {
      saveResponseToFile(
        `Status: ${error.response.status}\nHeaders: ${JSON.stringify(error.response.headers, null, 2)}\nData: ${error.response.data}`, 
        'login-error', 
        false
      );
      
      // Update cookies even on error responses
      if (error.response.headers['set-cookie']) {
        processCookies(error.response.headers['set-cookie']);
        console.log(`Updated cookies from login error (now ${Object.keys(cookieJar).length} cookies)`);
        saveCookiesToFile();
      }
    }
    
    return false;
  }
};

/**
 * Main execution flow
 */
const main = async () => {
  try {
    // Initial sleep (10-30 seconds)
    await randomSleep(10, 30);
    
    // Visit main page to get initial cookies and token
    const mainPageAuth = await visitPage(config.urls.main, 'Main Page');
    
    // Sleep (5-10 seconds)
    await randomSleep(5, 10);
    
    // Login
    const isLoggedIn = await login();
    if (!isLoggedIn) {
      console.log('Login failed. Exiting...');
      return;
    }
    
    // Sleep (10-15 seconds)
    await randomSleep(10, 15);
    
    // Visit cPanel
    const cpanelAuth = await visitPage(config.urls.cPanel, 'Control Panel');
    if (!cpanelAuth) {
      console.log('Not authenticated at Control Panel. Exiting...');
      return;
    }
    
    // Sleep (30-40 seconds)
    await randomSleep(30, 40);
    
    // Visit messages
    const messagesAuth = await visitPage(config.urls.messages, 'Messages');
    if (!messagesAuth) {
      console.log('Not authenticated at Messages. Exiting...');
      return;
    }
    
    // Sleep (30-60 seconds)
    await randomSleep(30, 60);
    
    // Visit highlights
    const highlightsAuth = await visitPage(config.urls.highlights, 'Highlights');
    if (!highlightsAuth) {
      console.log('Not authenticated at Highlights. Exiting...');
      return;
    }
    
    // Sleep (30-60 seconds)
    await randomSleep(30, 60);
    
    // Visit advertisingStats
    const advertisingStatsAuth = await visitPage(config.urls.advertisingStats, 'Advertising Stats');
    if (!advertisingStatsAuth) {
      console.log('Not authenticated at Advertising Stats. Exiting...');
      return;
    }
    
    // Sleep (30-60 seconds)
    await randomSleep(30, 60);
    
    // Visit stats
    const statsAuth = await visitPage(config.urls.stats, 'Stats');
    if (!statsAuth) {
      console.log('Not authenticated at Stats. Exiting...');
      return;
    }
    
    // Sleep (30-60 seconds)
    await randomSleep(30, 60);
    
    // Visit main again
    await visitPage(config.urls.main, 'Main Page (Final)');
    
    // Final sleep (10 seconds)
    await randomSleep(10, 10);
    
    console.log('Navigation sequence completed successfully.');
  } catch (error) {
    console.error('An error occurred during execution:', error.message);
  }
};

// Run the main function
main(); 