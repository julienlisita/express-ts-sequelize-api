// src/config/config.ts

import dotenv from 'dotenv';
dotenv.config();

interface DBConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  logging: boolean;
}

interface AppConfig {
  env: string;
  port: number;
  seed: boolean;
  baseUrl: string;
  db: DBConfig;
  dialect: 'postgres';
}

const config: AppConfig = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  seed: process.env.SEED === 'true',
  baseUrl: process.env.API_URL || `http://localhost:${process.env.PORT || 3000}`,

  dialect: 'postgres',

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    logging: false,
  },
};

export default config;