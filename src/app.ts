// src/app.ts

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupSwagger } from './config/swagger';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

const app = express();

dotenv.config();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Swagger
setupSwagger(app);

// Routes 
app.use('/api', userRoutes);

// NotFound handler (pour les routes non définies)
app.use(notFound);

// Middleware de gestion des erreurs
app.use(errorHandler);

export default app;