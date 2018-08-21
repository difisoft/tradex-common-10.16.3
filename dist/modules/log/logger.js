'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logError = exports.logger = exports.create = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOG_FORMAT = {
  JSON: function JSON(conf) {
    return _winston2.default.format.combine(_winston2.default.format.label({ service: conf.serviceName }), _winston2.default.format.timestamp(), _winston2.default.format.splat(), _winston2.default.format.json());
  },
  FLAT: function FLAT(conf) {
    return _winston2.default.format.combine(_winston2.default.format.label({ service: conf.serviceName }), _winston2.default.format.timestamp(), _winston2.default.format.splat(), _winston2.default.format.simple());
  }
};

var createTransports = function createTransports(conf) {
  if (!conf.transports || conf.transports.length === 0) {
    return [new _winston2.default.transports.Console({ level: 'info' })];
  }
  var transport = [];
  for (var i = 0; i < conf.transports.length; i++) {
    if (conf.transports.type === 'console') {
      transport.push(new _winston2.default.transports.Console(conf.transports[i].data));
    } else if (conf.transports.type === 'file') {
      transport.push(new _winston2.default.transports.File(conf.transports[i].data));
    }
  }
  return transport;
};

var createLogger = function createLogger(conf) {
  return _winston2.default.createLogger({
    level: conf.level,
    format: LOG_FORMAT[conf.format](conf),
    transports: createTransports(conf)
  });
};

var logger = undefined;
var create = function create(conf) {
  if (!logger) {
    exports.logger = logger = createLogger(conf);
  }
  return logger;
};

var logError = function logError(message, err) {
  if (!err) {
    err = message;
    message = err.message;
  }
  logger.error({
    message: message,
    stackTrace: getStackTrace(err)
  });
};

/**
 * get first 3 lines
 * then get the
 * @type {{for: Error}}
 */
var getStackTrace = function getStackTrace(err) {
  if (!err.stack) {
    return '';
  }
  var result = '';
  for (var i = 0; i < 10 || i < err.stack.length; i++) {
    result += err.stack[i];
  }
  return result;
};

exports.create = create;
exports.logger = logger;
exports.logError = logError;