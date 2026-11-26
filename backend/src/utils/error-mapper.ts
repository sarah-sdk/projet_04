import { AlreadyParticipatingError } from "../errors/already-participating.error";
import { NotAdminError } from "../errors/not-admin.error";
import { NotParticipatingError } from "../errors/not-participating.error";
import { SessionNotFoundError } from "../errors/session-not-found.error";
import { TeacherNotFoundError } from "../errors/teacher-not-found.error";
import { UserNotFoundError } from "../errors/user-not-found.error";
import { AppError } from "./app-error";

export function mapError(error: unknown): Error {
  if (
    error instanceof SessionNotFoundError ||
    error instanceof UserNotFoundError ||
    error instanceof TeacherNotFoundError ||
    error instanceof NotParticipatingError
  ) {
    return new AppError(error.message, 404);
  }

  if (error instanceof NotAdminError) {
    return new AppError(error.message, 403);
  }

  if (error instanceof AlreadyParticipatingError) {
    return new AppError(error.message, 400);
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error("Unknown Error");
}
