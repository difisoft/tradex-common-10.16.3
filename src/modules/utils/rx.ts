import {Observer, Observable} from 'rx';

function onError(observer: Observer<any>, err: any) {
  observer.onError(err);
  observer.onCompleted();
}

function onNext<T>(observer: Observer<T>, data: T) {
  observer.onNext(data);
  observer.onCompleted();
}

function transform<T, F>(observer: Observer<T>, observable: Observable<F>
                         , func: (f: F) => T, errorHanler?: (err: Error) => void): void {
  observable.subscribe(
    (data: F) => {
      try {
        observer.onNext(func(data));
      } catch (e) {
        onError(observer, e);
      }},
    (err: Error) => errorHanler ? errorHanler(err) : observer.onError(err),
    () => observer.onCompleted()
  );
}

function transformPromise<T, F>(observer: Observer<T>, promise: Promise<F>
                         , func: (f: F) => T, errorHandler?: (err: Error) => void): void {
  promise.then((f: F) => {
    observer.onNext(func(f));
    observer.onCompleted();
  }). catch((err: Error) => {
    observer.onError(err);
    observer.onCompleted();
  });
}

function transformAsync<T, F>(observer: Observer<T>, observable: Observable<F>
                         , func: (f: F, observer: Observer<T>) => void, errorHanler?: (err: Error) => void): void {
  observable.subscribe(
    (data: F) => {
      try {
        func(data, observer);
      } catch (e) {
        onError(observer, e);
      }},
    (err: Error) => errorHanler ? errorHanler(err) : observer.onError(err),
    () => observer.onCompleted()
  );
}

export {
  onNext,
  onError,
  transform,
  transformAsync,
  transformPromise,
}