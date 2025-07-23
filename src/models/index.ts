import { sequelize } from '../config/database';
import { User, initUserModel } from './userModel';

initUserModel(sequelize);

const db = {
  sequelize,
  User,
};

export default db;