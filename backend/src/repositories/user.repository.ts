import { Prisma, User } from "@prisma/client";
import prisma from "../utils/prisma";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  async promoteToAdmin(id: number): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: {
        admin: true,
      },
    });
  }

  async delete(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
