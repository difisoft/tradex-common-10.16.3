"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.Validate = undefined;

var _FieldRequiredError = require("../errors/FieldRequiredError");

var _FieldRequiredError2 = _interopRequireDefault(_FieldRequiredError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validate = exports.Validate = function Validate(fieldValue, fieldName) {
  var _this = this;

  _classCallCheck(this, Validate);

  this.require = function () {
    _this.isRequired = true;
    return _this;
  };

  this.add = function (func) {
    _this.checks.push(func);
    return _this;
  };

  this.adds = function (funcs) {
    _this.checks = _this.checks.concat(funcs);
    return _this;
  };

  this.throwValid = function () {
    var invalidParameterError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    var result = _this.valid();
    if (result) {
      if (invalidParameterError) {
        invalidParameterError.adds(result.params);
      } else {
        throw result;
      }
    }
  };

  this.valid = function () {
    if (_this.isRequired) {
      if (isEmpty(_this.fieldValue)) {
        return new _FieldRequiredError2.default(_this.fieldName);
      }
    }
    if (_this.checks.length > 0) {
      if (!_this.isRequired && isEmpty(_this.fieldValue)) {
        for (var i = 0; i < _this.checks.length; i++) {
          var result = _this.checks[i](_this.fieldValue, _this.fieldName);
          if (result) {
            return result;
          }
        }
      }
    }
    return null;
  };

  this.fieldName = fieldName;
  this.fieldValue = fieldValue;
  this.isRequired = false;
  this.checks = [];
};

var validate = function validate(fieldValue, fieldName) {
  return new Validate(fieldValue, fieldName);
};

var isEmpty = function isEmpty(fieldValue) {
  return fieldValue === undefined || fieldValue === null || fieldValue === '';
};

exports.validate = validate;