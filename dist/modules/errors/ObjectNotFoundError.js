"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OBJECT_NOT_FOUND_ERROR_CODE = undefined;

var _GeneralError2 = require("./GeneralError");

var _GeneralError3 = _interopRequireDefault(_GeneralError2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OBJECT_NOT_FOUND_ERROR_CODE = exports.OBJECT_NOT_FOUND_ERROR_CODE = 'OBJECT_NOT_FOUND';

var ObjectNotFoundError = function (_GeneralError) {
  _inherits(ObjectNotFoundError, _GeneralError);

  function ObjectNotFoundError() {
    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    _classCallCheck(this, ObjectNotFoundError);

    return _possibleConstructorReturn(this, (ObjectNotFoundError.__proto__ || Object.getPrototypeOf(ObjectNotFoundError)).call(this, OBJECT_NOT_FOUND_ERROR_CODE, undefined, source));
  }

  return ObjectNotFoundError;
}(_GeneralError3.default);

exports.default = ObjectNotFoundError;