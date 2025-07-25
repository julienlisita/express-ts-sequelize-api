// src/routes/authRoutes.ts

import express from 'express';
import {
  login,
  logout,
  signup,
  checkAuth,
  changePassword,
} from '../controllers/authController';
import { protect } from '../middlewares/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token
 *       400:
 *         description: Identifiants invalides
 */
router.post('/auth/login', login);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Création d’un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides ou email déjà utilisé
 */
router.post('/auth/signup', signup);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnexion utilisateur
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.post('/auth/logout', logout);

/**
 * @swagger
 * /api/auth/check:
 *   post:
 *     summary: Vérifie si l'utilisateur est authentifié
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Résultat de l'authentification (true/false)
 */
router.post('/auth/check', checkAuth);

/**
 * @swagger
 * /api/auth/change-password:
 *   patch:
 *     summary: Changer le mot de passe d’un utilisateur authentifié
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mot de passe mis à jour
 *       400:
 *         description: Ancien mot de passe incorrect ou invalide
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */
router.patch('/auth/change-password', protect, changePassword);

export default router;