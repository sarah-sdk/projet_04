import { SessionParticipation } from "@prisma/client";
import { CreateSessionDto, UpdateSessionDto } from "../dto/session.dto";
import { NotAdminError } from "../errors/not-admin.error";
import { SessionNotFoundError } from "../errors/session-not-found.error";
import { TeacherNotFoundError } from "../errors/teacher-not-found.error";
import { UserNotFoundError } from "../errors/user-not-found.error";
import { SessionParticipationRepository } from "../repositories/session-participation.repository";
import { SessionRepository } from "../repositories/session.repository";
import { TeacherRepository } from "../repositories/teacher.repository";
import { UserRepository } from "../repositories/user.repository";
import { SessionWithTeacherAndParticipants } from "../types";
import { AlreadyParticipatingError } from "../errors/already-participating.error";
import { NotParticipatingError } from "../errors/not-participating.error";

export class SessionService {
  private sessionRepository = new SessionRepository();
  private userRepository = new UserRepository();
  private teacherRepository = new TeacherRepository();
  private sessionParticipationRepository = new SessionParticipationRepository();

  async findById(
    sessionId: number,
  ): Promise<SessionWithTeacherAndParticipants> {
    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new SessionNotFoundError();
    }

    return session;
  }

  async findAll(): Promise<SessionWithTeacherAndParticipants[]> {
    return this.sessionRepository.findAll();
  }

  async create(
    userId: number,
    data: CreateSessionDto,
  ): Promise<SessionWithTeacherAndParticipants> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (!user.admin) {
      throw new NotAdminError();
    }

    const { teacherId, date, ...sessionData } = data;

    const teacher = await this.teacherRepository.findById(teacherId);
    if (!teacher) {
      throw new TeacherNotFoundError();
    }

    return this.sessionRepository.create(
      {
        ...sessionData,
        date: new Date(date),
      },
      teacherId,
    );
  }

  async update(
    userId: number,
    sessionId: number,
    data: UpdateSessionDto,
  ): Promise<SessionWithTeacherAndParticipants> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }
    if (!user.admin) {
      throw new NotAdminError();
    }

    const existingSession = await this.sessionRepository.findById(sessionId);
    if (!existingSession) {
      throw new SessionNotFoundError();
    }

    const { teacherId, date, ...sessionData } = data;

    if (teacherId !== undefined) {
      const teacher = await this.teacherRepository.findById(teacherId);
      if (!teacher) {
        throw new TeacherNotFoundError();
      }
    }

    const updateData = {
      ...sessionData,
      ...(date !== undefined && { date: new Date(date) }),
    };

    return this.sessionRepository.update(sessionId, updateData, teacherId);
  }

  async delete(userId: number, sessionId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (!user.admin) {
      throw new NotAdminError();
    }

    const existingSession = await this.sessionRepository.findById(sessionId);

    if (!existingSession) {
      throw new SessionNotFoundError();
    }

    return this.sessionRepository.delete(sessionId);
  }

  async participate(
    userId: number,
    sessionId: number,
  ): Promise<SessionParticipation> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const existingSession = await this.sessionRepository.findById(sessionId);

    if (!existingSession) {
      throw new SessionNotFoundError();
    }

    const existingParticipation =
      await this.sessionParticipationRepository.findBySessionAndUser(
        sessionId,
        userId,
      );

    if (existingParticipation) {
      throw new AlreadyParticipatingError();
    }

    return this.sessionParticipationRepository.create(sessionId, userId);
  }

  async unparticipate(userId: number, sessionId: number): Promise<void> {
    const existingParticipation =
      await this.sessionParticipationRepository.findBySessionAndUser(
        sessionId,
        userId,
      );

    if (!existingParticipation) {
      throw new NotParticipatingError();
    }

    return this.sessionParticipationRepository.delete(sessionId, userId);
  }
}
