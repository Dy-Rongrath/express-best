import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import express from "express";

export function applyAppMiddleware(app: express.Express) {
  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));
}
