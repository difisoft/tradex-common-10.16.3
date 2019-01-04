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

export {
  promise,
  handlePromise,
  Resolve,
  Reject,
  PromiseFunction,
}