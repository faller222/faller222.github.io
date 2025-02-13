const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const fastify = require('fastify')({
  logger: false,
  disableRequestLogging: true,
  connectionTimeout: 3000,
  keepAliveTimeout: 30000,
  maxRequestsPerSocket: 10000,
  trustProxy: true
});

const { MongoClient } = require('mongodb');
const crypto = require('crypto');
const NodeCache = require('node-cache');

// Cache optimizado para hashes
const cache = new NodeCache({
  stdTTL: 300,
  checkperiod: 320,
  maxKeys: 10000,
  useClones: false,
  deleteOnExpire: true
});

// Compression para respuestas
fastify.register(require('@fastify/compress'), {
  threshold: 1024,
  encodings: ['gzip', 'deflate']
});

let db;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  // Optimizaciones a nivel de proceso
  process.env.UV_THREADPOOL_SIZE = numCPUs;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });

  // Manejo de señales
  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, async () => {
      console.log(`${signal} received: closing HTTP server`);
      for (const id in cluster.workers) {
        cluster.workers[id].kill();
      }
      process.exit(0);
    });
  });
} else {
  // Conexión MongoDB optimizada
  const client = new MongoClient("mongodb://mongodb:27017", {
    maxPoolSize: 20,
    minPoolSize: 5,
    maxIdleTimeMS: 60000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000
  });

  // Ruta optimizada
  fastify.post('/save', {
    schema: {
      body: {
        type: 'object',
        required: ['text'],
        properties: {
          text: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'string'
        }
      }
    }
  }, async (request, reply) => {
    const { text } = request.body;
    
    // Intentar obtener del cache primero
    const cacheKey = `hash:${text}`;
    const cachedHash = cache.get(cacheKey);
    if (cachedHash) {
      return cachedHash;
    }

    // Generar hash
    const hash = crypto.createHash("sha256")
      .update(text)
      .digest("hex");

    try {
      // Operación en paralelo: guardar en DB y cache
      await Promise.all([
        db.collection("hashes").insertOne({ hash, createdAt: new Date() }),
        cache.set(cacheKey, hash)
      ]);
      
      return hash;
    } catch (err) {
      reply.code(500);
      return { error: 'Internal Server Error' };
    }
  });

  const start = async () => {
    try {
      await client.connect();
      db = client.db("test");
      
      // Crear índices
      await db.collection("hashes").createIndex({ hash: 1 }, { unique: true });
      await db.collection("hashes").createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 });

      await fastify.listen({ 
        port: 8080, 
        host: '0.0.0.0',
        backlog: 511
      });
      console.log(`Worker ${process.pid} started`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  start();
}

// Manejo de errores global
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  setTimeout(() => process.exit(1), 1000);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
