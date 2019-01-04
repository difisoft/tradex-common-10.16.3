declare type Resolve<T> = (data: T) => void;
declare type Reject = (err: Error) => void;
declare type PromiseFunction<T> = (resolve: Resolve<T>, reject: Reject) => void;
declare function promise<T>(func: PromiseFunction<T>): Promise<T>;
declare function handlePromise<T>(func: (data: T) => void, reject: Reject, prom: Promise<T>): void;
export { promise, handlePromise, Resolve, Reject, PromiseFunction, };
