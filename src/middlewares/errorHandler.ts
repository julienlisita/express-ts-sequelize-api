// src/middlewares/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { ValidationError, UniqueConstraintError } from 'sequelize';
import AppError from '../utils/AppError';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Sequelize : Contrainte d’unicité
  if (err instanceof UniqueConstraintError) {
    const fieldsInConflict = err.errors.map((e) => e.path ?? 'unknown');
    const messages: string[] = [];

    if (fieldsInConflict.includes('username')) {
      messages.push('Le nom d’utilisateur existe déjà. Veuillez en choisir un autre.');
    }
    if (fieldsInConflict.includes('email')) {
      messages.push('L’adresse email est déjà utilisée. Veuillez en choisir une autre.');
    }

    if (messages.length === 0) {
      messages.push('Un ou plusieurs champs uniques existent déjà. Veuillez vérifier vos données.');
    }

    res.status(400).json({
      status: 'fail',
      message: 'Conflit de données',
      errors: messages,
    });
    return;
  }

  // Sequelize : Erreurs de validation
  if (err instanceof ValidationError) {
    res.status(400).json({
      status: 'fail',
      message: 'Erreur de validation',
      errors: err.errors.map((e) => e.message),
    });
    return;
  }

  // Erreurs personnalisées (AppError)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    return;
  }

  // Erreurs inconnues
  console.error('Erreur inattendue :', err);
  res.status(500).json({
    status: 'error',
    message: 'Une erreur est survenue, merci de réessayer plus tard',
  });
}