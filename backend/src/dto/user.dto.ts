import z from "zod";

export const UserResponseSchema = z.object({
  id: z.number(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  admin: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserResponseDto = z.infer<typeof UserResponseSchema>;
