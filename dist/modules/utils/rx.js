'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onError = exports.onNext = exports.Rx = undefined;

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onError(observable, err) {
  observable.onError(err);
  observable.onCompleted();
}

function onNext(observable, data) {
  observable.onNext(data);
  observable.onCompleted();
}
exports.Rx = _rx2.default;
exports.onNext = onNext;
exports.onError = onError;