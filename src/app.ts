import express,{type Express} from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import itemRouter from './routes/item.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app: Express = express();

app.use(express.json());
app.use(cookieParser());

// Rutas de autenticación
app.use('/api/v1/auth', authRouter);

// Rutas de planes de Lunea Glamping
app.use('/api/v1/items', itemRouter);

// Middlewares de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);