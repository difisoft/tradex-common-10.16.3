import winston from 'winston';

const LOG_FORMAT = {
  JSON: (conf) => winston.format.combine(
    winston.format.label({service: conf.serviceName}),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.json(),
  ),
  FLAT: (conf) => winston.format.combine(
    winston.format.label({service: conf.serviceName}),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.simple(),
  ),
};

const createTransports = (conf) => {
  if (!conf.transports || conf.transports.length === 0) {
    return [new winston.transports.Console({level: 'info'})];
  }
  const transport = [];
  for (let i = 0; i < conf.transports.length; i++) {
    if (conf.transports.type === 'console') {
      transport.push(new winston.transports.Console(conf.transports[i].data));
    } else if (conf.transports.type === 'file') {
      transport.push(new winston.transports.File(conf.transports[i].data));
    }
  }
  return transport;
};

const createLogger = (conf) => {
  return winston.createLogger({
    level: conf.level,
    format: LOG_FORMAT[conf.format](conf),
    transports: createTransports(conf)
  });
};

let logger = undefined;
const create = (conf) => {
  if (!logger) {
    logger = createLogger(conf);
  }
  return logger;
};

const logError = (message, err) => {
  if (!err) {
    err = message;
    message = err.message;
  }
  logger.error({
    message: message,
    stackTrace: getStackTrace(err),
  });
};

/**
 * get first 3 lines
 * then get the
 * @type {{for: Error}}
 */
const getStackTrace = (err) => {
  if (!err.stack) {
    return '';
  }
  let result = '';
  for (let i = 0; i < 10 || i < err.stack.length; i++) {
    result += err.stack[i];
  }
  return result;
};

export {
  create,
  logger,
  logError,
}