// src/middlewares/notFound.ts

import { Request, Response, NextFunction } from 'express';

export function notFound(req: Request, res: Response, next: NextFunction): void {
  res.status(404).json({
    status: 'fail',
    message: `Route non trouvée : ${req.originalUrl}`,
  });
}