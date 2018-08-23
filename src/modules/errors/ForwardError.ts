export class ForwardError extends Error {
  public status: any;
  public isForwardError: boolean;

  constructor(status: any) {
    super();
    this.status = status;
    this.isForwardError = true;
  }
}