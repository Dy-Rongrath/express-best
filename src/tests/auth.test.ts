import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../app.js";
import { UserModel } from "../modules/users/user.model.js";

const testUser = { email: "test@example.com", password: "password123", name: "Test User" };

beforeAll(async () => {
  await UserModel.deleteMany({});
});

describe("Auth flow", () => {
  let accessToken: string;
  let refreshToken: string;

  it("registers a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser)
      .expect(201);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  it("logs in and returns tokens", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  it("rejects login with wrong password", async () => {
    await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "wrongpass" })
      .expect(401);
  });

  it("refreshes tokens with refreshToken", async () => {
    const res = await request(app)
      .post("/api/auth/refresh")
      .send({ refreshToken })
      .expect(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
  });

  it("accesses protected /users route with JWT", async () => {
    await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
  });

  it("rejects /users without JWT", async () => {
    await request(app).get("/api/users").expect(401);
  });
});
