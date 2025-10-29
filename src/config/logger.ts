
import pino from 'pino';
import pinoHttp from 'pino-http';
import { config } from './env.js';

// If ESM, pinoHttp may be a module object, so use pinoHttp.default if needed
const httpLoggerImpl = typeof pinoHttp === 'function' ? pinoHttp : pinoHttp.default;

export const logger = pino({
  level: config.isDev ? 'debug' : 'info',
  transport: config.isDev ? { target: 'pino-pretty', options: { translateTime: true } } : undefined,
});

export const httpLogger = httpLoggerImpl({ logger });
