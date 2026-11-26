import z from "zod";

export const TeacherResponseSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TeacherResponseDto = z.infer<typeof TeacherResponseSchema>;
