import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { connectDB, disconnectDB } from "./config/db.js";

const app = createApp();

async function start() {
  await connectDB();
  const srv = app.listen(env.PORT, () => logger.info(`Server running on :${env.PORT}`));

  const stop = async (signal: string) => {
    logger.info(`Received ${signal}, shutting down...`);
    await disconnectDB();
    srv.close(() => {
      logger.info("HTTP server closed");
      process.exit(0);
    });
    // Force exit after 10s
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGINT", () => stop("SIGINT"));
  process.on("SIGTERM", () => stop("SIGTERM"));
}

start().catch((e) => {
  logger.error({ e }, "Failed to start");
  process.exit(1);
});
