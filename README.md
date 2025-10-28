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

For Docker, the `MONGODB_URI` is set in the compose files to use the internal MongoDB service.