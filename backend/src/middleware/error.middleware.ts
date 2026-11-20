import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export const errorMiddleware: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
};
