// src/app.ts

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupSwagger } from './config/swagger';

const app = express();

dotenv.config();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Swagger
setupSwagger(app);

// Routes (à compléter plus tard)
// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

export default app;