// src/config/swagger.ts

import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Express TS Sequelize',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/**/*.ts'], // chemins vers les fichiers avec JSDoc
}

const swaggerSpec = swaggerJSDoc(options)

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}