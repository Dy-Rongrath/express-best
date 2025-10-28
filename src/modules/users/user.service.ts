import { userRepo } from "./user.repo.js";
import { CreateUserInput } from "./user.types.js";

export const userService = {
  list: () => userRepo.findAll(),
  create: (dto: CreateUserInput) => userRepo.create(dto)
};
