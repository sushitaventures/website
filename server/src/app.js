import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { requestLogger } from './middlewares/request.middleware.js';
import { notFoundHandler } from './middlewares/not-found.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import apiRoutes from './routes/api.routes.js';

const app = express();

// Security Headers
app.use(helmet());

// Cross-Origin Resource Sharing
const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g., Postman, curl, server-to-server)
    if (!origin) return callback(null, true);

    // CLIENT_ORIGIN may list several origins, comma-separated (e.g. https://domain.com,https://www.domain.com).
    // Local Vite origins are only allowed outside production.
    const allowedOrigins = [
      ...env.CLIENT_ORIGIN.split(',').map((o) => o.trim().replace(/\/$/, '')).filter(Boolean),
      ...(env.isProduction ? [] : ['http://localhost:5173', 'http://127.0.0.1:5173'])
    ];
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS.`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));

// Cookie Parsing
app.use(cookieParser());

// Request Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging & Correlation
app.use(requestLogger);

// Base route for root check
app.get('/', (req, res) => {
  res.json({
    service: 'luxury-real-estate-api',
    status: 'operational',
    documentation: '/api/v1/health'
  });
});

// Versioned API Routes (/api/v1)
app.use('/api/v1', apiRoutes);

// Catch 404 for any unmapped route
app.use(notFoundHandler);

// Centralized Error Handling
app.use(errorHandler);

export default app;
