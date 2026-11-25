import http from 'node:http';
import app from './app.js';
import { env, validateEnv } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { verifyMailTransport } from './services/mail.service.js';

let server;

const startServer = async () => {
  try {
    // 1. Validate environment requirements
    validateEnv();

    // 2. Initialize database connection
    await connectDatabase();

    // 3. Start HTTP server
    server = http.createServer(app);

    server.listen(env.PORT, () => {
      console.log(`[Server] Luxury Real Estate Backend running on http://localhost:${env.PORT} in ${env.NODE_ENV} mode`);
      console.log(`[Server] Health Endpoint: http://localhost:${env.PORT}/api/v1/health`);
      console.log(`[Server] Readiness Endpoint: http://localhost:${env.PORT}/api/v1/health/ready`);
      verifyMailTransport(); // logs SMTP readiness; never blocks startup
    });

    // 4. Setup graceful shutdown triggers
    const gracefulShutdown = async (signal) => {
      console.log(`\n[Server] Received ${signal}. Commencing graceful shutdown...`);

      if (server) {
        server.close(async () => {
          console.log('[Server] HTTP server closed.');
          await disconnectDatabase();
          console.log('[Server] Process exiting cleanly.');
          process.exit(0);
        });

        // Force shutdown if taking too long
        setTimeout(() => {
          console.error('[Server] Graceful shutdown timed out. Forcing termination.');
          process.exit(1);
        }, 10000).unref();
      } else {
        process.exit(0);
      }
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('[Server] Critical startup failure:', error.message);
    process.exit(1);
  }
};

startServer();
