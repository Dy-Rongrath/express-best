import { createDocument } from 'zod-openapi';
import { RegisterSchema, LoginSchema } from '../modules/auth/auth.types.js';
import { CreateUserSchema } from '../modules/users/user.types.js';
import { z } from 'zod';

const TokenResponseSchema = z.object({
  accessToken: z.string().meta({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.access',
  }),
  refreshToken: z.string().meta({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.refresh',
  }),
}).meta({
  id: 'TokenResponse',
  description: 'Access and refresh tokens',
});

const RefreshSchema = z.object({
  refreshToken: z.string(),
}).meta({
  id: 'RefreshInput',
  description: 'Refresh an expired access token',
  example: { refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.refresh' },
});

const ReportTemplateSchema = z.object({
  key: z.string(),
  name: z.string(),
  engine: z.enum(['ejs', 'carbone']),
  outputFileName: z.string(),
}).meta({
  id: 'ReportTemplate',
});

const ReportTemplateListSchema = z.object({
  data: z.array(ReportTemplateSchema),
}).meta({
  id: 'ReportTemplateListResponse',
});

export function getOpenApiDocument() {
  return createDocument({
    openapi: '3.0.0',
    info: {
      title: 'Express Best API',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000/api' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        RegisterInput: RegisterSchema,
        LoginInput: LoginSchema,
        RefreshInput: RefreshSchema,
        CreateUserInput: CreateUserSchema,
        TokenResponse: TokenResponseSchema,
        ReportTemplate: ReportTemplateSchema,
        ReportTemplateListResponse: ReportTemplateListSchema,
      },
    },
    paths: {
      '/auth/register': {
        post: {
          summary: 'Register a new user',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RegisterInput' },
              },
            },
          },
          responses: {
            '201': {
              description: 'JWT tokens created',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/TokenResponse' },
                },
              },
            },
          },
        },
      },
      '/auth/login': {
        post: {
          summary: 'Login and get JWT tokens',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginInput' },
              },
            },
          },
          responses: {
            '200': {
              description: 'JWT tokens created',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/TokenResponse' },
                },
              },
            },
            '401': {
              description: 'Invalid credentials',
            },
          },
        },
      },
      '/auth/refresh': {
        post: {
          summary: 'Refresh JWT tokens',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RefreshInput' },
              },
            },
          },
          responses: {
            '200': {
              description: 'JWT tokens refreshed',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/TokenResponse' },
                },
              },
            },
            '401': {
              description: 'Invalid refresh token',
            },
          },
        },
      },
      '/reports': {
        get: {
          summary: 'List available report templates',
          tags: ['Reports'],
          security: [{ bearerAuth: [] }],
          responses: {
            '200': {
              description: 'Templates available for report generation',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ReportTemplateListResponse' },
                },
              },
            },
            '401': {
              description: 'Missing or invalid bearer token',
            },
          },
        },
      },
      '/reports/mission-letter': {
        get: {
          summary: 'Generate mission letter PDF',
          description: 'Returns a printable PDF document for the mission letter template. In Swagger UI, use the Download button to open the file properly.',
          tags: ['Reports'],
          security: [{ bearerAuth: [] }],
          responses: {
            '200': {
              description: 'PDF document download',
              content: {
                'application/pdf': {
                  schema: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
              headers: {
                'Content-Disposition': {
                  description: 'Attachment filename for the generated PDF',
                  schema: {
                    type: 'string',
                    example: 'attachment; filename=mission_letter.pdf',
                  },
                },
              },
            },
            '401': {
              description: 'Missing or invalid bearer token',
            },
          },
        },
      },
    },
  });
}
