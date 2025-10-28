import type { RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';

export const requestId: RequestHandler = (req, res, next) => {
  const id = req.headers['x-request-id']?.toString() || uuid();
  req.id = id as string;
  res.setHeader('x-request-id', id);
  next();
};

declare global {
  namespace Express {
    interface Request { id?: string }
  }
}
