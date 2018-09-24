import { IStatus } from '../models';
export default class GeneralError extends Error {
    code: any;
    messageParams: any;
    source: any;
    params: any;
    isSystemError: boolean;
    constructor(code: any, params: any, source?: any, messageParams?: any);
}
declare function createFromStatus(status: IStatus): GeneralError;
export { createFromStatus, };
