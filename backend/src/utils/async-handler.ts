import { NextFunction, RequestHandler, Request, Response } from "express";
import { mapError } from "./error-mapper";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

export function asyncHandler(controller: AsyncController): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(controller(req, res, next)).catch((error: unknown) => {
      next(mapError(error));
    });
  };
}
