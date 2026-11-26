export class NotParticipatingError extends Error {
  constructor() {
    super("Participation not found");
    this.name = "NotParticipatingError";
    Object.setPrototypeOf(this, NotParticipatingError.prototype);
  }
}
