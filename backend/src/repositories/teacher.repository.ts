import { Prisma, Teacher } from "@prisma/client";
import prisma from "../utils/prisma";

export class TeacherRepository {
  async findAll(): Promise<Teacher[]> {
    return prisma.teacher.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number): Promise<Teacher | null> {
    return prisma.teacher.findUnique({
      where: { id },
    });
  }
}
