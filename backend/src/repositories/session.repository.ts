import { Prisma } from "@prisma/client";
import prisma from "../utils/prisma";
import { SessionWithTeacherAndParticipants } from "../types";

export class SessionRepository {
  async findAll(): Promise<SessionWithTeacherAndParticipants[]> {
    return prisma.session.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        participants: {
          select: {
            userId: true,
          },
        },
      },
    });
  }

  async findById(
    id: number,
  ): Promise<SessionWithTeacherAndParticipants | null> {
    return prisma.session.findUnique({
      where: { id },
      include: {
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        participants: {
          select: {
            userId: true,
          },
        },
      },
    });
  }

  async create(
    data: Omit<Prisma.SessionCreateInput, "teacher" | "participants">,
    teacherId: number,
  ): Promise<SessionWithTeacherAndParticipants> {
    return prisma.session.create({
      data: {
        ...data,
        teacher: {
          connect: { id: teacherId },
        },
      },
      include: {
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        participants: {
          select: {
            userId: true,
          },
        },
      },
    });
  }

  async update(
    sessionId: number,
    updateData: Omit<Prisma.SessionUpdateInput, "teacher" | "participants">,
    newTeacherId?: number,
  ): Promise<SessionWithTeacherAndParticipants> {
    const data: Prisma.SessionUpdateInput = {
      ...updateData,
    };

    if (newTeacherId !== undefined) {
      data.teacher = {
        connect: { id: newTeacherId },
      };
    }

    return prisma.session.update({
      where: { id: sessionId },
      data,
      include: {
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        participants: {
          select: {
            userId: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.session.delete({
      where: { id },
    });
    return;
  }
}
