import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { SessionService } from "../services/session.service";
import {
  CreateSessionSchema,
  SessionResponseDto,
  UpdateSessionSchema,
} from "../dto/session.dto";
import { serializeSession } from "../serializers/session.serializer";
import { InvalidSessionIdError } from "../errors/invalid-session-id.error";
import { UnauthenticatedError } from "../errors/unauthenticated.error";
import { InvalidUserIdError } from "../errors/invalid-user-id.error";

export class SessionController {
  private sessionService = new SessionService();

  async getAll(
    req: AuthRequest,
    res: Response,
  ): Promise<Response<SessionResponseDto[]>> {
    if (req.userId === undefined) {
      throw new UnauthenticatedError();
    }

    const sessions = await this.sessionService.findAll();

    const formattedSessions = sessions.map(serializeSession);

    return res.status(200).json(formattedSessions);
  }

  async getById(
    req: AuthRequest,
    res: Response,
  ): Promise<Response<SessionResponseDto>> {
    if (req.userId === undefined) {
      throw new UnauthenticatedError();
    }

    const { id } = req.params as { id: string };

    const sessionId = Number(id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      throw new InvalidSessionIdError();
    }

    const session = await this.sessionService.findById(sessionId);

    return res.status(200).json(serializeSession(session));
  }

  async create(
    req: AuthRequest,
    res: Response,
  ): Promise<Response<SessionResponseDto>> {
    if (req.userId === undefined) {
      throw new UnauthenticatedError();
    }

    const data = CreateSessionSchema.parse(req.body);

    const session = await this.sessionService.create(req.userId, data);

    return res.status(201).json(serializeSession(session));
  }

  async update(
    req: AuthRequest,
    res: Response,
  ): Promise<Response<SessionResponseDto>> {
    if (req.userId === undefined) {
      throw new UnauthenticatedError();
    }

    const { id } = req.params as { id: string };

    const sessionId = Number(id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      throw new InvalidSessionIdError();
    }

    const data = UpdateSessionSchema.parse(req.body);

    const session = await this.sessionService.update(
      req.userId,
      sessionId,
      data,
    );

    return res.status(200).json(serializeSession(session));
  }

  async delete(req: AuthRequest, res: Response): Promise<Response> {
    if (req.userId === undefined) {
      throw new UnauthenticatedError();
    }

    const { id } = req.params as { id: string };

    const sessionId = Number(id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      throw new InvalidSessionIdError();
    }

    await this.sessionService.delete(req.userId, sessionId);

    return res.status(200).json({ message: "Session deleted successfully" });
  }

  async participate(req: AuthRequest, res: Response): Promise<Response> {
    if (req.userId === undefined) {
      throw new UnauthenticatedError();
    }

    const { id, userId } = req.params as { id: string; userId: string };

    const sessionId = Number(id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      throw new InvalidSessionIdError();
    }

    const parsedUserId = Number(userId);
    if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
      throw new InvalidUserIdError();
    }

    await this.sessionService.participate(parsedUserId, sessionId);

    return res.status(200).json({ message: "Successfully joined the session" });
  }

  async unparticipate(req: AuthRequest, res: Response): Promise<Response> {
    if (req.userId === undefined) {
      throw new UnauthenticatedError();
    }

    const { id, userId } = req.params as { id: string; userId: string };

    const sessionId = Number(id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      throw new InvalidSessionIdError();
    }

    const parsedUserId = Number(userId);
    if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
      throw new InvalidUserIdError();
    }

    await this.sessionService.unparticipate(parsedUserId, sessionId);

    return res.status(200).json({ message: "Successfully left the session" });
  }
}
