export class NotAdminError extends Error {
  constructor() {
    super("Admin access required");
    this.name = "NotAdminError";
    Object.setPrototypeOf(this, NotAdminError.prototype);
  }
}
