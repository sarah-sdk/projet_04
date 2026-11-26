export class TeacherNotFoundError extends Error {
  constructor() {
    super("Teacher not found");
    this.name = "TeacherNotFoundError";
    Object.setPrototypeOf(this, TeacherNotFoundError.prototype);
  }
}
