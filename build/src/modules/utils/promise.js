"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=promise.js.map