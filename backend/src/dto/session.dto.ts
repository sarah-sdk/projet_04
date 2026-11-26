import { z } from "zod";

export const CreateSessionSchema = z.object({
  name: z.string().min(3).max(50),
  date: z.string(),
  description: z.string().max(2500),
  teacherId: z.number(),
});

export const UpdateSessionSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  date: z.string().optional(),
  description: z.string().max(2500).optional(),
  teacherId: z.number().optional(),
});

export const SessionResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  date: z.date(),
  description: z.string(),
  teacher: z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
  }),
  users: z.array(z.number()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateSessionDto = z.infer<typeof CreateSessionSchema>;
export type UpdateSessionDto = z.infer<typeof UpdateSessionSchema>;
export type SessionResponseDto = z.infer<typeof SessionResponseSchema>;
