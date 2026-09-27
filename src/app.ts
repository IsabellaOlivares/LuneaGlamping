import 'dotenv/config';
import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import itemRoutes from './routes/item.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import { globalLimiter, corsOptions } from './config/security.js';

const app: Express = express();

// Security layers — order matters
app.use(helmet());
app.use(globalLimiter);
app.options('/*splat', cors(corsOptions)); // preflight
app.use(cors(corsOptions));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// NOTA: express-mongo-sanitize v2 no es compatible con Express 5
// (intenta reasignar req.query, que en Express 5 es de solo lectura).
// Se reemplazó por una función de sanitización propia con el mismo objetivo:
// eliminar claves peligrosas como '$where' o 'a.b' que podrían usarse
// para inyección NoSQL.
function sanitizeObject(obj: any): void {
  if (obj && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  }
}

function customMongoSanitize(req: Request, _res: Response, next: NextFunction): void {
  if (req.body) sanitizeObject(req.body);
  if (req.params) sanitizeObject(req.params);
  next();
}

// Sanitize inputs AFTER parsing, BEFORE routes
app.use(customMongoSanitize);

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/items', itemRoutes);

// Error handling (always last)
app.use(notFound);
app.use(errorHandler);

export { app };