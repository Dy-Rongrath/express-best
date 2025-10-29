import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ApiError } from '../errors.js';

export const errorConverter: RequestHandler = (req, res, next) => {
  // if the route hit threw a non-ApiError, convert it
  next();
};

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const e: ApiError = err instanceof ApiError ? err : new ApiError(500, 'Internal Server Error');
  const payload = {
    error: {
      code: e.code ?? (e.status === 500 ? 'INTERNAL' : undefined),
      message: e.message,
      ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {}),
    },
  };
  res.status(e.status).json(payload);
};
