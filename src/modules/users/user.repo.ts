import { UserModel } from "./user.model.js";
import { CreateUserInput } from "./user.types.js";

export const userRepo = {
  async create(data: CreateUserInput) {
    const doc = await UserModel.create(data);
    return doc.toJSON();
  },

  async findAll({ page = 1, limit = 20 }: { page?: number; limit?: number } = {}) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      UserModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean({ virtuals: true }),
      UserModel.countDocuments()
    ]);
    return {
      items: items.map((i) => ({ ...i, id: i._id?.toString() })),
      page, limit, total, pages: Math.ceil(total / limit)
    };
  },

  async findById(id: string) {
    const user = await UserModel.findById(id).lean({ virtuals: true });
  return user ? { ...user, id: user._id?.toString() } : null;
  },

  async updateById(id: string, data: Partial<CreateUserInput>) {
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true, lean: true });
  return user ? { ...user, id: user._id?.toString() } : null;
  },

  async deleteById(id: string) {
    const user = await UserModel.findByIdAndDelete(id, { lean: true });
  return user ? { ...user, id: user._id?.toString() } : null;
  }
};
