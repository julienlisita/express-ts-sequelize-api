// src/index.ts

import app from './app';
import config from './config/config';
import { sequelize } from './config/database';

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log(' Database connection has been established successfully.')

    const PORT = config.port
    app.listen(PORT, () => {
      console.log(` Server is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error(' Unable to connect to the database:', error)
    process.exit(1) // on quitte le programme proprement
  }
}

startServer()
