import mongoose from "mongoose";
import { logger } from "../utils/logger.js";
import { env } from "./env.js";

let isConnected = false;

export async function connectDB(uri = env.MONGODB_URI) {
  if (isConnected) return;
  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    autoIndex: env.NODE_ENV !== "production",
    serverSelectionTimeoutMS: 7000,
    maxPoolSize: 10,
  } as any);

  isConnected = true;
  mongoose.connection.on("error", (err) => logger.error({ err }, "Mongo connection error"));
  mongoose.connection.on("disconnected", () => logger.warn("Mongo disconnected"));
  logger.info("Mongo connected");
}

export async function disconnectDB() {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
  logger.info("Mongo disconnected");
}

export function mongoHealth() {
  const state = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
  return { ok: state === 1, state };
}
