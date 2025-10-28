import { createDocument } from 'zod-openapi';
import { RegisterSchema, LoginSchema } from '../modules/auth/auth.types.js';
import { CreateUserSchema } from '../modules/users/user.types.js';



export function getOpenApiDocument() {
  // Use schemas directly (already have .meta)
  return createDocument({
    openapi: '3.0.0',
    info: {
      title: 'Express Best API',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000/api' }],
    components: {
      schemas: {
        RegisterInput: RegisterSchema,
        LoginInput: LoginSchema,
        CreateUserInput: CreateUserSchema,
      },
    },
    paths: {},
  });
}
