import type { Request, Response, NextFunction, RequestHandler } from 'express';

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
  return (req, res, next) => void fn(req, res, next).catch(next);
};

export const ok = <T>(res: Response, data: T) => res.status(200).json({ data });
