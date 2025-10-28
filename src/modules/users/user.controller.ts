import { Request, Response } from "express";
import { asyncHandler } from "../../utils/http.js";
import { userRepo } from "./user.repo.js";
import { HttpError } from "../../middlewares/error.js";


const create = asyncHandler(async (req: Request, res: Response) => {
  try {
    const created = await userRepo.create(req.body);
    res.status(201).json(created);
  } catch (e: any) {
    if (e?.code === 11000) {
      throw new HttpError(409, "Email already exists", { keyValue: e.keyValue });
    }
    throw e;
  }
});

const list = asyncHandler(async (_req: Request, res: Response) => {
  const users = await userRepo.findAll();
  res.json(users);
});

const get = asyncHandler(async (req: Request, res: Response) => {
  const user = await userRepo.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

const update = asyncHandler(async (req: Request, res: Response) => {
  const user = await userRepo.updateById(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

const remove = asyncHandler(async (req: Request, res: Response) => {
  const user = await userRepo.deleteById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

export { create, list, get, update, remove };
