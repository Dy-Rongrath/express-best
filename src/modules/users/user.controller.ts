import { Request, Response } from "express";
import { asyncHandler } from "../../utils/http.js";
import { userRepo } from "./user.repo.js";
import { HttpError } from "../../middlewares/error.js";

export const listUsers = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const limit = Math.min(100, Number(req.query.limit ?? 20));
  res.json(await userRepo.findAll({ page, limit }));
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const created = await userRepo.create(req.body);
    res.status(201).json(created);
  } catch (e: any) {
    // Handle Mongo duplicate key
    if (e?.code === 11000) {
      throw new HttpError(409, "Email already exists", { keyValue: e.keyValue });
    }
    throw e;
  }
});
