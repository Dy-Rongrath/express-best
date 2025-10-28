import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
}).meta({
  id: 'CreateUserInput',
  description: 'Create a user (admin only)',
  example: { name: 'Jane Doe', email: 'jane@example.com' },
});
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type User = { id: string; name: string; email: string; createdAt: Date };
