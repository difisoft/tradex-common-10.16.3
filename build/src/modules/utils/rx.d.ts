/// <reference types="rx-core" />
/// <reference types="rx-lite" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import * as Rx from 'rx';
declare function onError(observer: Rx.Observer<any>, err: any): void;
declare function onNext<T>(observer: Rx.Observer<T>, data: T): void;
declare function transform<T, F>(observer: Rx.Observer<T>, observable: Rx.Observable<F>, func: (f: F) => T, errorHanler?: (err: Error) => void): void;
declare function transformAsync<T, F>(observer: Rx.Observer<T>, observable: Rx.Observable<F>, func: (f: F, observer: Rx.Observer<T>) => void, errorHanler?: (err: Error) => void): void;
export { Rx, onNext, onError, transform, transformAsync, };
