import { Teacher } from "@prisma/client";
import { TeacherRepository } from "../repositories/teacher.repository";
import { TeacherNotFoundError } from "../errors/teacher-not-found.error";

export class TeacherService {
  private teacherRepository = new TeacherRepository();

  async findById(teacherId: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findById(teacherId);

    if (!teacher) {
      throw new TeacherNotFoundError();
    }

    return teacher;
  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherRepository.findAll();
  }
}
