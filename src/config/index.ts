import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('3000'),
  MONGO_URI: z.string().url(),
  CORS_ORIGIN: z.string().optional(),
  RATE_LIMIT_WINDOW_MS: z.string().default('60000'),
  RATE_LIMIT_MAX: z.string().default('100'),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ Invalid env vars', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = {
  env: parsed.data.NODE_ENV,
  isDev: parsed.data.NODE_ENV === 'development',
  port: Number(parsed.data.PORT),
  mongoUri: parsed.data.MONGO_URI,
  corsOrigin: parsed.data.CORS_ORIGIN,
  rateLimit: {
    windowMs: Number(parsed.data.RATE_LIMIT_WINDOW_MS),
    max: Number(parsed.data.RATE_LIMIT_MAX),
  },
} as const;
