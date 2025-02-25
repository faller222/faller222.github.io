const request = require('supertest');
const app = require('../index');

// Mock de las funciones fetch para no hacer llamadas reales a la API
jest.mock('node:fetch', () => jest.fn());

describe('Pruebas del servidor Dog CEO API Proxy', () => {
  
  // Prueba de la ruta principal
  describe('GET /', () => {
    it('debería devolver 200 y HTML', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('API Proxy para Dog CEO');
      expect(response.text).toContain('Documentación Swagger');
    });
  });

  // Pruebas de autenticación
  describe('Autenticación', () => {
    it('debería rechazar solicitudes sin header de autorización', async () => {
      const response = await request(app).get('/api/random');
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        error: 'No autorizado',
        message: 'Se requiere el header Authorization con el valor "holaPerro"'
      });
    });

    it('debería rechazar solicitudes con header de autorización incorrecto', async () => {
      const response = await request(app)
        .get('/api/random')
        .set('Authorization', 'tokenIncorrecto');
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        error: 'No autorizado',
        message: 'Se requiere el header Authorization con el valor "holaPerro"'
      });
    });
  });

  // Pruebas de endpoints con mocks
  describe('Endpoints de la API', () => {
    beforeEach(() => {
      // Limpiar todos los mocks antes de cada prueba
      jest.clearAllMocks();
    });

    it('GET /api/random debería devolver una imagen aleatoria', async () => {
      // Mock de la respuesta de fetch
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            message: 'https://images.dog.ceo/breeds/labrador/n02099712_1234.jpg',
            status: 'success'
          })
        })
      );

      const response = await request(app)
        .get('/api/random')
        .set('Authorization', 'holaPerro');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'https://images.dog.ceo/breeds/labrador/n02099712_1234.jpg',
        status: 'success'
      });
      expect(global.fetch).toHaveBeenCalledWith('https://dog.ceo/api/breeds/image/random');
    });

    it('GET /api/breeds debería devolver la lista de razas', async () => {
      // Mock de la respuesta de fetch
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            message: {
              labrador: [],
              poodle: ['toy', 'miniature', 'standard']
            },
            status: 'success'
          })
        })
      );

      const response = await request(app)
        .get('/api/breeds')
        .set('Authorization', 'holaPerro');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: {
          labrador: [],
          poodle: ['toy', 'miniature', 'standard']
        },
        status: 'success'
      });
      expect(global.fetch).toHaveBeenCalledWith('https://dog.ceo/api/breeds/list/all');
    });

    it('GET /api/breed/:breed/:count debería devolver imágenes de una raza específica', async () => {
      // Mock de la respuesta de fetch
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            message: [
              'https://images.dog.ceo/breeds/labrador/n02099712_1234.jpg',
              'https://images.dog.ceo/breeds/labrador/n02099712_5678.jpg'
            ],
            status: 'success'
          })
        })
      );

      const response = await request(app)
        .get('/api/breed/labrador/2')
        .set('Authorization', 'holaPerro');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: [
          'https://images.dog.ceo/breeds/labrador/n02099712_1234.jpg',
          'https://images.dog.ceo/breeds/labrador/n02099712_5678.jpg'
        ],
        status: 'success'
      });
      expect(global.fetch).toHaveBeenCalledWith('https://dog.ceo/api/breed/labrador/images/random/2');
    });

    it('debería manejar errores de la API', async () => {
      // Mock de error en fetch
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404
        })
      );

      const response = await request(app)
        .get('/api/random')
        .set('Authorization', 'holaPerro');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Error HTTP: 404');
    });

    it('debería manejar excepciones durante la llamada a la API', async () => {
      // Mock de excepción en fetch
      global.fetch = jest.fn(() =>
        Promise.reject(new Error('Error de red'))
      );

      const response = await request(app)
        .get('/api/random')
        .set('Authorization', 'holaPerro');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Error de red');
    });
  });
}); 