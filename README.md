# Express Best Practices

## Features

- Express.js 5, TypeScript, ESM, Dockerized
- MongoDB with Mongoose 8
- JWT authentication (argon2 password hashing)
- Zod validation for all inputs
- Swagger UI & OpenAPI docs auto-generated from Zod schemas
- Robust error handling, health checks, and logging (Pino)
- Hot reload in development (tsx)
- Full test coverage (Vitest, Supertest, mongodb-memory-server)

## Development

### Quick Start

1. Copy `.env.example` to `.env` and adjust as needed.
2. Start dev environment:

  ```bash
  docker compose -f docker-compose.dev.yml up --build
  ```

3. Visit:
  - API root: [http://localhost:3000/api](http://localhost:3000/api)
  - Health check: [http://localhost:3000/api/health](http://localhost:3000/api/health)
  - Swagger UI: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

Code changes in `src/` are hot-reloaded automatically.

To run the application in development mode with hot reload:

```bash
docker compose -f docker-compose.dev.yml up --build
```

This will start the API server on port 3000 and MongoDB on port 27017.

## Production

To run the application in production mode:

```bash
docker compose -f docker-compose.prod.yml up --build
```

This will build and run the optimized production image.

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed.

## Database Tools

The project includes several database management scripts for development and maintenance:

### Seeding Data

```bash
# Seed database with sample data
npm run db:seed

# Clear all data from database
npm run db:clear

# Reset database (clear + reseed)
npm run db:reset
```

### Database Status

```bash
# Show database status and statistics
npm run db:status

# List database collections
npm run db:collections
```

### Migrations

```bash
# Run database migrations
npm run db:migrate

# Rollback migrations
npm run db:rollback

# List available migrations
npm run db:migrations
```

### Manual Scripts

You can also run scripts directly with Node.js:

```bash
# Database seeding
node --import tsx/esm src/scripts/seed.ts seed
node --import tsx/esm src/scripts/seed.ts clear
node --import tsx/esm src/scripts/seed.ts reset

# Database status
node --import tsx/esm src/scripts/db-status.ts status
node --import tsx/esm src/scripts/db-status.ts collections

# Migrations
node --import tsx/esm src/scripts/migrate.ts up
node --import tsx/esm src/scripts/migrate.ts down
node --import tsx/esm src/scripts/migrate.ts list
```

## Authentication

## API Documentation & Health

- **Swagger UI:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs) — interactive OpenAPI docs auto-generated from Zod schemas.
- **OpenAPI JSON:** [http://localhost:3000/api/docs/swagger.json](http://localhost:3000/api/docs/swagger.json) (downloadable spec)
- **Health Check:** [http://localhost:3000/api/health](http://localhost:3000/api/health) — returns `{ ok: true, mongo: { ok: true, state: 1 } }` if healthy.
- **API Root:** [http://localhost:3000/api](http://localhost:3000/api) — returns API and MongoDB status.

The API uses JWT-based authentication for protected routes.

### Environment Variables
- `JWT_SECRET` – Secret key for signing JWTs (required for production)
- `JWT_EXPIRES_IN` – Token expiry (default: `1h`)

### Endpoints

- `POST /api/auth/register` – Register a new user
  - Body: `{ "name": string, "email": string, "password": string }`
  - Returns: `{ id, name, email }`

- `POST /api/auth/login` – Login and receive a JWT
  - Body: `{ "email": string, "password": string }`
  - Returns: `{ token }`

- `GET /api/me` – Get current user info (requires `Authorization: Bearer <token>` header)
  - Returns: `{ user: { id, name, email } }`

## Example Usage

Register:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Access protected route:
```bash
curl http://localhost:3000/api/me \
  -H "Authorization: Bearer <your-jwt-token>"
```