import { Request, Response } from "express";
import { AuthResponseDto, LoginSchema, RegisterSchema } from "../dto/auth.dto";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response): Promise<Response<AuthResponseDto>> {
    const data = LoginSchema.parse(req.body);

    const response = await this.authService.login(data);

    return res.status(200).json(response);
  }

  async register(
    req: Request,
    res: Response,
  ): Promise<Response<AuthResponseDto>> {
    const data = RegisterSchema.parse(req.body);

    const response = await this.authService.register(data);

    return res.status(201).json(response);
  }
}
