# Usa una imagen oficial de Rust para construir el binario
FROM rust:1.74 AS builder

WORKDIR /app

# Copiar los archivos de Cargo y descargar dependencias
COPY Cargo.toml ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release && rm -rf src target/release/deps/rust_api*

# Copiar el código fuente
COPY . .

# Compilar la aplicación en modo release
RUN cargo build --release

# Crear una imagen mínima para ejecutar el binario
FROM debian:bookworm-slim

WORKDIR /app

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Copiar el binario desde la imagen anterior
COPY --from=builder /app/target/release/rust-api .

# Exponer el puerto del servidor
EXPOSE 8080

# Ejecutar la aplicación
CMD ["./rust-api"]