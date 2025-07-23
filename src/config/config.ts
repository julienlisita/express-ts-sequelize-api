// src/config/config.ts

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  seed: process.env.SEED === 'true',
  baseUrl: process.env.API_URL || `http://localhost:${process.env.PORT || 3000}`,

  db: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    logging: false,
  },
};

export default config;