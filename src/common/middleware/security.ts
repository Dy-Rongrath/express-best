import type { RequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { config } from '../../config/index.js';

export const security = [
  helmet(),
  cors({ origin: config.corsOrigin?.split(',') || true, credentials: true }),
  compression(),
  rateLimit({ windowMs: config.rateLimit.windowMs, max: config.rateLimit.max }),
] as RequestHandler[];
