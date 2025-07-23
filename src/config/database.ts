// src/config/database.ts
import { Sequelize } from 'sequelize';

const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD || '', {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false, // active si tu veux voir les requêtes SQL
});