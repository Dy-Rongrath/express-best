import { Request, Response } from "express";
import { asyncHandler } from "../../utils/http.js";
import * as svc from "./auth.service.js";

export const registerCtrl = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  res.status(201).json(await svc.register(name, email, password));
});

export const loginCtrl = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.json(await svc.login(email, password));
});

export const refreshCtrl = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  res.json(svc.refresh(refreshToken));
});
