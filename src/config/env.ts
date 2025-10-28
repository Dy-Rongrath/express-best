import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().optional(), // Make optional - tests will provide their own
});

export const env = EnvSchema.parse(process.env);
