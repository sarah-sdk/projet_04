import { SessionResponseDto } from "../dto/session.dto";
import { SessionWithTeacherAndParticipants } from "../types";

export function serializeSession(
  session: SessionWithTeacherAndParticipants,
): SessionResponseDto {
  return {
    id: session.id,
    name: session.name,
    date: session.date,
    description: session.description,
    teacher: session.teacher,
    users: session.participants.map((participant) => participant.userId),
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
  };
}
