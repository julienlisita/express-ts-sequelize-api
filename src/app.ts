// src/app.ts

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupSwagger } from './config/swagger';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/ErrorHandler';

const app = express();

dotenv.config();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(errorHandler);

// Swagger
setupSwagger(app);

// Routes 
app.use('/api', userRoutes);

export default app;