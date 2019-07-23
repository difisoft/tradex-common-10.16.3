"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeoutError extends Error {
    constructor() {
        super();
        this.isTimeoutError = true;
    }
}
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=TimeoutError.js.map