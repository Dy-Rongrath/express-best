import swaggerJsdoc from 'swagger-jsdoc';

export const openapiSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: { title: 'express-best API', version: '1.0.0' },
  },
  apis: ['src/**/*.ts'], // JSDoc @swagger blocks
});
