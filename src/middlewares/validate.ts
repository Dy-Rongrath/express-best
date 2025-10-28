import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

type Schema = ZodTypeAny;

export const validate =
  (schema: { body?: Schema; params?: Schema; query?: Schema }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) req.body = schema.body.parse(req.body);
      if (schema.params) req.params = schema.params.parse(req.params) as any;
      if (schema.query) req.query = schema.query.parse(req.query) as any;
      next();
    } catch (e) { next(e); }
  };
