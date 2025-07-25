// src/controllers/authController.ts 

/// <reference path="../types.d.ts" />
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import AppError from '../utils/AppError';
import { generateToken } from '../utils/generateToken';

const SECRET_KEY = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(new AppError('Nom d’utilisateur et mot de passe requis', 400));
    }

    const user = await User.scope('withPassword').findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError('Identifiants invalides', 400));
    }

    const token = generateToken(user);
    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    next(error);
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.access_token || '';
    if (!token) return res.status(200).json({ isLoggedIn: false });

    const decoded = jwt.verify(token, SECRET_KEY) as any;
    const user = await User.findByPk(decoded.userId);
    if (!user) return res.status(200).json({ isLoggedIn: false });

    return res.status(200).json({ message: 'Authentification réussie', isLoggedIn: true });
  } catch {
    return res.status(200).json({ isLoggedIn: false });
  }
};

export const logout = (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'Déconnexion réussie' });
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    if (!username || username.length < 3) {
      return next(new AppError("Le nom d'utilisateur doit contenir au moins 3 caractères.", 400));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return next(new AppError("Adresse email invalide.", 400));
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      return next(
        new AppError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.", 400)
      );
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return next(new AppError('Cet email est déjà utilisé.', 400));

    const newUser = await User.create({ username, email, password });
    const token = generateToken(newUser);
    res.status(201).json({ message: 'Utilisateur créé avec succès.', token });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return next(new AppError('Non authentifié', 401));
    const { oldPassword, newPassword } = req.body;
    const user = await User.scope('withPassword').findByPk(req.user.id);

    if (!user) return next(new AppError("Utilisateur non trouvé.", 404));
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return next(new AppError("Ancien mot de passe incorrect.", 400));

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    next(error);
  }
};
