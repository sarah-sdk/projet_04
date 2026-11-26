import { User } from "@prisma/client";
import { UserResponseDto } from "../dto/user.dto";

export function serializeUser(user: User): UserResponseDto {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    admin: user.admin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
