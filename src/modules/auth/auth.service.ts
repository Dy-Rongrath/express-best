import argon2 from "argon2";
import { UserModel } from "../users/user.model.js";
import { HttpError } from "../../middlewares/error.js";
import { signAccess, signRefresh, verifyRefresh } from "../../utils/jwt.js";

export async function register(name: string, email: string, password: string) {
  const passwordHash = await argon2.hash(password);
  try {
    const user = await UserModel.create({ name, email, passwordHash });
    return issueTokens(user.id, user.email, user.name);
  } catch (e: unknown) {
    if ((e as { code?: number })?.code === 11000) throw new HttpError(409, "Email already exists");
    throw e;
  }
}

export async function login(email: string, password: string) {
  const user = await UserModel.findOne({ email }).select("+passwordHash").lean();
  if (!user || !(await argon2.verify(user.passwordHash, password))) {
    throw new HttpError(401, "Invalid credentials");
  }
  return issueTokens(user._id.toString(), user.email, user.name);
}

export function refresh(refreshToken: string) {
  try {
    const payload = verifyRefresh(refreshToken);
    return issueTokens(payload.sub as string, payload.email as string, payload.name as string);
  } catch {
    throw new HttpError(401, "Invalid refresh token");
  }
}

function issueTokens(sub: string, email: string, name: string) {
  const accessToken = signAccess({ sub, email, name });
  const refreshToken = signRefresh({ sub, email, name });
  return { accessToken, refreshToken };
}
