// src/routes/adminUserRoutes.ts

import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  adminChangePassword,
} from '../controllers/userController';
import { protect, restrictTo } from '../middlewares/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin - Users
 *   description: Gestion des utilisateurs (admin seulement)
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Retourne tous les utilisateurs
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/admin/users', protect, restrictTo('admin'), getAllUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Retourne un utilisateur par son ID
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/admin/users/:id', protect, restrictTo('admin'), getUserById);

/**
 * @swagger
 * /api/admin/users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
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
 *         description: Utilisateur créé
 *       400:
 *         description: Données invalides
 */
router.post('/admin/users', protect, restrictTo('admin'), createUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/admin/users/:id', protect, restrictTo('admin'), deleteUserById);


/**
 * @swagger
 * /api/admin/users/{id}/change-password:
 *   patch:
 *     summary: Change le mot de passe d’un utilisateur (admin)
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [newPassword]
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mot de passe mis à jour avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Utilisateur non trouvé
 */
router.patch('/admin/users/:id/change-password', protect, restrictTo('admin'), adminChangePassword);

export default router;