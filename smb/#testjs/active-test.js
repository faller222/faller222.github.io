const axios = require('axios');
require('dotenv').config();

// Configuration
const config = {
  urls: {
    main: 'https://www.sexomercadobcn.com/'
  },
  headers: {
    base: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  }
};

/**
 * Check site with cookies
 */
const checkWithCookies = async () => {
  try {
    const cookies = process.env.SMB_COOKIES || '';
    
    if (!cookies) {
      console.error('No cookies provided. Set SMB_COOKIES environment variable.');
      return {
        success: false,
        data: null
      };
    }

    const response = await axios.get(
      config.urls.main, 
      {
        headers: { 
          ...config.headers.base, 
          'Cookie': cookies 
        },
        withCredentials: true
      }
    );
    
    // Check if we're authenticated by looking for common authenticated user elements
    const isAuthenticated = response.data.includes("return log_out('¿Realmente quieres finalizar tu sesión?')")
    
    return {
      success: true,
      authenticated: isAuthenticated,
      data: response.data
    };
  } catch (error) {
    console.error('Request failed:', error.message);
    return {
      success: false,
      data: null
    };
  }
};

/**
 * Main execution flow
 */
const main = async () => {
  console.log('Checking site with provided cookies...');
  
  const result = await checkWithCookies();
  
  if (result.success) {
    console.log('Request successful');
    console.log('Authentication status:', result.authenticated ? 'Authenticated' : 'Not authenticated');
    
    // You can add more processing of the response data here if needed
    // For example, extract specific information from the HTML
    
    if (result.authenticated) {
      // Example: Extract username if authenticated
      const usernameMatch = result.data.match(/<a[^>]*>([^<]+)<\/a>\s*<\/li>\s*<li[^>]*>\s*<a[^>]*>Mi Perfil<\/a>/i);
      if (usernameMatch && usernameMatch[1]) {
        console.log('Username:', usernameMatch[1].trim());
      }
    }
  } else {
    console.log('Request failed');
  }
};

// Run the main function
main(); 