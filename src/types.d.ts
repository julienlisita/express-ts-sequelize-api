// src/types.d.ts
import { User } from './models/userModel';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {}; 