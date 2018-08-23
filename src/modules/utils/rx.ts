import * as Rx from 'rx';

function onError(observable: Rx.Observer<any>, err: any) {
  observable.onError(err);
  observable.onCompleted();
}

function onNext(observable: Rx.Observer<any>, data: any) {
  observable.onNext(data);
  observable.onCompleted();
}

export {
  Rx,
  onNext,
  onError
}