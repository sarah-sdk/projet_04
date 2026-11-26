import { User } from "@prisma/client";
import { AuthResponseDto } from "../dto/auth.dto";

export function serializeAuth(user: User, token: string): AuthResponseDto {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    admin: user.admin,
    token,
  };
}
