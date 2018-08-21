import Rx from 'rx';

function onError(observable, err) {
  observable.onError(err);
  observable.onCompleted();
}

function onNext(observable, data) {
  observable.onNext(data);
  observable.onCompleted();
}

export {
  Rx,
  onNext,
  onError
}