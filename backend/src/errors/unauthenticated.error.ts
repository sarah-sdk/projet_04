export class UnauthenticatedError extends Error {
  constructor() {
    super("User not authenticated");

    this.name = "UnauthenticatedError";
    Object.setPrototypeOf(this, UnauthenticatedError.prototype);
  }
}
