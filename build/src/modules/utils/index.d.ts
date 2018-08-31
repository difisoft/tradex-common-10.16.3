/// <reference types="rx-core" />
/// <reference types="rx-lite" />
import { onError, onNext, transform, transformAsync, transformPromise } from './rx';
declare const _default: {
    validate: (fieldValue: any, fieldName: string) => import("./validation").Validate;
    doSafe: (observable: Rx.Observer<any>, func: any) => void;
    onError: typeof onError;
    onNext: typeof onNext;
    transform: typeof transform;
    transformAsync: typeof transformAsync;
    transformPromise: typeof transformPromise;
};
export default _default;
