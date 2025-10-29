import { Request, Response, NextFunction } from "express";
import { verifyAccess } from "../utils/jwt.js";
import { HttpError } from "./error.js";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const h = req.header("authorization") || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return next(new HttpError(401, "Missing bearer token"));
  try {
    req.user = verifyAccess(token); // attach user
    next();
  } catch {
    next(new HttpError(401, "Invalid token"));
  }
}
