/// <reference types="rx-core" />
/// <reference types="rx-lite" />
import * as Rx from 'rx';
declare function onError(observable: Rx.Observer<any>, err: any): void;
declare function onNext(observable: Rx.Observer<any>, data: any): void;
export { Rx, onNext, onError };
