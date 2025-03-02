/**
 * SMB Post Scheduler
 * 
 * Este script se encarga de publicar mensajes automáticamente en el foro.
 * Está diseñado para ejecutarse periódicamente (por ejemplo, cada hora),
 * pero solo realizará acciones en las horas específicas configuradas.
 * 
 * Configuración de horas:
 * - Por defecto: 13:00 y 16:00
 * - Para personalizar: Establecer variable de entorno ALLOWED_HOURS con valores separados por comas
 *   Ejemplo: ALLOWED_HOURS=9,13,16,20
 * 
 * Para forzar la ejecución independientemente de la hora (útil para pruebas):
 * - Establecer variable de entorno FORCE_EXECUTION=true
 */

const axios = require('axios');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import SmbProxy class
const SmbProxy = require('../utils/smbProxy');

// Configuration
const config = {
  email: process.env.SMB_EMAIL || 'user@example.com',
  password: process.env.SMB_PASSWORD || 'yourpassword',
  apiUrl: 'https://smb-gestion-117c7c904c44.herokuapp.com',
  // Horas permitidas para la ejecución (formato 24h)
  // Si se proporciona en .env, debe ser una lista separada por comas, ej: "13,16,19"
  allowedHours: process.env.ALLOWED_HOURS ? process.env.ALLOWED_HOURS.split(',').map(h => parseInt(h.trim())) : [10, 13, 16],
  // Opción para forzar la ejecución independientemente de la hora
  forceExecution: process.env.FORCE_EXECUTION === 'true'
};

