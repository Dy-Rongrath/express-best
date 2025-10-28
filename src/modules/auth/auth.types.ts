import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
}).meta({
  id: 'RegisterInput',
  description: 'Register a new user',
  example: { name: 'John Doe', email: 'john@example.com', password: 'password123' },
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
}).meta({
  id: 'LoginInput',
  description: 'Login with email and password',
  example: { email: 'john@example.com', password: 'password123' },
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
