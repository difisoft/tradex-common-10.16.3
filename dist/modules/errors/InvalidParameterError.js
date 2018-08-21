"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GeneralError2 = require("./GeneralError");

var _GeneralError3 = _interopRequireDefault(_GeneralError2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InvalidParameterError = function (_GeneralError) {
  _inherits(InvalidParameterError, _GeneralError);

  function InvalidParameterError() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, InvalidParameterError);

    var _this = _possibleConstructorReturn(this, (InvalidParameterError.__proto__ || Object.getPrototypeOf(InvalidParameterError)).call(this, 'INVALID_PARAMETER', params));

    _initialiseProps.call(_this);

    return _this;
  }

  return InvalidParameterError;
}(_GeneralError3.default);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.add = function (code, fieldName, messageParams) {
    _this2.params.push({
      code: code,
      fieldName: fieldName,
      messageParams: messageParams
    });
    return _this2;
  };

  this.adds = function (params) {
    _this2.params = _this2.params.concat(params);
    return _this2;
  };
};

exports.default = InvalidParameterError;