// ===== API Service =====
class ApiService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  /**
   * Login to the SMB Gestion API
   * @returns {Promise<Object>} - Login result with token
   */
  async login(email, password) {
    try {
      console.log(`Logging in to API at ${this.apiUrl}`);
      
      const credentials = { email, password };
      console.log(`Using credentials: ${email}`);
      
      const response = await axios.post(`${this.apiUrl}/login`, credentials);
      
      if (response.status === 200 && response.data.access_token) {
        console.log('API login successful!');
        return {
          success: true,
          token: response.data.access_token
        };
      } else {
        console.error('API login failed:', response.data);
        return {
          success: false,
          message: 'API login failed'
        };
      }
    } catch (error) {
      console.error('Error logging in to API:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      return {
        success: false,
        message: `API login error: ${error.message}`
      };
    }
  }

  /**
   * Get images from the API
   * @param {String} token - Authentication token
   * @returns {Promise<Object>} - User data with images
   */
  async getImages(token) {
    try {
      console.log('Fetching images from API');
      
      const response = await axios.get(`${this.apiUrl}/api/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        const images = response.data.images || [];
        console.log(`Retrieved ${images.length} images from API`);
        return {
          success: true,
          images: images,
          userData: response.data
        };
      } else {
        console.error('Failed to get images from API:', response.data);
        return {
          success: false,
          message: 'Failed to get images from API'
        };
      }
    } catch (error) {
      console.error('Error getting images from API:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      return {
        success: false,
        message: `API error: ${error.message}`
      };
    }
  }
}

// ===== Token Service =====
class TokenService {
  /**
   * Decode a JWT token and return its payload
   * @param {String} token - JWT token
   * @returns {Object} - Decoded token payload
   */
  decodeJwtToken(token) {
    try {
      console.log('Decoding JWT token');
      
      // JWT tokens are split into three parts: header.payload.signature
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('Invalid JWT token format');
        return null;
      }
      
      // The payload is the second part, base64 encoded
      const payload = parts[1];
      
      // Decode the base64 payload
      // Need to replace characters for proper base64 decoding
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT token:', error.message);
      return null;
    }
  }

  /**
   * Extract URLs from token payload
   * @param {Object} decodedToken - Decoded token payload
   * @returns {Array} - Array of URLs found in token
   */
  extractUrlsFromToken(decodedToken) {
    if (!decodedToken) return [];
    
    const urls = [];
    
    // Look for URLs in common JWT claim fields
    Object.keys(decodedToken).forEach(key => {
      const value = decodedToken[key];
      if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
        urls.push({ field: key, url: value });
      } else if (typeof value === 'object' && value !== null) {
        // Look for URLs in nested objects
        Object.keys(value).forEach(nestedKey => {
          const nestedValue = value[nestedKey];
          if (typeof nestedValue === 'string' && (nestedValue.startsWith('http://') || nestedValue.startsWith('https://'))) {
            urls.push({ field: `${key}.${nestedKey}`, url: nestedValue });
          }
        });
      }
    });
    
    return urls;
  }
}

// ===== Database Service =====
class DatabaseService {
  /**
   * Read and parse the db.json file
   * @returns {Object} - The parsed JSON data
   */
  readDbJson() {
    try {
      const dbPath = path.join(__dirname, 'db.json');
      console.log(`Reading database from ${dbPath}`);
      
      if (!fs.existsSync(dbPath)) {
        console.error('db.json file not found');
        return null;
      }
      
      const data = fs.readFileSync(dbPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading db.json:', error.message);
      return null;
    }
  }

  /**
   * Get user data from database by email
   * @param {String} email - User email
   * @returns {Object} - User data
   */
  getUserData(email) {
    const dbData = this.readDbJson();
    if (!dbData) return null;
    
    console.log(`Looking for user data with email: ${email}`);
    return dbData[email] || null;
  }
}

// ===== Message Service =====
class MessageService {
  /**
   * Get a random element from an array or at a specific position
   * @param {Array} array - The array to get an element from
   * @param {Number} position - Optional position to get element from
   * @returns {*} - The selected element
   */
  getRandomElement(array, position) {
    if (!array || array.length === 0) {
      console.error('Empty or invalid array provided');
      return null;
    }
    
    const index = position === undefined
        ? Math.floor(Math.random() * array.length)
        : position % array.length;
    return array[index];
  }

  /**
   * Generate a message using templates, phrases, and images
   * @param {Object} userData - User data containing templates, phrases, and greetings
   * @param {Array} activeImages - Array of active image URLs
   * @returns {String} - The generated message
   */
  generateMessage(userData, activeImages) {
    if (!userData || !activeImages || activeImages.length === 0) {
      console.error('Invalid user data or images');
      return null;
    }
    
    const { templates, frases, saludos } = userData;
    
    let template = this.getRandomElement(templates);
    let frase = this.getRandomElement(frases);
    let saludo = this.getRandomElement(saludos);
    let foto = this.getRandomElement(activeImages);
    
    const message = template
        .replace('${saludo}', saludo)
        .replace('${frase}', frase)
        .replace('${foto}', foto);
    
    return message;
  }
}

// ===== Forum Service =====
class ForumService {
  constructor() {
    this.smbProxy = new SmbProxy();
  }

  /**
   * Login to the forum
   * @param {String} email - Forum email
   * @param {String} password - Forum password
   * @returns {Promise<Boolean>} - Login success
   */
  async login(email, password) {
    try {
      console.log('Logging in to forum');
      const hashedPassword = CryptoJS.MD5(password).toString();
      const result = await this.smbProxy.login(email, hashedPassword);
      return result.status === 200;
    } catch (error) {
      console.error('Error logging in to forum:', error.message);
      return false;
    }
  }

  /**
   * Get the responder form and its parameters
   * @param {String} url - URL of the responder form
   * @returns {Promise<Object>} - Form data, parameters and action URL
   */
  async getResponderForm(url) {
    console.log('Getting responder form from URL:', url);
    
    try {
      // Make GET request using SmbProxy
      const response = await this.smbProxy.customGET(url);
      console.log(`Response status: ${response.status}`);
      
      // Find the response form
      const formMatch = response.data.match(/<form[^>]*action="newreply\.php[^>]*>([\s\S]*?)<\/form>/i);
      
      if (!formMatch) {
        console.error('No form found in the response');
        return { params: {}, actionValue: null };
      }
      
      // Extract the form action URL
      const actionMatch = formMatch[0].match(/<form[^>]*action=["']([^"']*)["']/);
      
      let actionValue;
      if (actionMatch) {
        actionValue = 'https://www.sexomercadobcn.com/' + actionMatch[1].replace(/&amp;/g, '&');
        console.log('Form action URL:', actionValue);
      } else {
        console.error('No action URL found in the form');
      }
      
      const params = {};
      
      // Extract form parameters
      if (formMatch) {
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
      }
      
      return { params, actionValue };
    } catch (error) {
      console.error('Error getting responder form:', error.message);
      throw error;
    }
  }

  /**
   * Post a message to the forum
   * @param {String} message - Message to post
   * @param {String} replyUrl - Reply URL
   * @returns {Promise<Object>} - Post result
   */
  async postMessage(message, replyUrl) {
    console.log('Posting message to forum');
    
    try {
      // Get the responder form and its parameters
      const responder = await this.getResponderForm(replyUrl);
      
      if (!responder.actionValue) {
        console.error('No action URL found, cannot post message');
        return { success: false, message: 'No action URL found' };
      }
      
      // Extract the relative part of the action URL
      const actionUrl = responder.actionValue.replace('https://www.sexomercadobcn.com/', '');
      
      // Add the message to the form parameters
      const newParams = {
        message: message,
        ...responder.params,
        parseame: 1,
        parseame_check: 1,
        emailupdate: 1
      };
      
      console.log('Posting with parameters:', Object.keys(newParams).join(', '));
      
      // Submit the form using SmbProxy
      const result = await this.smbProxy.customPOST(actionUrl, newParams);
      
      console.log(`Post result status: ${result.status}`);
      
      return {
        success: result.status === 200,
        status: result.status,
        data: result.data
      };
    } catch (error) {
      console.error('Error posting message:', error.message);
      return {
        success: false,
        message: `Error posting: ${error.message}`
      };
    }
  }
}

// ===== Main Application =====
class Application {
  constructor(config) {
    this.config = config;
    this.apiService = new ApiService(config.apiUrl);
    this.tokenService = new TokenService();
    this.databaseService = new DatabaseService();
    this.messageService = new MessageService();
    this.forumService = new ForumService();
  }

  /**
   * Verifica si la hora actual está permitida para la ejecución
   * @returns {Boolean} - True si la hora actual está permitida, False en caso contrario
   */
  isAllowedTime() {
    // Si se ha configurado para forzar la ejecución, siempre retornar true
    if (this.config.forceExecution) {
      console.log('Ejecución forzada activada. Ignorando restricción de hora.');
      return true;
    }
    
    const now = new Date();
    const currentHour = now.getHours();
    
    console.log(`Hora actual: ${currentHour}:${now.getMinutes()}`);
    console.log(`Horas permitidas: ${this.config.allowedHours.join(', ')}`);
    
    return this.config.allowedHours.includes(currentHour);
  }

  /**
   * Run the application
   */
  async run() {
    try {
      const now = new Date();
      console.log(`=== Iniciando aplicación: ${now.toLocaleString()} ===`);
      
      // Verificar si la hora actual está permitida
      if (!this.isAllowedTime()) {
        console.log('No es hora de ejecutar la aplicación. Finalizando.');
        return;
      }
      
      console.log('Hora permitida. Continuando con la ejecución...');
      console.log('Starting authentication with SMB Gestion API');
      
      // Step 1: Login to API
      console.log('Step 1: Logging in to API');
      const apiLoginResult = await this.apiService.login(
        this.config.email, 
        this.config.password
      );
      
      if (!apiLoginResult.success) {
        console.error('Failed to login to API');
        return;
      }
      
      console.log('Successfully logged in to API');
      console.log('Token:', apiLoginResult.token.substring(0, 20) + '...');
      
      // Decode and display the JWT token
      console.log('\nDecoding JWT token:');
      const decodedToken = this.tokenService.decodeJwtToken(apiLoginResult.token);
      if (!decodedToken) {
        console.error('Failed to decode JWT token');
        return;
      }
      
      console.log('Decoded token payload:');
      console.log(JSON.stringify(decodedToken, null, 2));
      
      // Extract and display URLs from token
      console.log('\nURLs in token (if any):');
      const urls = this.tokenService.extractUrlsFromToken(decodedToken);
      
      if (urls.length > 0) {
        urls.forEach((item, index) => {
          console.log(`${index + 1}. ${item.field}: ${item.url}`);
        });
      } else {
        console.log('No URLs found in the token');
      }
      
      // Step 2: Get images from API
      console.log('\nStep 2: Getting images from API');
      const apiImagesResult = await this.apiService.getImages(apiLoginResult.token);
      
      if (!apiImagesResult.success) {
        console.error('Failed to get images from API');
        return;
      }
      
      console.log(`Retrieved ${apiImagesResult.images.length} images from API`);

      // Print active images
      const activeImages = apiImagesResult.images.filter(img => img.active);
      console.log(`\nActive images (${activeImages.length}):`);
      activeImages.forEach((img, index) => {
        console.log(`${index + 1}. ${img.url}`);
      });
      
      // Step 3: Get user data from database
      console.log('\nStep 3: Reading db.json and finding user data');
      const userData = this.databaseService.getUserData(this.config.email);
      
      if (!userData) {
        console.error(`No data found for email ${this.config.email} in db.json`);
        return;
      }
      
      console.log('\nFound user data in db.json:');
      console.log(JSON.stringify(userData, null, 2));
      
      // Step 4: Generate message
      console.log('\nStep 4: Generating message');
      const imageUrls = activeImages.map(img => img.url);
      
      console.log('\nGenerando mensaje aleatorio:');
      console.log('==============================\n');
      
      const message = this.messageService.generateMessage(userData, imageUrls);
      if (!message) {
        console.error('Failed to generate message');
        return;
      }
      
      console.log('Mensaje generado:');
      console.log(message);
      console.log('\n------------------------------\n');
      
      // Step 5: Post message to forum
      if (decodedToken && decodedToken.urls && decodedToken.urls.reply) {
        console.log('\nStep 5: Posting message to forum');
        const replyUrl = decodedToken.urls.reply;
        console.log(`Reply URL from token: ${replyUrl}`);
        
        try {
          await this.forumService.login(config.email, config.password);

          // Post message
          console.log('Posting message to forum...');
          const postResult = await this.forumService.postMessage(message, replyUrl);
          
          if (postResult.success) {
            console.log('Message posted successfully!');
          } else {
            console.error('Failed to post message:', postResult.message);
          }
          
        } catch (error) {
          console.error('Error posting to forum:', error.message);
        }
      } else {
        console.log('No reply URL found in token');
      }
      
      console.log('\nProcess completed successfully');
    } catch (error) {
      console.error('Error in application:', error.message);
    }
  }
}

// Initialize and run the application
const app = new Application(config);
app.run();
