export default class GeneralError extends Error {
    constructor(code, params=undefined, source=undefined, messageParams=undefined) {
        super();
        this.code = code;
        this.messageParams = messageParams;
        this.source = source;
        this.params = params;
        this.isSystemError = true;
    }
}