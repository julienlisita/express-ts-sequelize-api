// src/middlewares/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import AppError from '../utils/AppError';

interface JwtPayload {
  userId: number;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError('Non authentifié', 401));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await User.findByPk(decoded.userId);
    if (!user) return next(new AppError('Utilisateur non trouvé', 404));

    req.user = user;
    next();
  } catch {
    return next(new AppError('Jeton invalide', 401));
  }
};

export const restrictTo = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user?.role || '')) {
      return next(new AppError('Accès interdit', 403));
    }
    next();
  };
};

export const restrictToOwnUser = (model: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const resource = await model.findByPk(req.params.id);
    if (!resource) return next(new AppError('Ressource non trouvée', 404));
    if (!req.user || req.user.id !== resource.UserId) {
      return next(new AppError('Non autorisé', 403));
    }
    next();
  };
};