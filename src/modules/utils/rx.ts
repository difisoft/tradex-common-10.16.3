import Rx, { Observer } from 'rx';

function onError(observable: Observer<any>, err: any) {
  observable.onError(err);
  observable.onCompleted();
}

function onNext(observable: Observer<any>, data: any) {
  observable.onNext(data);
  observable.onCompleted();
}

export {
  Rx,
  onNext,
  onError
}