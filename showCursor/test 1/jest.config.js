module.exports = {
  // La raíz del proyecto donde Jest debería buscar archivos
  rootDir: '.',
  
  // El entorno de prueba a usar
  testEnvironment: 'node',
  
  // Patrón para encontrar archivos de prueba
  testMatch: ['**/__tests__/**/*.test.js'],
  
  // Directorios que Jest debería ignorar
  testPathIgnorePatterns: ['/node_modules/'],
  
  // Indica si Jest debería mostrar un informe de cobertura
  collectCoverage: false,
  
  // Directorio donde Jest debería guardar los informes de cobertura
  coverageDirectory: 'coverage',
  
  // Archivos que deberían ser ignorados para la cobertura
  coveragePathIgnorePatterns: ['/node_modules/'],
  
  // Umbral de cobertura
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  
  // Indica si Jest debería mostrar mensajes de diagnóstico
  verbose: true
}; 