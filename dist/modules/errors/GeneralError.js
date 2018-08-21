"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralError = function (_Error) {
  _inherits(GeneralError, _Error);

  function GeneralError(code) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var messageParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    _classCallCheck(this, GeneralError);

    var _this = _possibleConstructorReturn(this, (GeneralError.__proto__ || Object.getPrototypeOf(GeneralError)).call(this));

    _this.code = code;
    _this.messageParams = messageParams;
    _this.source = source;
    _this.params = params;
    _this.isSystemError = true;
    return _this;
  }

  return GeneralError;
}(Error);

exports.default = GeneralError;