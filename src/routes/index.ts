
import { Router } from "express";
import { validate } from "../middlewares/validate.js";

import { CreateUserSchema } from "../modules/users/user.types.js";
import mongoose from "mongoose";
import { listUsers, createUser } from "../modules/users/user.controller.js";
import { RegisterSchema, LoginSchema } from "../modules/auth/auth.types.js";
import { registerCtrl, loginCtrl, refreshCtrl } from "../modules/auth/auth.controller.js";
import { requireAuth } from "../middlewares/auth.js";

export const router = Router();


router.get("/health", (_req, res) => {
  const state = mongoose.connection.readyState;
  res.json({ ok: state === 1, mongo: { state } });
});



// Auth
router.post("/auth/register", validate({ body: RegisterSchema }), registerCtrl);
router.post("/auth/login", validate({ body: LoginSchema }), loginCtrl);
router.post("/auth/refresh", refreshCtrl);

// Protected examples
router.get("/users", requireAuth, listUsers);
router.post("/users", requireAuth, validate({ body: CreateUserSchema }), createUser);
