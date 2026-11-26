import { AuthResponseDto, LoginDto, RegisterDto } from "../dto/auth.dto";
import { UserRepository } from "../repositories/user.repository";
import { compare, hash } from "bcrypt";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error";
import { generateToken } from "../utils/jwt.util";
import { serializeAuth } from "../serializers/auth.serializer";
import { AlreadyExistEmailError } from "../errors/already-exist-email.error";

export class AuthService {
  private userRepository = new UserRepository();

  async login(loginData: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const token = generateToken(user.id);

    return serializeAuth(user, token);
  }

  async register(registerData: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.userRepository.findByEmail(
      registerData.email,
    );

    if (existingUser) {
      throw new AlreadyExistEmailError();
    }

    const hashedPassword = await hash(registerData.password, 10);

    const user = await this.userRepository.create({
      email: registerData.email,
      password: hashedPassword,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      admin: false,
    });

    const token = generateToken(user.id);

    return serializeAuth(user, token);
  }
}
