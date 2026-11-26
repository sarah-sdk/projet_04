import { Teacher } from "@prisma/client";
import { TeacherResponseDto } from "../dto/teacher.dto";

export function serializeTeacher(teacher: Teacher): TeacherResponseDto {
  return {
    id: teacher.id,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    createdAt: teacher.createdAt,
    updatedAt: teacher.updatedAt,
  };
}
