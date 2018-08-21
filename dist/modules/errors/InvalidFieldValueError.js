"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _InvalidParameterError = require("./InvalidParameterError");

var _InvalidParameterError2 = _interopRequireDefault(_InvalidParameterError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InvalidFieldValueError = function (_InvalidParameterErro) {
  _inherits(InvalidFieldValueError, _InvalidParameterErro);

  function InvalidFieldValueError(fieldName, fieldValue) {
    _classCallCheck(this, InvalidFieldValueError);

    return _possibleConstructorReturn(this, (InvalidFieldValueError.__proto__ || Object.getPrototypeOf(InvalidFieldValueError)).call(this, [{
      code: 'INVALID_FIELD_VALUE',
      params: fieldName,
      messageParams: [fieldName, fieldValue]
    }]));
  }

  return InvalidFieldValueError;
}(_InvalidParameterError2.default);

exports.default = InvalidFieldValueError;