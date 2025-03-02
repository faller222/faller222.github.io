const SmbService = require('../utils/smbService');
require('dotenv').config();

const GREEN='\x1b[0;32m'
const YELLOW='\x1b[1;33m'
const RED='\x1b[0;31m'
const NC='\x1b[0m'

// Configuration
const config = {
  email: process.env.SMB_EMAIL || 'user@example.com',
  password: process.env.SMB_PASSWORD || 'yourpassword',
};

// Create SmbService instance
const smbService = new SmbService();

/**
 * Format time in seconds to a human-readable format (HH:MM:SS)
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string
 */
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

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
 * Main execution flow
 */
const main = async () => {
  // Start time tracking
  const startTime = Date.now();
  let response;
  
  try {
    // Initial sleep (10-30 seconds)
    await randomSleep(10, 30);
    
    // Visit main page
    console.log(`Visiting Main Page...`);
    await smbService.main()

    // Sleep (5-10 seconds)
    await randomSleep(5, 10);


    // Login
    console.log(`Attempting login with: ${config.email}`);
    response = await smbService.login(config.email, config.password);
    console.log(`Login - Authentication status: ${response.isAuthenticated ? GREEN+'Authenticated'+NC : YELLOW+'Not authenticated'+NC}`);
    if (!response.isAuthenticated) return;

    // Sleep (10-15 seconds)
    await randomSleep(10, 15);
    
    // Visit cPanel
    console.log(`Visiting Control Panel...`);
    response = await smbService.cPanel();
    console.log(`cPanel - Authentication status: ${response.isAuthenticated ? GREEN+'Authenticated'+NC : YELLOW+'Not authenticated'+NC}`);
    if (!response.isAuthenticated) return;
    
    // Sleep (30-40 seconds)
    await randomSleep(30, 40);
    
    // Visit messages
    console.log(`Visiting Messages...`);
    response = await smbService.messages();
    console.log(`messages - Authentication status: ${response.isAuthenticated ? GREEN+'Authenticated'+NC : YELLOW+'Not authenticated'+NC}`);
    if (!response.isAuthenticated) return;
    
    // Sleep (30-60 seconds)
    await randomSleep(30, 60);
    
    // Visit highlights
    console.log(`Visiting Highlights...`);
    response = await smbService.highlights();
    console.log(`highlights - Authentication status: ${response.isAuthenticated ? GREEN+'Authenticated'+NC : YELLOW+'Not authenticated'+NC}`);
    if (!response.isAuthenticated) return;
    
    // Sleep (30-60 seconds)
    await randomSleep(30, 60);
    
    // Visit advertisingStats
    console.log(`Visiting Advertising Stats...`);
    response = await smbService.advertisingStats();
    console.log(`advertisingStats - Authentication status: ${response.isAuthenticated ? GREEN+'Authenticated'+NC : YELLOW+'Not authenticated'+NC}`);
    if (!response.isAuthenticated) return;
    
    // Sleep (30-60 seconds)
    await randomSleep(30, 60);
    
    // Visit stats
    console.log(`Visiting Stats...`);
    response = await smbService.stats();
    console.log(`stats - Authentication status: ${response.isAuthenticated ? GREEN+'Authenticated'+NC : YELLOW+'Not authenticated'+NC}`);
    if (!response.isAuthenticated) return;

    
    // Sleep (30-60 seconds)
    await randomSleep(30, 60);
    
    // Visit main again
    console.log(`Visiting Main Page (Final)...`);
    await smbService.main()
    
    // Final sleep (10 seconds)
    await randomSleep(10, 10);
    
    console.log('Navigation sequence completed successfully.');
  } catch (error) {
    console.error(`${RED}An error occurred during execution:${NC}`, error.message);
  } finally {
    // Calculate and display total execution time
    const endTime = Date.now();
    const totalTimeSeconds = (endTime - startTime) / 1000;
    console.log(`${GREEN}Total execution time: ${formatTime(totalTimeSeconds)} (${totalTimeSeconds.toFixed(2)} seconds)${NC}`);
  }
};

// Run the main function
main(); 