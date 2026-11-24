import { Prisma } from "@prisma/client";

export type SessionWithTeacherAndParticipants = Prisma.SessionGetPayload<{
  include: {
    teacher: {
      select: {
        id: true;
        firstName: true;
        lastName: true;
      };
    };
    participants: {
      select: {
        userId: true;
      };
    };
  };
}>;
