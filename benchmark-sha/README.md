# Comparación de Rendimiento: Express vs Rust vs Quarkus

Este proyecto tiene como objetivo comparar el rendimiento de diferentes frameworks y lenguajes de programación para el desarrollo de APIs REST, específicamente:

- Node.js con Express
- Rust 
- Quarkus (Java)

## 🎯 Objetivo

El propósito es analizar y comparar:
- Tiempo de respuesta
- Throughput (solicitudes por segundo)
- Uso de recursos (CPU, memoria)
- Comportamiento bajo carga

## 🛠 Tecnologías

- **Docker**: Para garantizar un entorno consistente y aislado
- **k6**: Herramienta de pruebas de carga para medir el rendimiento
- Implementaciones en:
  - Express.js (Node.js)
  - Rust
  - Quarkus (Java)

## 📊 Pruebas de Carga

Las pruebas se realizan utilizando k6, una moderna herramienta de pruebas de carga. Los escenarios de prueba incluyen:
- Pruebas de carga básica
- Pruebas de estrés
- Pruebas de resistencia

## 🚀 Cómo Ejecutar

1. **Preparar el entorno**
   ```bash
   docker-compose up -d
   ```

2. **Ejecutar las pruebas**
   ```bash
   k6 run k6/load-test.js
   ```

## 📈 Resultados

Los resultados de las pruebas se documentarán incluyendo:
- Gráficos comparativos
- Métricas clave
- Análisis detallado del rendimiento

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request
