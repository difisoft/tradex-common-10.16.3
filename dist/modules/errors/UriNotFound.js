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

var UriNotFound = function (_GeneralError) {
  _inherits(UriNotFound, _GeneralError);

  function UriNotFound() {
    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    _classCallCheck(this, UriNotFound);

    return _possibleConstructorReturn(this, (UriNotFound.__proto__ || Object.getPrototypeOf(UriNotFound)).call(this, 'URI_NOT_FOUND', undefined, source));
  }

  return UriNotFound;
}(_GeneralError3.default);

exports.default = UriNotFound;