declare type Resolve<T> = (data: T) => void;
declare type Reject = (err: Error) => void;
declare type PromiseFunction<T> = (resolve: Resolve<T>, reject: Reject) => void;
declare function promise<T>(func: PromiseFunction<T>): Promise<T>;
declare function handlePromise<T>(func: (data: T) => void, reject: Reject, prom: Promise<T>): void;
declare class RetryError extends Error {
    errors: Error[];
    constructor(errors: Error[], message?: string);
}
declare function asyncWithRetry<T>(func: () => Promise<T>, maxRetryTime: number): Promise<T>;
export { promise, handlePromise, Resolve, Reject, PromiseFunction, RetryError, asyncWithRetry, };
