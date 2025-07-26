// src/controllers/userController.ts

import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';
import AppError from '../utils/AppError';

export const getPublicUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'role', 'createdAt'],
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getPublicUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'role', 'createdAt'],
    });
    if (!user) return next(new AppError('Utilisateur non trouvé', 404));
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return next(new AppError('Utilisateur non trouvé', 404));
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next(new AppError('Champs requis manquants', 400));
    }

    const newUser = await User.create({ username, email, password });
    
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return next(new AppError('Utilisateur non trouvé', 404));

    await user.destroy();
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};