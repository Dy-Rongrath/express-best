import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { CreateUserSchema } from "../modules/users/user.types.js";

import mongoose from "mongoose";

export const router = Router();
import { listUsers, createUser } from "../modules/users/user.controller.js";


router.get("/health", (_req, res) => {
  const state = mongoose.connection.readyState;
  res.json({ ok: state === 1, mongo: { state } });
});

router.get("/users", listUsers);
router.post("/users", validate({ body: CreateUserSchema }), createUser);
