import type { RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';

export const requestId: RequestHandler = (req, res, next) => {
  const id = req.headers['x-request-id']?.toString() || uuid();
  req.id = id as string;
  res.setHeader('x-request-id', id);
  next();
};

declare module 'express' {
  interface Request {
    id?: string | number | object;
    user?: Record<string, unknown>;
  }
}
