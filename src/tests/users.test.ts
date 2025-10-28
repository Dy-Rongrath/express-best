import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../app.js";

const app = createApp();

describe("Users API (Mongo)", () => {
  it("GET /api/users returns paginated result", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ items: [], page: 1, limit: 20, total: 0 });
  });

  it("POST /api/users creates a user and enforces unique email", async () => {
    const payload = { name: "Dy", email: "dy@example.com" };
    const a = await request(app).post("/api/users").send(payload);
    expect(a.status).toBe(201);
    const b = await request(app).post("/api/users").send(payload);
    expect(b.status).toBe(409);
  });
});
