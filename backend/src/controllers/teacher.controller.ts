import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { TeacherResponseDto } from "../dto/teacher.dto";
import { serializeTeacher } from "../serializers/teacher.serializer";
import { TeacherService } from "../services/teacher.service";
import { UnauthenticatedError } from "../errors/unauthenticated.error";
import { InvalidTeacherIdError } from "../errors/invalid-teacher-id.error";

export class TeacherController {
  private teacherService = new TeacherService();

  async getAll(
    req: AuthRequest,
    res: Response,
  ): Promise<Response<TeacherResponseDto[]>> {
    if (req.userId === undefined) {
      throw new UnauthenticatedError();
    }

    const teachers = await this.teacherService.findAll();

    const formattedTeachers = teachers.map(serializeTeacher);

    return res.status(200).json(formattedTeachers);
  }

  async getById(
    req: AuthRequest,
    res: Response,
  ): Promise<Response<TeacherResponseDto>> {
    if (req.userId === undefined) {
      throw new UnauthenticatedError();
    }

    const { id } = req.params as { id: string };

    const teacherId = Number(id);
    if (!Number.isInteger(teacherId) || teacherId <= 0) {
      throw new InvalidTeacherIdError();
    }

    const teacher = await this.teacherService.findById(teacherId);

    return res.status(200).json(serializeTeacher(teacher));
  }
}
