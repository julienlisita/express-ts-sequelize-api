import express from 'express';
import {
  getPublicUsers,
  getPublicUserById,
} from '../controllers/userController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PublicUsers
 *   description: Accès public aux utilisateurs
 */

/**
 * @swagger
 * /api/public/users:
 *   get:
 *     summary: Liste des utilisateurs (accès public)
 *     tags: [PublicUsers]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/public/users', getPublicUsers);

/**
 * @swagger
 * /api/public/users/{id}:
 *   get:
 *     summary: Détails d’un utilisateur par ID (accès public)
 *     tags: [PublicUsers]
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
router.get('/public/users/:id', getPublicUserById);

export default router;