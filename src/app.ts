// src/app.ts

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import { apiLimiter } from './middlewares/rateLimiter';
import { setupSwagger } from './config/swagger';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes'
import adminUserRoutes from './routes/adminUserRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

const app = express();

dotenv.config();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use('/api', apiLimiter); 

// Swagger
setupSwagger(app);

// Routes 
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', adminUserRoutes);

// NotFound handler (pour les routes non définies)
app.use(notFound);

// Middleware de gestion des erreurs
app.use(errorHandler);

export default app;