import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'coding-interview-backend-level-3 api',
      version: '1.0.0',
      description: 'Api for coding interview backend level 3',
    },
    components: {
      schemas: {
        Item: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Identificador único del item',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Nombre del item',
              example: 'Laptop',
            },
            price: {
              type: 'number',
              description: 'Precio del item',
              example: 999.99,
            },
          },
          required: ['id', 'name', 'price'],
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Asegúrate de incluir tanto rutas como controladores
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
