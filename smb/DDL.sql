-- DDL.sql - Script para crear las tablas del proyecto SMB

-- Crear esquema SMB si no existe
CREATE SCHEMA IF NOT EXISTS smb;

-- Eliminar tablas si existen (en orden inverso para respetar las dependencias)
DROP TABLE IF EXISTS smb.images;
DROP TABLE IF EXISTS smb.logins;
DROP TABLE IF EXISTS smb.users;

-- Crear tabla Users
CREATE TABLE smb.users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  hash VARCHAR(255) NOT NULL
);

-- Crear tabla Logins
CREATE TABLE smb.logins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES smb.users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip VARCHAR(45),
  device VARCHAR(50),
  os VARCHAR(100),
  browser VARCHAR(100)
);

-- Crear tabla Images
CREATE TABLE smb.images (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES smb.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_active_post BOOLEAN DEFAULT false
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_logins_user_id ON smb.logins(user_id);
CREATE INDEX idx_images_user_id ON smb.images(user_id);
CREATE INDEX idx_images_active ON smb.images(is_active_post);

-- Comentarios de las tablas
COMMENT ON TABLE smb.users IS 'Almacena la información de los usuarios registrados';
COMMENT ON TABLE smb.logins IS 'Registra los inicios de sesión de los usuarios';
COMMENT ON TABLE smb.images IS 'Almacena las imágenes asociadas a los usuarios';

-- Comentarios de las columnas
COMMENT ON COLUMN smb.users.id IS 'Identificador único del usuario';
COMMENT ON COLUMN smb.users.email IS 'Correo electrónico del usuario (único)';
COMMENT ON COLUMN smb.users.hash IS 'Hash MD5 de la contraseña del usuario';

COMMENT ON COLUMN smb.logins.id IS 'Identificador único del registro de inicio de sesión';
COMMENT ON COLUMN smb.logins.user_id IS 'Referencia al usuario que inició sesión';
COMMENT ON COLUMN smb.logins.timestamp IS 'Fecha y hora del inicio de sesión';
COMMENT ON COLUMN smb.logins.ip IS 'Dirección IP desde donde se realizó el inicio de sesión';
COMMENT ON COLUMN smb.logins.device IS 'Tipo de dispositivo (Mobile/Desktop)';
COMMENT ON COLUMN smb.logins.os IS 'Sistema operativo y versión';
COMMENT ON COLUMN smb.logins.browser IS 'Navegador y versión';

COMMENT ON COLUMN smb.images.id IS 'Identificador único de la imagen';
COMMENT ON COLUMN smb.images.user_id IS 'Referencia al usuario propietario de la imagen';
COMMENT ON COLUMN smb.images.url IS 'URL de la imagen';
COMMENT ON COLUMN smb.images.is_active_post IS 'Indica si la imagen está activa como publicación'; 