import * as Rx from 'rx';

function onError(observer: Rx.Observer<any>, err: any) {
  observer.onError(err);
  observer.onCompleted();
}

function onNext<T>(observer: Rx.Observer<T>, data: T) {
  observer.onNext(data);
  observer.onCompleted();
}

function transform<T, F>(observer: Rx.Observer<T>, observable: Rx.Observable<F>
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

function transformAsync<T, F>(observer: Rx.Observer<T>, observable: Rx.Observable<F>
                         , func: (f: F, observer: Rx.Observer<T>) => void, errorHanler?: (err: Error) => void): void {
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
  Rx,
  onNext,
  onError,
  transform,
  transformAsync,
}