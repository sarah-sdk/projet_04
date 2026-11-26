export class InvalidSessionIdError extends Error {
  constructor() {
    super("Invalid session ID");

    this.name = "InvalidSessionIdError";
    Object.setPrototypeOf(this, InvalidSessionIdError.prototype);
  }
}
