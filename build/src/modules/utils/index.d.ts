/// <reference types="rx-core" />
/// <reference types="rx-lite" />
import { onError, onNext, transform, transformAsync, transformPromise, transformSingle, transformSingleAsync, transformSinglePromise } from './rx';
import { createFailFromError, createFailValidation, createSuccessValidation, validate, Validate, validateEmail, validatePassword } from './validation';
declare const _default: {
    validate: typeof validate;
    validateEmail: typeof validateEmail;
    doSafe: (observable: Rx.Observer<any>, func: any) => void;
    onError: typeof onError;
    onNext: typeof onNext;
    transform: typeof transform;
    transformAsync: typeof transformAsync;
    transformPromise: typeof transformPromise;
    singleton: import("./Singleton").Singleton;
    transformSingle: typeof transformSingle;
    transformSingleAsync: typeof transformSingleAsync;
    transformSinglePromise: typeof transformSinglePromise;
    createFailFromError: typeof createFailFromError;
    createFailValidation: typeof createFailValidation;
    createSuccessValidation: typeof createSuccessValidation;
    Validate: typeof Validate;
    formatDateToDisplay: (date: Date, format?: string) => string;
    convertStringToDate: (data: string, format?: string) => Date;
    validatePassword: typeof validatePassword;
};
export default _default;
