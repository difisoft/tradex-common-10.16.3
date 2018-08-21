import GeneralError from "./GeneralError";

export default class SystemError extends GeneralError {
    constructor(source=undefined) {
        super('INTERNAL_SERVER_ERROR', undefined, source);
    }
}