import { SessionParticipation } from "@prisma/client";
import prisma from "../utils/prisma";

export class SessionParticipationRepository {
  async findBySessionAndUser(
    sessionId: number,
    userId: number,
  ): Promise<SessionParticipation | null> {
    return prisma.sessionParticipation.findUnique({
      where: {
        sessionId_userId: {
          sessionId,
          userId,
        },
      },
    });
  }

  async create(
    sessionId: number,
    userId: number,
  ): Promise<SessionParticipation> {
    return prisma.sessionParticipation.create({
      data: {
        sessionId,
        userId,
      },
    });
  }

  async delete(sessionId: number, userId: number): Promise<void> {
    await prisma.sessionParticipation.delete({
      where: {
        sessionId_userId: {
          sessionId,
          userId,
        },
      },
    });
    return;
  }
}
