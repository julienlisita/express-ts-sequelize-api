// src/models/userModel.ts

import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';

export class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Fonction d'initialisation du modèle
export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [3, 30],
            msg: 'Le nom d’utilisateur doit contenir entre 3 et 30 caractères',
          },
          is: {
            args: /^[a-zA-Z0-9_]+$/,
            msg: 'Le nom d’utilisateur ne doit contenir que des lettres, chiffres et underscores',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'L’adresse email doit être valide',
          },
          len: {
            args: [5, 255],
            msg: 'L’adresse email doit contenir entre 5 et 255 caractères',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 100],
            msg: 'Le mot de passe doit contenir au moins 8 caractères',
          },
          is: {
            args: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
            msg: 'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', 
        validate: {
          isIn: {
            args: [['user', 'admin', 'superadmin']], 
            msg: 'Le rôle doit être user, admin ou superadmin',
          },
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
      defaultScope: {
      attributes: { exclude: ['password'] },
    },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] },
        },
      },
    }
  );
};