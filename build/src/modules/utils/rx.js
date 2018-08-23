"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_1 = require("rx");
exports.Rx = rx_1.default;
function onError(observable, err) {
    observable.onError(err);
    observable.onCompleted();
}
exports.onError = onError;
function onNext(observable, data) {
    observable.onNext(data);
    observable.onCompleted();
}
exports.onNext = onNext;
//# sourceMappingURL=rx.js.map