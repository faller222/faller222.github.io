const SmbProxy = require('./smbProxy');
const CryptoJS = require('crypto-js');
require('dotenv').config();

// Configuration
const config = {
  email: process.env.SMB_EMAIL || 'user@example.com',
  password: process.env.SMB_PASSWORD || 'yourpassword'
};

// Create a single instance of SmbProxy to be used across all methods
const smbProxy = new SmbProxy();

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
    
    // Make request to the URL
    const response = await smbProxy.customGET(url);
    
    // Check authentication status
    const isAuthenticated = checkAuthentication(response.data);
    console.log(`${pageName} - Authentication status: ${isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);
    
    return isAuthenticated;
  } catch (error) {
    console.error(`Error visiting ${pageName}:`, error.message);
    return false;
  }
};

/**
 * Login to SMB
 * @returns {Promise<boolean>} - Promise that resolves to login success status
 */
const login = async () => {
  try {
    console.log(`Attempting login with: ${config.email}`);
    
    // Hash the password with MD5
    const hashedPassword = CryptoJS.MD5(config.password).toString();
    
    // Make login request
    const response = await smbProxy.login(config.email, hashedPassword);
    
    // Check login success
    const isAuthenticated = response.data.includes("Gracias por iniciar sesión") ||
                           !response.data.includes('<form action="login.php?do=login" method="post"');
    
    console.log(`Login - Authentication status: ${isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);
    
    return isAuthenticated;
  } catch (error) {
    console.error('Login failed:', error.message);
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
    const mainPageAuth = await visitPage(smbProxy.urls.main, 'Main Page');
    
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
    const cpanelAuth = await visitPage(smbProxy.urls.cPanel, 'Control Panel');
    if (!cpanelAuth) {
      console.log('Not authenticated at Control Panel. Exiting...');
      return;
    }
    
    // Sleep (30-40 seconds)
    await randomSleep(30, 40);
    
    // Visit messages
    const messagesAuth = await visitPage(smbProxy.urls.messages, 'Messages');
    if (!messagesAuth) {
      console.log('Not authenticated at Messages. Exiting...');
      return;
    }
    
    // Sleep (30-60 seconds)
    await randomSleep(30, 60);
    
    // Visit highlights
    const highlightsAuth = await visitPage(smbProxy.urls.highlights, 'Highlights');
    if (!highlightsAuth) {
      console.log('Not authenticated at Highlights. Exiting...');
      return;
    }
    
    // Sleep (30-60 seconds)
    await randomSleep(30, 60);
    
    // Visit advertisingStats
    const advertisingStatsAuth = await visitPage(smbProxy.urls.advertisingStats, 'Advertising Stats');
    if (!advertisingStatsAuth) {
      console.log('Not authenticated at Advertising Stats. Exiting...');
      return;
    }
    
    // Sleep (30-60 seconds)
    await randomSleep(30, 60);
    
    // Visit stats
    const statsAuth = await visitPage(smbProxy.urls.stats, 'Stats');
    if (!statsAuth) {
      console.log('Not authenticated at Stats. Exiting...');
      return;
    }
    
    // Sleep (30-60 seconds)
    await randomSleep(30, 60);
    
    // Visit main again
    await visitPage(smbProxy.urls.main, 'Main Page (Final)');
    
    // Final sleep (10 seconds)
    await randomSleep(10, 10);
    
    console.log('Navigation sequence completed successfully.');
  } catch (error) {
    console.error('An error occurred during execution:', error.message);
  }
};

// Run the main function
if (require.main === module) {
  console.log('Starting SmbProxy test...');
  main().then(() => {
    console.log('Test completed.');
  }).catch(error => {
    console.error('Test failed:', error.message);
  });
}

module.exports = {
  main,
  randomSleep,
  visitPage,
  login,
  checkAuthentication
}; 