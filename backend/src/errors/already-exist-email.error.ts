export class AlreadyExistEmailError extends Error {
  constructor() {
    super("Email already exists");
    this.name = "AlreadyExistEmailError";
    Object.setPrototypeOf(this, AlreadyExistEmailError.prototype);
  }
}
