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
//# sourceMappingURL=GeneralError.js.map