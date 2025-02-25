/**
 * Servidor Express que actúa como proxy para la API de Dog CEO
 * https://dog.ceo/dog-api/
 */

const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Proxy para Dog CEO',
      version: '1.0.0',
      description: 'Servidor Express que actúa como proxy para la API de Dog CEO',
      contact: {
        name: 'API Support',
      },
      servers: [{
        url: `http://localhost:${PORT}`
      }]
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Valor fijo: "holaPerro"'
        }
      }
    },
    security: [{
      ApiKeyAuth: []
    }]
  },
  apis: ['./index.js'], // Archivos que contienen anotaciones
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para parsear JSON
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  // Manejar las solicitudes OPTIONS para CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Página principal
 *     description: Muestra información sobre los endpoints disponibles
 *     responses:
 *       200:
 *         description: HTML con información sobre la API
 *     security: []
 */
// Ruta principal - No requiere autenticación
app.get('/', (req, res) => {
  res.send(`
    <h1>API Proxy para Dog CEO</h1>
    <p>Endpoints disponibles (requieren autenticación con header Authorization: "holaPerro"):</p>
    <ul>
      <li><a href="/api/random">/api/random</a> - Obtener una imagen aleatoria de perro</li>
      <li><a href="/api/breeds">/api/breeds</a> - Listar todas las razas de perros</li>
      <li><a href="/api/breed/labrador">/api/breed/{raza}</a> - Obtener imágenes de una raza específica</li>
      <li><a href="/api/breed/labrador/3">/api/breed/{raza}/{cantidad}</a> - Obtener un número específico de imágenes de una raza</li>
    </ul>
    <p>Documentación de la API:</p>
    <ul>
      <li><a href="/api-docs">/api-docs</a> - Documentación Swagger</li>
    </ul>
    <p>Ejemplo de uso con curl:</p>
    <pre>curl -H "Authorization: holaPerro" http://localhost:${PORT}/api/random</pre>
  `);
});

// Middleware para validar la autenticación
const validateAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Verificar si el header de autorización existe y tiene el valor correcto
  if (!authHeader || authHeader !== 'holaPerro') {
    return res.status(401).json({ 
      error: 'No autorizado', 
      message: 'Se requiere el header Authorization con el valor "holaPerro"' 
    });
  }
  
  // Si la autenticación es correcta, continuar
  next();
};

// Aplicar el middleware de autenticación a todas las rutas /api
app.use('/api', validateAuth);

/**
 * @swagger
 * /api/random:
 *   get:
 *     summary: Obtener una imagen aleatoria de perro
 *     description: Retorna una URL de imagen aleatoria de un perro
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: URL de imagen aleatoria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: URL de la imagen
 *                   example: https://images.dog.ceo/breeds/labrador/n02099712_1200.jpg
 *                 status:
 *                   type: string
 *                   description: Estado de la respuesta
 *                   example: success
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No autorizado
 *                 message:
 *                   type: string
 *                   example: Se requiere el header Authorization con el valor "holaPerro"
 *       500:
 *         description: Error del servidor
 */
// Endpoint para obtener una imagen aleatoria de perro
app.get('/api/random', async (req, res) => {
  try {
    const data = await getRandomDogImage();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/breeds:
 *   get:
 *     summary: Listar todas las razas de perros
 *     description: Retorna un objeto con todas las razas y subrazas de perros
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de razas de perros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   description: Objeto con razas y subrazas
 *                   example: {"labrador":[],"poodle":["toy","miniature","standard"]}
 *                 status:
 *                   type: string
 *                   description: Estado de la respuesta
 *                   example: success
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
// Endpoint para listar todas las razas de perros
app.get('/api/breeds', async (req, res) => {
  try {
    const data = await getAllBreeds();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/breed/{breed}/{count}:
 *   get:
 *     summary: Obtener imágenes de una raza específica
 *     description: Retorna URLs de imágenes de una raza específica
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: breed
 *         required: true
 *         description: Nombre de la raza
 *         schema:
 *           type: string
 *           example: labrador
 *       - in: path
 *         name: count
 *         required: false
 *         description: Número de imágenes a obtener (por defecto 3)
 *         schema:
 *           type: integer
 *           default: 3
 *           example: 5
 *     responses:
 *       200:
 *         description: URLs de imágenes de la raza especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array de URLs de imágenes
 *                   example: ["https://images.dog.ceo/breeds/labrador/n02099712_1200.jpg", "https://images.dog.ceo/breeds/labrador/n02099712_1234.jpg"]
 *                 status:
 *                   type: string
 *                   description: Estado de la respuesta
 *                   example: success
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
// Endpoint para obtener imágenes de una raza específica
app.get('/api/breed/:breed/:count?', async (req, res) => {
  try {
    const breed = req.params.breed;
    const count = req.params.count || 3; // Por defecto 3 imágenes
    const data = await getBreedImages(breed, count);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Función asincrónica para obtener una imagen aleatoria de perro
async function getRandomDogImage() {
  try {
    console.log('Obteniendo una imagen aleatoria de perro...');
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`URL de la imagen: ${data.message}`);
    return data;
  } catch (error) {
    console.error('Error al obtener la imagen:', error.message);
    throw error;
  }
}

// Función para listar todas las razas de perros
async function getAllBreeds() {
  try {
    console.log('Obteniendo lista de todas las razas de perros...');
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Obtenidas todas las razas de perros');
    return data;
  } catch (error) {
    console.error('Error al obtener las razas:', error.message);
    throw error;
  }
}

// Función para obtener imágenes de una raza específica
async function getBreedImages(breed, count = 3) {
  try {
    console.log(`Obteniendo ${count} imágenes de la raza ${breed}...`);
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/${count}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Obtenidas ${data.message.length} imágenes de ${breed}`);
    return data;
  } catch (error) {
    console.error(`Error al obtener imágenes de ${breed}:`, error.message);
    throw error;
  }
}

// Exportar la aplicación para pruebas
module.exports = app;

// Iniciar el servidor solo si este archivo se ejecuta directamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor proxy para Dog CEO API corriendo en http://localhost:${PORT}`);
    console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
  });
} 