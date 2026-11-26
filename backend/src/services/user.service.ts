import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { UserNotFoundError } from "../errors/user-not-found.error";
import { UnauthorizedDeletionError } from "../errors/unauthorized-deletion.error";

export class UserService {
  private userRepository = new UserRepository();

  async findById(userId: number): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async delete(userId: number, id: number): Promise<void> {
    if (userId !== id) {
      throw new UnauthorizedDeletionError();
    }

    await this.findById(id);

    await this.userRepository.delete(id);

    return;
  }

  async promoteSelfToAdmin(userId: number): Promise<User> {
    const user = await this.findById(userId);

    if (user.admin) {
      return user;
    }

    return this.userRepository.promoteToAdmin(userId);
  }
}
