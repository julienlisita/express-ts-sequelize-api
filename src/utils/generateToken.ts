// src/utils/generateToken.ts

import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

import config from '../config/config';

export function generateToken(user: User): string {
  return jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: '7d',
  });
}