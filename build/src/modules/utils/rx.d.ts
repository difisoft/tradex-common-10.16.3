/// <reference types="rx-core" />
/// <reference types="rx-lite" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import { Observer, Observable } from 'rx';
declare function onError(observer: Observer<any>, err: any): void;
declare function onNext<T>(observer: Observer<T>, data: T): void;
declare function transform<T, F>(observer: Observer<T>, observable: Observable<F>, func: (f: F) => T, errorHanler?: (err: Error) => void): void;
declare function transformPromise<T, F>(observer: Observer<T>, promise: Promise<F>, func: (f: F) => T, errorHandler?: (err: Error) => void): void;
declare function transformAsync<T, F>(observer: Observer<T>, observable: Observable<F>, func: (f: F, observer: Observer<T>) => void, errorHanler?: (err: Error) => void): void;
export { onNext, onError, transform, transformAsync, transformPromise, };
