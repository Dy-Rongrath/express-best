import pino from 'pino';
import pinoHttp from 'pino-http';
import { config } from './index';

export const logger = pino({
  level: config.isDev ? 'debug' : 'info',
  transport: config.isDev ? { target: 'pino-pretty', options: { translateTime: true } } : undefined,
});

export const httpLogger = pinoHttp({ logger });
