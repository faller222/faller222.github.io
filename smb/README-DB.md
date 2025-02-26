# Base de Datos SMB

Este documento describe la estructura de la base de datos y cómo trabajar con ella utilizando los DAOs (Data Access Objects) en lugar de un ORM.

## Estructura de la Base de Datos

La base de datos consta de tres tablas principales:

### 1. Users
Almacena la información de los usuarios registrados.
- `id`: Identificador único del usuario (SERIAL PRIMARY KEY)
- `email`: Correo electrónico del usuario (VARCHAR(255) UNIQUE NOT NULL)
- `hash`: Hash MD5 de la contraseña del usuario (VARCHAR(255) NOT NULL)

### 2. Logins
Registra los inicios de sesión de los usuarios.
- `id`: Identificador único del registro de inicio de sesión (SERIAL PRIMARY KEY)
- `user_id`: Referencia al usuario que inició sesión (INTEGER REFERENCES users(id))
- `timestamp`: Fecha y hora del inicio de sesión (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

### 3. Images
Almacena las imágenes asociadas a los usuarios.
- `id`: Identificador único de la imagen (SERIAL PRIMARY KEY)
- `user_id`: Referencia al usuario propietario de la imagen (INTEGER REFERENCES users(id))
- `url`: URL de la imagen (TEXT NOT NULL)
- `is_active_post`: Indica si la imagen está activa como publicación (BOOLEAN DEFAULT false)

## Inicialización de la Base de Datos

Hay dos formas de inicializar la base de datos:

### 1. Usando el script de inicialización

```bash
npm run init-db
```

Este comando ejecutará el script `scripts/init-db.js` que lee el archivo `DDL.sql` y ejecuta las consultas SQL para crear las tablas.

### 2. Automáticamente al iniciar el servidor

Al iniciar el servidor con `npm start` o `npm run dev`, se ejecutará automáticamente la función `initializeTables()` del módulo `config/database.js`, que intentará leer el archivo `DDL.sql` y ejecutarlo. Si el archivo no existe, utilizará un método alternativo para crear las tablas.

## Trabajando con los DAOs

En lugar de utilizar un ORM como Sequelize, este proyecto utiliza DAOs (Data Access Objects) para interactuar con la base de datos. Los DAOs encapsulan las consultas SQL y proporcionan una interfaz limpia para las operaciones CRUD.

### UserDAO

```javascript
const { UserDAO } = require('./daos');

// Crear un nuevo usuario
const newUser = await UserDAO.createUser('user@example.com', 'password123');

// Buscar un usuario por email
const user = await UserDAO.findUserByEmail('user@example.com');

// Buscar un usuario por ID
const user = await UserDAO.findUserById(1);

// Validar credenciales de usuario
const validUser = await UserDAO.validateUser('user@example.com', 'password123');
```

### LoginDAO

```javascript
const { LoginDAO } = require('./daos');

// Registrar un nuevo inicio de sesión
const login = await LoginDAO.recordLogin(userId);

// Obtener historial de inicios de sesión
const loginHistory = await LoginDAO.getLoginHistory(userId, 10); // Limitar a 10 registros

// Obtener el último inicio de sesión
const lastLogin = await LoginDAO.getLastLogin(userId);
```

### ImageDAO

```javascript
const { ImageDAO } = require('./daos');

// Crear una nueva imagen
const newImage = await ImageDAO.createImage(userId, 'https://example.com/image.jpg', false);

// Obtener todas las imágenes de un usuario
const images = await ImageDAO.getUserImages(userId);

// Obtener imágenes activas de un usuario
const activeImages = await ImageDAO.getActiveImages(userId);

// Actualizar el estado de una imagen
const updatedImage = await ImageDAO.updateImageStatus(imageId, true);

// Eliminar una imagen
const deleted = await ImageDAO.deleteImage(imageId);
```

## Ventajas de usar DAOs en lugar de un ORM

1. **Control total sobre las consultas SQL**: Puedes optimizar cada consulta según tus necesidades.
2. **Menor sobrecarga**: No hay capa de abstracción adicional, lo que puede mejorar el rendimiento.
3. **Simplicidad**: El código es más directo y fácil de entender.
4. **Flexibilidad**: Puedes adaptar fácilmente las consultas a requisitos específicos.

## Consideraciones de Seguridad

- Todas las consultas utilizan parámetros preparados para prevenir ataques de inyección SQL.
- Las contraseñas se almacenan como hashes MD5 (aunque en un entorno de producción se recomendaría usar algoritmos más seguros como bcrypt).
- Las conexiones a la base de datos se liberan adecuadamente después de cada operación. 