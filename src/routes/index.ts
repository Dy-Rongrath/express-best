import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { CreateUserSchema } from "../modules/users/user.types.js";
import { listUsers, createUser } from "../modules/users/user.controller.js";
import { mongoHealth } from "../config/db.js";

export const router = Router();

router.get("/health", (_req, res) => {
  const mongo = mongoHealth();
  res.json({ ok: true, mongo });
});

router.get("/users", listUsers);
router.post("/users", validate({ body: CreateUserSchema }), createUser);
