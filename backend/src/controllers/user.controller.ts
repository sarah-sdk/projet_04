import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { UserResponseDto } from "../dto/user.dto";
import { UnauthenticatedError } from "../errors/unauthenticated.error";
import { InvalidUserIdError } from "../errors/invalid-user-id.error";
import { UserService } from "../services/user.service";
import { serializeUser } from "../serializers/user.serializer";
import { NotDevelopmentEnvError } from "../errors/not-development-env.error";

export class UserController {
  private userService = new UserService();

  async getById(
    req: AuthRequest,
    res: Response,
  ): Promise<Response<UserResponseDto>> {
    if (req.userId === undefined) {
      throw new UnauthenticatedError();
    }

    const { id } = req.params as { id: string };

    const userId = Number(id);
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new InvalidUserIdError();
    }

    const user = await this.userService.findById(userId);

    return res.status(200).json(serializeUser(user));
  }

  async delete(req: AuthRequest, res: Response): Promise<Response> {
    if (req.userId === undefined) {
      throw new UnauthenticatedError();
    }

    const { id } = req.params as { id: string };

    const userId = Number(id);
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new InvalidUserIdError();
    }

    await this.userService.delete(req.userId, userId);

    return res.status(200).json({ message: "User deleted successfully" });
  }

  async promoteSelfToAdmin(req: AuthRequest, res: Response) {
    const isDev = (process.env.NODE_ENV || "development") === "development";
    if (!isDev) {
      throw new NotDevelopmentEnvError();
    }

    if (req.userId === undefined) {
      throw new UnauthenticatedError();
    }

    const updatedUser = await this.userService.promoteSelfToAdmin(req.userId);

    return res.status(200).json(serializeUser(updatedUser));
  }
}
