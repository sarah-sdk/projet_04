export class AlreadyParticipatingError extends Error {
  constructor() {
    super("User already participating in this session");
    this.name = "AlreadyParticipatingError";
    Object.setPrototypeOf(this, AlreadyParticipatingError.prototype);
  }
}
