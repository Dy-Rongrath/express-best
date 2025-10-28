import { Router } from "express";
import { registerCtrl, loginCtrl } from "./auth.controller.js";

export const authRouter = Router();
authRouter.post("/register", registerCtrl);
authRouter.post("/login", loginCtrl);
