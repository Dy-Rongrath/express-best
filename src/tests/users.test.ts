import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../app.js";

let accessToken: string;

beforeAll(async () => {
  // Register and login a user to get a token
  const user = { name: "Test User", email: "user@example.com", password: "password123" };
  await request(app).post("/api/auth/register").send(user);
  const loginRes = await request(app).post("/api/auth/login").send({ email: user.email, password: user.password });
  accessToken = loginRes.body.accessToken;
});

describe("Users API (Mongo)", () => {
  it("GET /api/users returns paginated result", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      items: [
        expect.objectContaining({
          email: "user@example.com",
          name: "Test User"
        })
      ],
      page: 1,
      limit: 20,
      total: 1
    });
  });
});
