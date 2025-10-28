

// Inject required JWT secrets for test environment (must be first)
process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "test-access-secret";
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "test-refresh-secret";
process.env.JWT_ACCESS_TTL = process.env.JWT_ACCESS_TTL || "15m";
process.env.JWT_REFRESH_TTL = process.env.JWT_REFRESH_TTL || "7d";

import { beforeAll, afterAll } from "vitest";
import { setupTestDB, teardownTestDB } from "./setup.js";

beforeAll(async () => { await setupTestDB(); });
afterAll(async () => { await teardownTestDB(); });
