export class UnauthorizedDeletionError extends Error {
  constructor() {
    super("You can only delete your own account");
    this.name = "UnauthorizedDeletionError";
    Object.setPrototypeOf(this, UnauthorizedDeletionError.prototype);
  }
}
