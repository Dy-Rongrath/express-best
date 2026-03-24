import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { connectDB, disconnectDB } from "./config/db.js";

const app = createApp();

async function start() {
  await connectDB();
  const srv = app.listen(env.PORT, () => logger.info(`Server running on :${env.PORT}`));
  let isStopping = false;

  const stop = async (signal: string, exitCode: number | null = 0) => {
    if (isStopping) return;
    isStopping = true;

    logger.info(`Received ${signal}, shutting down...`);
    await disconnectDB();
    srv.close(() => {
      logger.info("HTTP server closed");
      if (exitCode === null) {
        process.kill(process.pid, "SIGUSR2");
        return;
      }
      process.exit(exitCode);
    });
    // Force exit after 10s
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGINT", () => void stop("SIGINT"));
  process.on("SIGTERM", () => void stop("SIGTERM"));
  process.once("SIGUSR2", () => void stop("SIGUSR2", null));
}

start().catch((e) => {
  logger.error({ e }, "Failed to start");
  process.exit(1);
});
