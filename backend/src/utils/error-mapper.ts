import { ZodError } from "zod";
import { AlreadyParticipatingError } from "../errors/already-participating.error";
import { InvalidSessionIdError } from "../errors/invalid-session-id.error";
import { NotAdminError } from "../errors/not-admin.error";
import { NotParticipatingError } from "../errors/not-participating.error";
import { SessionNotFoundError } from "../errors/session-not-found.error";
import { TeacherNotFoundError } from "../errors/teacher-not-found.error";
import { UnauthenticatedError } from "../errors/unauthenticated.error";
import { UserNotFoundError } from "../errors/user-not-found.error";
import { AppError } from "./app-error";
import { InvalidUserIdError } from "../errors/invalid-user-id.error";
import { InvalidTeacherIdError } from "../errors/invalid-teacher-id.error";
import { UnauthorizedDeletionError } from "../errors/unauthorized-deletion.error";
import { NotDevelopmentEnvError } from "../errors/not-development-env.error";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error";
import { AlreadyExistEmailError } from "../errors/already-exist-email.error";

export function mapError(error: unknown): Error {
  if (
    error instanceof SessionNotFoundError ||
    error instanceof UserNotFoundError ||
    error instanceof TeacherNotFoundError ||
    error instanceof NotParticipatingError
  ) {
    return new AppError(error.message, 404);
  }

  if (
    error instanceof NotAdminError ||
    error instanceof UnauthorizedDeletionError ||
    error instanceof NotDevelopmentEnvError
  ) {
    return new AppError(error.message, 403);
  }

  if (
    error instanceof UnauthenticatedError ||
    error instanceof InvalidCredentialsError
  ) {
    return new AppError(error.message, 401);
  }

  if (
    error instanceof AlreadyParticipatingError ||
    error instanceof InvalidSessionIdError ||
    error instanceof InvalidUserIdError ||
    error instanceof InvalidTeacherIdError ||
    error instanceof AlreadyExistEmailError ||
    error instanceof ZodError
  ) {
    return new AppError(error.message, 400);
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error("Unknown Error");
}
