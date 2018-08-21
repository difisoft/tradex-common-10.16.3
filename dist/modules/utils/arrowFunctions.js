"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doSafe = undefined;

var _SystemError = require("../errors/SystemError");

var _SystemError2 = _interopRequireDefault(_SystemError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doSafe = function doSafe(observable, func) {
  try {
    func();
  } catch (e) {
    observable.onError(new _SystemError2.default(e));
    observable.onCompleted();
  }
};

exports.doSafe = doSafe;