// src/index.ts

import app from './app';
import config from './config/config';
import { sequelize } from './config/database';
import seed from './seeders/seed';
import { initUserModel } from './models/userModel';

const startServer = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate()
    console.log(' Database connection has been established successfully.')

    initUserModel(sequelize);

    if (config.seed) {
      console.log('SEED mode enabled. Resetting and seeding database...');
      await sequelize.sync({ force: true });
      await seed();
    } else {
      await sequelize.sync();
      console.log('Tables synchronized.');
    }

    const PORT = config.port
    app.listen(PORT, () => {
      console.log(` Server is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error(' Unable to connect to the database:', error)
    process.exit(1) 
  }
}

startServer()
