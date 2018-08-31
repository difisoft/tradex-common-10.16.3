"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function onError(observer, err) {
    observer.onError(err);
    observer.onCompleted();
}
exports.onError = onError;
function onNext(observer, data) {
    observer.onNext(data);
    observer.onCompleted();
}
exports.onNext = onNext;
function transform(observer, observable, func, errorHanler) {
    observable.subscribe((data) => {
        try {
            observer.onNext(func(data));
        }
        catch (e) {
            onError(observer, e);
        }
    }, (err) => errorHanler ? errorHanler(err) : observer.onError(err), () => observer.onCompleted());
}
exports.transform = transform;
function transformPromise(observer, promise, func, errorHandler) {
    promise.then((f) => {
        observer.onNext(func(f));
        observer.onCompleted();
    }).catch((err) => {
        observer.onError(err);
        observer.onCompleted();
    });
}
exports.transformPromise = transformPromise;
function transformAsync(observer, observable, func, errorHanler) {
    observable.subscribe((data) => {
        try {
            func(data, observer);
        }
        catch (e) {
            onError(observer, e);
        }
    }, (err) => errorHanler ? errorHanler(err) : observer.onError(err), () => observer.onCompleted());
}
exports.transformAsync = transformAsync;
//# sourceMappingURL=rx.js.map