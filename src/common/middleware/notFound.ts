import type { RequestHandler } from 'express';
import { NotFound } from '../errors.js';

export const notFound: RequestHandler = (_req, _res, next) => next(NotFound('Route not found'));
