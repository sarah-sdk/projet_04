export class InvalidUserIdError extends Error {
  constructor() {
    super("Invalid user ID");

    this.name = "InvalidUserIdError";
    Object.setPrototypeOf(this, InvalidUserIdError.prototype);
  }
}
