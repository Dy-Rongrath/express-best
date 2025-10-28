import express from "express";
import { applyAppMiddleware } from "./config/app.js";
import { router } from "./routes/index.js";
import { errorHandler } from "./middlewares/error.js";

export function createApp() {
  const app = express();
  applyAppMiddleware(app);
  app.use("/api", router);
  app.use(errorHandler);
  return app;
}
