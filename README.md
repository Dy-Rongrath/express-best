# Express Best Practices

## Development

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

You can also run scripts directly with tsx:

```bash
# Seed database
tsx src/scripts/seed.ts seed

# Clear database
tsx src/scripts/seed.ts clear

# Database status
tsx src/scripts/db-status.ts status

# Run migrations
tsx src/scripts/migrate.ts up
```