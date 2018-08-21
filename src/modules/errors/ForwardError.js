export class ForwardError extends Error {
  constructor(status) {
    super();
    this.status = status;
    this.isForwardError = true;
  }
}