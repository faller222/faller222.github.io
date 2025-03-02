const NodeCache = require('node-cache');
const SmbService = require('./smbService');

// Create a cache with TTL of 48 hours (in seconds)
const cache = new NodeCache({
  stdTTL: 48 * 60 * 60,
  checkperiod: 60 * 60, // Check for expired keys every hour
  useClones: false // Store references to objects, not clones
});

/**
 * Get an SmbService instance for a specific email
 * Returns a cached instance if available, or creates a new one
 * @param {string} email - User email to identify the instance
 * @param {Object} options - Optional configuration for the SmbService instance
 * @returns {SmbService} - SmbService instance
 */
const getInstance = (email) => {
  if (!email) {
    throw new Error('Email is required to get an SmbService instance');
  }
  
  // Normalize email to use as cache key (lowercase)
  const cacheKey = email.toLowerCase();
  
  // Check if we have a cached instance
  let instance = cache.get(cacheKey);
  
  // If no cached instance, create a new one
  if (!instance) {
    console.log(`Creating new SmbService instance for ${email}`);
    
    // Create new instance
    instance = new SmbService();
    
    // Store in cache
    cache.set(cacheKey, instance);
  } else {
    console.log(`Using cached SmbService instance for ${email}`);
  }
  
  return instance;
};

// Export only the getInstance function
module.exports = getInstance; 