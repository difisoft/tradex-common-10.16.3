/// <reference types="rx-core" />
/// <reference types="rx-lite" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite-virtualtime" />
/// <reference types="rx-lite-testing" />
import { onError, onNext, Rx } from './rx';
declare const _default: {
    validate: (fieldValue: any, fieldName: any) => import("./validation").Validate;
    doSafe: (observable: Rx.Observer<any>, func: any) => void;
    onError: typeof onError;
    onNext: typeof onNext;
    Rx: typeof Rx;
};
export default _default;
