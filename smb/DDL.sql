-- DDL.sql - Script para crear las tablas del proyecto SMB

-- Eliminar tablas si existen (en orden inverso para respetar las dependencias)
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS logins;
DROP TABLE IF EXISTS users;

-- Crear tabla Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  hash VARCHAR(255) NOT NULL
);

-- Crear tabla Logins
CREATE TABLE logins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Images
CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_active_post BOOLEAN DEFAULT false
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_logins_user_id ON logins(user_id);
CREATE INDEX idx_images_user_id ON images(user_id);
CREATE INDEX idx_images_active ON images(is_active_post);

-- Comentarios de las tablas
COMMENT ON TABLE users IS 'Almacena la información de los usuarios registrados';
COMMENT ON TABLE logins IS 'Registra los inicios de sesión de los usuarios';
COMMENT ON TABLE images IS 'Almacena las imágenes asociadas a los usuarios';

-- Comentarios de las columnas
COMMENT ON COLUMN users.id IS 'Identificador único del usuario';
COMMENT ON COLUMN users.email IS 'Correo electrónico del usuario (único)';
COMMENT ON COLUMN users.hash IS 'Hash MD5 de la contraseña del usuario';

COMMENT ON COLUMN logins.id IS 'Identificador único del registro de inicio de sesión';
COMMENT ON COLUMN logins.user_id IS 'Referencia al usuario que inició sesión';
COMMENT ON COLUMN logins.timestamp IS 'Fecha y hora del inicio de sesión';

COMMENT ON COLUMN images.id IS 'Identificador único de la imagen';
COMMENT ON COLUMN images.user_id IS 'Referencia al usuario propietario de la imagen';
COMMENT ON COLUMN images.url IS 'URL de la imagen';
COMMENT ON COLUMN images.is_active_post IS 'Indica si la imagen está activa como publicación'; 