import { beforeAll, afterAll } from "vitest";
import { setupTestDB, teardownTestDB } from "./setup.js";

beforeAll(async () => { await setupTestDB(); });
afterAll(async () => { await teardownTestDB(); });
