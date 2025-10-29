import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().url().optional(),
  CORS_ORIGIN: z.string().optional(),
  RATE_LIMIT_WINDOW_MS: z.string().default('60000'),
  RATE_LIMIT_MAX: z.string().default('100'),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_ACCESS_TTL: z.string().default("15m"),
  JWT_REFRESH_TTL: z.string().default("7d"),
});

export const env = EnvSchema.parse(process.env);

export const config = {
  env: env.NODE_ENV,
  isDev: env.NODE_ENV === 'development',
  port: env.PORT,
  mongoUri: env.MONGODB_URI || (env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/test' : ''),
  corsOrigin: env.CORS_ORIGIN,
  rateLimit: {
    windowMs: Number(env.RATE_LIMIT_WINDOW_MS),
    max: Number(env.RATE_LIMIT_MAX),
  },
};
