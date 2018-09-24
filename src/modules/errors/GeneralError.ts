import { IStatus } from '../models';

export default class GeneralError extends Error {
  public code: any;
  public messageParams: any;
  public source: any;
  public params: any;
  public isSystemError: boolean;

  constructor(code: any, params: any, source?: any, messageParams?: any) {
    super();
    this.code = code;
    this.messageParams = messageParams;
    this.source = source;
    this.params = params;
    this.isSystemError = true;
  }
}

function createFromStatus(status: IStatus): GeneralError {
  return new GeneralError(status.code, status.params, null, status.messageParams);
}

export {
  createFromStatus,
}