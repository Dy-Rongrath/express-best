import express from "express";

import { applyAppMiddleware } from "./config/app.js";
import { router } from "./routes/index.js";
import { errorHandler } from "./middlewares/error.js";
import swaggerUi from "swagger-ui-express";
import { getOpenApiDocument } from "./config/openapi.js";



export function createApp() {
  const app = express();
  applyAppMiddleware(app);

  // Swagger UI
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(getOpenApiDocument()));
  // Root /api endpoint for status
  app.get("/api", async (_req, res) => {
    // Import mongoose dynamically to avoid circular deps
    const mongoose = (await import("mongoose")).default;
    const state = mongoose.connection.readyState;
    res.json({ ok: state === 1, mongo: { ok: state === 1, state } });
  });

  app.use("/api", router);
  app.use(errorHandler);
  return app;
}

export const app = createApp();
