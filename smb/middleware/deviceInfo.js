/**
 * Middleware to capture device information and IP address
 * This middleware extracts user agent and IP address from the request
 * and adds it to the request object for use in other middleware or routes
 */
const deviceInfoMiddleware = (req, res, next) => {
  // Get user agent from request headers
  const userAgent = req.headers['user-agent'] || 'Unknown';
  
  // Get IP address
  // Try to get the real IP if behind a proxy
  const ip = req.headers['x-forwarded-for'] || 
             req.headers['x-real-ip'] || 
             req.connection.remoteAddress || 
             'Unknown';
  
  // Detect device type (mobile or desktop)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const deviceType = isMobile ? 'Mobile' : 'Desktop';
  
  // Detect OS and version
  let os = 'Unknown';
  let osVersion = '';
  
  if (/Windows NT 10.0/i.test(userAgent)) os = 'Windows 10';
  else if (/Windows NT 6.3/i.test(userAgent)) os = 'Windows 8.1';
  else if (/Windows NT 6.2/i.test(userAgent)) os = 'Windows 8';
  else if (/Windows NT 6.1/i.test(userAgent)) os = 'Windows 7';
  else if (/Windows NT 6.0/i.test(userAgent)) os = 'Windows Vista';
  else if (/Windows NT 5.1/i.test(userAgent)) os = 'Windows XP';
  else if (/Windows NT 5.0/i.test(userAgent)) os = 'Windows 2000';
  else if (/Mac OS X/i.test(userAgent)) {
    os = 'macOS';
    const macOSVersionMatch = userAgent.match(/Mac OS X ([0-9_]+)/i);
    if (macOSVersionMatch) {
      osVersion = macOSVersionMatch[1].replace(/_/g, '.');
    }
  }
  else if (/Android/i.test(userAgent)) {
    os = 'Android';
    const androidVersionMatch = userAgent.match(/Android ([0-9.]+)/i);
    if (androidVersionMatch) {
      osVersion = androidVersionMatch[1];
    }
  }
  else if (/iOS/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent)) {
    os = 'iOS';
    const iosVersionMatch = userAgent.match(/OS ([0-9_]+)/i);
    if (iosVersionMatch) {
      osVersion = iosVersionMatch[1].replace(/_/g, '.');
    }
  }
  else if (/Linux/i.test(userAgent)) os = 'Linux';
  
  // Detect browser and version
  let browser = 'Unknown';
  let browserVersion = '';
  
  if (/Edge/i.test(userAgent)) {
    browser = 'Edge';
    const edgeVersionMatch = userAgent.match(/Edge\/([0-9.]+)/i);
    if (edgeVersionMatch) {
      browserVersion = edgeVersionMatch[1];
    }
  }
  else if (/Edg/i.test(userAgent)) {
    browser = 'Edge Chromium';
    const edgChromiumVersionMatch = userAgent.match(/Edg\/([0-9.]+)/i);
    if (edgChromiumVersionMatch) {
      browserVersion = edgChromiumVersionMatch[1];
    }
  }
  else if (/Chrome/i.test(userAgent)) {
    browser = 'Chrome';
    const chromeVersionMatch = userAgent.match(/Chrome\/([0-9.]+)/i);
    if (chromeVersionMatch) {
      browserVersion = chromeVersionMatch[1];
    }
  }
  else if (/Firefox/i.test(userAgent)) {
    browser = 'Firefox';
    const firefoxVersionMatch = userAgent.match(/Firefox\/([0-9.]+)/i);
    if (firefoxVersionMatch) {
      browserVersion = firefoxVersionMatch[1];
    }
  }
  else if (/Safari/i.test(userAgent)) {
    browser = 'Safari';
    const safariVersionMatch = userAgent.match(/Safari\/([0-9.]+)/i);
    if (safariVersionMatch) {
      browserVersion = safariVersionMatch[1];
    }
  }
  else if (/Opera|OPR/i.test(userAgent)) {
    browser = 'Opera';
    const operaVersionMatch = userAgent.match(/(?:Opera|OPR)\/([0-9.]+)/i);
    if (operaVersionMatch) {
      browserVersion = operaVersionMatch[1];
    }
  }
  
  // Add device info to request object
  req.deviceInfo = {
    ip: ip,
    device: deviceType,
    os: os + (osVersion ? ' ' + osVersion : ''),
    browser: browser + (browserVersion ? ' ' + browserVersion : ''),
    userAgent: userAgent
  };
  
  next();
};

module.exports = deviceInfoMiddleware; 