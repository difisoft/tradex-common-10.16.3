/// <reference types="rx-core" />
/// <reference types="rx-lite" />
import Rx, { Observer } from 'rx';
declare function onError(observable: Observer<any>, err: any): void;
declare function onNext(observable: Observer<any>, data: any): void;
export { Rx, onNext, onError };
