type Resolve<T> = (data: T) => void;
type Reject = (err: Error) => void;
type PromiseFunction<T> = (resolve: Resolve<T>, reject: Reject) => void;

function promise<T>(func: PromiseFunction<T>): Promise<T> {
  const promise: any =  new Promise<T>((resolve: any, reject: any) => { // tslint:disable-line
    func(resolve, reject);
  });
  return promise;
}

function handlePromise<T>(func: (data: T) => void, reject: Reject, prom: Promise<T>) {
  prom.then((data: T) => {
    func(data);
  }).catch(reject);
}

class RetryError extends Error {
  constructor(public errors: Error[], message?: string) {
    super(message);
  }
}

async function asyncWithRetry<T>(func: () => Promise<T>, maxRetryTime: number): Promise<T> {
  if (maxRetryTime <= 0) {
    return func();
  }
  const errors: Error[] = [];
  for (let i = 0; i <= maxRetryTime; i++) {
    try {
      const result: T = await func(); // tslint:disable-line
      return result;
    } catch (e) {
      errors.push(e);
    }
  }
  throw new RetryError(errors, `fail to retry with ${maxRetryTime} times`);
}

export {
  promise,
  handlePromise,
  Resolve,
  Reject,
  PromiseFunction,
  RetryError,
  asyncWithRetry,
}