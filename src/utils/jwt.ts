import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signAccess(payload: object) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_TTL } as any);
}

export function signRefresh(payload: object) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_TTL } as any);
}

export function verifyAccess(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as Record<string, unknown>;
}

export function verifyRefresh(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as Record<string, unknown>;
}
