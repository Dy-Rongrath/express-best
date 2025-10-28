import { MongoMemoryServer } from "mongodb-memory-server";
import { connectDB, disconnectDB } from "../config/db.js";

let mongod: MongoMemoryServer;

export async function setupTestDB() {
  mongod = await MongoMemoryServer.create();
  await connectDB(mongod.getUri());
}

export async function teardownTestDB() {
  await disconnectDB();
  if (mongod) await mongod.stop();
}
