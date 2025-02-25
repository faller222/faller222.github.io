# Servidor Proxy para la API de Dog CEO

Este es un servidor Express que actúa como proxy para la [API de Dog CEO](https://dog.ceo/dog-api/) y expone endpoints RESTful para consumir la información.

## Requisitos

- Node.js v22 o superior
- Express

## Instalación

```bash
npm install
```

## Cómo ejecutar

```bash
npm start
```

El servidor se iniciará en http://localhost:3000

## Pruebas

El proyecto incluye pruebas unitarias utilizando Jest y supertest. Para ejecutar las pruebas:

```bash
npm test
```

Para ejecutar las pruebas en modo watch (útil durante el desarrollo):

```bash
npm run test:watch
```

Para generar un informe de cobertura:

```bash
npm run test:coverage
```

### Estructura de las pruebas

Las pruebas están organizadas en los siguientes grupos:

- **Pruebas de la ruta principal**: Verifica que la página principal se cargue correctamente.
- **Pruebas de autenticación**: Verifica que los endpoints protegidos requieran el header de autorización correcto.
- **Pruebas de endpoints**: Verifica que cada endpoint devuelva los datos esperados.
- **Pruebas de manejo de errores**: Verifica que la API maneje correctamente los errores.

## Documentación de la API

La API está documentada usando Swagger (OpenAPI). Puedes acceder a la documentación interactiva en:

```
http://localhost:3000/api-docs
```

Esta interfaz te permite:
- Ver todos los endpoints disponibles
- Probar los endpoints directamente desde el navegador
- Ver los modelos de datos y respuestas
- Autenticarte usando el header Authorization

## Autenticación

Todos los endpoints de la API requieren autenticación mediante el header `Authorization` con el valor `holaPerro`.

Ejemplo:
```
Authorization: holaPerro
```

## Endpoints disponibles

- **GET /** - Página principal con información sobre los endpoints disponibles (no requiere autenticación)
- **GET /api-docs** - Documentación Swagger de la API (no requiere autenticación)
- **GET /api/random** - Obtener una imagen aleatoria de perro
- **GET /api/breeds** - Listar todas las razas de perros disponibles
- **GET /api/breed/:breed** - Obtener 3 imágenes de una raza específica
- **GET /api/breed/:breed/:count** - Obtener un número específico de imágenes de una raza

## Ejemplos de uso

### Obtener una imagen aleatoria
```bash
curl -H "Authorization: holaPerro" http://localhost:3000/api/random
```

### Listar todas las razas
```bash
curl -H "Authorization: holaPerro" http://localhost:3000/api/breeds
```

### Obtener imágenes de una raza específica
```bash
curl -H "Authorization: holaPerro" http://localhost:3000/api/breed/labrador
```

### Obtener un número específico de imágenes de una raza
```bash
curl -H "Authorization: holaPerro" http://localhost:3000/api/breed/labrador/5
```

## Respuestas de error

### Error de autenticación (401 Unauthorized)
```json
{
  "error": "No autorizado",
  "message": "Se requiere el header Authorization con el valor \"holaPerro\""
}
```

## Estructura del código

- Servidor Express con rutas para cada endpoint
- Middleware de autenticación para validar el header Authorization
- Documentación Swagger integrada
- Funciones auxiliares para consumir la API de Dog CEO
- Manejo de errores y respuestas JSON
- Pruebas unitarias con Jest y supertest

## Dependencias

- express: Framework web para Node.js
- swagger-ui-express: Middleware para servir la documentación Swagger
- swagger-jsdoc: Genera la especificación Swagger a partir de comentarios JSDoc

## Dependencias de desarrollo

- jest: Framework de pruebas
- supertest: Biblioteca para probar servidores HTTP

## API utilizada

Este proyecto utiliza la API pública de Dog CEO, que es gratuita y no requiere autenticación:
- Documentación: https://dog.ceo/dog-api/
- Endpoint de imagen aleatoria: https://dog.ceo/api/breeds/image/random
- Endpoint de lista de razas: https://dog.ceo/api/breeds/list/all
- Endpoint de imágenes por raza: https://dog.ceo/api/breed/{raza}/images/random/{cantidad} 