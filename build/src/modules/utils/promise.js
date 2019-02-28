"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function promise(func) {
    const promise = new Promise((resolve, reject) => {
        func(resolve, reject);
    });
    return promise;
}
exports.promise = promise;
function handlePromise(func, reject, prom) {
    prom.then((data) => {
        func(data);
    }).catch(reject);
}
exports.handlePromise = handlePromise;
class RetryError extends Error {
    constructor(errors, message) {
        super(message);
        this.errors = errors;
    }
}
exports.RetryError = RetryError;
function asyncWithRetry(func, maxRetryTime) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (maxRetryTime <= 0) {
            return func();
        }
        const errors = [];
        for (let i = 0; i <= maxRetryTime; i++) {
            try {
                const result = yield func();
                return result;
            }
            catch (e) {
                errors.push(e);
            }
        }
        throw new RetryError(errors, `fail to retry with ${maxRetryTime} times`);
    });
}
exports.asyncWithRetry = asyncWithRetry;
//# sourceMappingURL=promise.js.map