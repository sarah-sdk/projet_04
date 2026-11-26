export class InvalidTeacherIdError extends Error {
  constructor() {
    super("Invalid teacher ID");

    this.name = "InvalidTeacherIdError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
