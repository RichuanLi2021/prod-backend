import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ProdManager API',
    version: '1.0.0',
    description: 'API documentation for authentication and product management',
  },
  servers: [
    {
      url: '/api',
      description: 'API server',
    },
  ],
};

const apis: string[] = [];

export const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis,
});

export const swaggerDocs = {
  openapi: '3.0.0',
  info: swaggerDefinition.info,
  servers: swaggerDefinition.servers,
  tags: [
    { name: 'Authentication', description: 'Operations related to authentication (sign up, sign in, logout, refresh, reset password)' },
    { name: 'Products', description: 'Operations related to products (create, read, update, delete)' },
  ],
  paths: {
    '/auth/signup': {
      post: {
        tags: ['Authentication'],
        summary: 'Sign up (create a new account)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                  name: { type: 'string' },
                },
                required: ['email', 'password', 'name'],
              },
            },
          },
        },
        responses: {
          201: { description: 'Signup successful' },
          400: { description: 'Invalid input' },
        },
      },
    },
    '/auth/sign-in': {
      post: {
        tags: ['Authentication'],
        summary: 'Sign in (login as a returning user)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Sign in successful' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Authentication'],
        summary: 'Logout the current user',
        responses: {
          200: { description: 'Logout successful' },
        },
      },
    },
    '/auth/refresh-token': {
      post: {
        tags: ['Authentication'],
        summary: 'Refresh JWT token',
        responses: {
          200: { description: 'Token refreshed' },
          401: { description: 'Invalid or expired token' },
        },
      },
    },
    '/auth/reset-password': {
      post: {
        tags: ['Authentication'],
        summary: 'Reset password for a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  newPassword: { type: 'string' },
                  resetToken: { type: 'string' },
                },
                required: ['email', 'newPassword', 'resetToken'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Password reset successful' },
          400: { description: 'Invalid input or token' },
        },
      },
    },
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'Get all products (public)',
        responses: {
          200: { description: 'A list of products' },
        },
      },
      post: {
        tags: ['Products'],
        summary: 'Create a new product (SELLER, ADMIN only)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  banner: { type: 'string' },
                  price: { type: 'number' },
                },
                required: ['name', 'description', 'banner', 'price'],
              },
            },
          },
        },
        responses: {
          201: { description: 'Product created' },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Get a single product by ID (USER, SELLER, ADMIN)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Product found' },
          404: { description: 'Product not found' },
          401: { description: 'Unauthorized' },
        },
      },
      put: {
        tags: ['Products'],
        summary: 'Update a product by ID (SELLER, ADMIN only)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  banner: { type: 'string' },
                  price: { type: 'number' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Product updated' },
          400: { description: 'Invalid input' },
          404: { description: 'Product not found' },
          401: { description: 'Unauthorized' },
        },
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete a product by ID (SELLER, ADMIN only)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Product deleted' },
          404: { description: 'Product not found' },
          401: { description: 'Unauthorized' },
        },
      },
    },
  },
};