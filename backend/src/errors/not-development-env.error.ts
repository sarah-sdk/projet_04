export class NotDevelopmentEnvError extends Error {
  constructor() {
    super("Admin self-promotion is only available in development");

    this.name = "NotDevelopmentEnvError";
    Object.setPrototypeOf(this, NotDevelopmentEnvError.prototype);
  }
}
