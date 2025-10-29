import type { RequestHandler } from 'express';
import { ZodTypeAny } from 'zod';
import { BadRequest } from '../errors.js';

export const validate = (schema: ZodTypeAny): RequestHandler => (req, _res, next) => {
  const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });
  if (!result.success) return next(BadRequest('Validation error', result.error.flatten()));
  Object.assign(req, result.data);
  return next();
};
