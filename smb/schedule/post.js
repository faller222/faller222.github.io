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
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import SmbService class
const SmbService = require('../utils/smbService');

// Configuration
const config = {
  email: process.env.SMB_EMAIL || 'user@example.com',
  password: process.env.SMB_PASSWORD || 'yourpassword',
  apiUrl: 'https://smb-gestion-117c7c904c44.herokuapp.com',
  // Horas permitidas para la ejecución (formato 24h)
  // Si se proporciona en .env, debe ser una lista separada por comas, ej: "13,16,19"
  allowedHours: process.env.ALLOWED_HOURS ? process.env.ALLOWED_HOURS.split(',').map(h => parseInt(h.trim())) : [7, 10, 13, 16, 19],
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
    this.smbService = new SmbService();
    this.isAuthenticated = false;
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
      const result = await this.smbService.login(email, password);
      this.isAuthenticated = result.isAuthenticated;
      console.log(`Login result: ${this.isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);
      return result.status === 200 && this.isAuthenticated;
    } catch (error) {
      console.error('Error logging in to forum:', error.message);
      this.isAuthenticated = false;
      return false;
    }
  }

  /**
   * Check if user is currently authenticated
   * @returns {Boolean} - True if authenticated, false otherwise
   */
  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  /**
   * Get user data including reply URL
   * @returns {Promise<Object>} - User data
   */
  async getUserData() {
    try {
      console.log('Getting user data from forum');
      return await this.smbService.getUserData();
    } catch (error) {
      console.error('Error getting user data from forum:', error.message);
      return {
        success: false,
        message: `Error getting user data: ${error.message}`
      };
    }
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
      // Check authentication first
      if (!this.isAuthenticated) {
        console.error('Not authenticated. Cannot publish message.');
        return { success: false, message: 'Not authenticated' };
      }
      
      const result = await this.smbService.publishMessage(message, replyUrl);
      
      // Update authentication status based on the response
      if (result && result.isAuthenticated !== undefined) {
        this.isAuthenticated = result.isAuthenticated;
      }
      
      return result;
    } catch (error) {
      console.error('Error publishing message:', error.message);
      return {
        success: false,
        message: `Error publishing: ${error.message}`
      };
    }
  }
}

// ===== Main Application =====
class Application {
  constructor(config) {
    this.config = config;
    this.apiService = new ApiService(config.apiUrl);
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
      
      // Step 5: Login to forum and get user data
      console.log('\nStep 5: Logging in to forum and getting user data');
      const loginSuccess = await this.forumService.login(config.email, config.password);
      
      if (!loginSuccess) {
        console.error('Failed to login to forum. Cannot post message.');
        return;
      }
      
      console.log('Forum login successful. Authentication status:', this.forumService.isUserAuthenticated());
      
      // Get user data including reply URL
      const forumUserData = await this.forumService.getUserData();
      
      if (!forumUserData.success) {
        console.error('Failed to get user data from forum:', forumUserData.message);
        return;
      }
      
      const replyUrl = forumUserData.urls.replyUrl;
      
      if (!replyUrl) {
        console.error('No reply URL found in user data');
        return;
      }
      
      console.log(`Reply URL from forum: ${replyUrl}`);
      
      // Step 6: Post message to forum
      console.log('\nStep 6: Posting message to forum');
      
      const postResult = await this.forumService.publishMessage(message, replyUrl);
      
      if (postResult.success) {
        console.log('Message posted successfully!');
      } else {
        console.error('Failed to post message:', postResult.message);
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
