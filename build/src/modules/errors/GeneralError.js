"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneralError extends Error {
    constructor(code, params, source, messageParams) {
        super();
        this.code = code;
        this.messageParams = messageParams;
        this.source = source;
        this.params = params;
        this.isSystemError = true;
    }
}
exports.default = GeneralError;
function createFromStatus(status) {
    return new GeneralError(status.code, status.params, null, status.messageParams);
}
exports.createFromStatus = createFromStatus;
//# sourceMappingURL=GeneralError.js.map