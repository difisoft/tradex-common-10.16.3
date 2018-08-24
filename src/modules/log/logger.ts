import { format, transports, createLogger as createLoggerW, Logger as LoggerW } from 'winston';

const LOG_FORMAT = {
  JSON: (conf: any) => format.combine(
    format.label({service: conf.serviceName}),
    format.timestamp(),
    format.splat(),
    format.json(),
  ),
  FLAT: (conf: any) => format.combine(
    format.label({service: conf.serviceName}),
    format.timestamp(),
    format.splat(),
    format.simple(),
  ),
};

const createTransports = (conf: any) => {
  if (!conf.transports || conf.transports.length === 0) {
    return [new transports.Console({level: 'info'})];
  }
  const transport = [];
  for (let i = 0; i < conf.transports.length; i++) {
    if (conf.transports.type === 'console') {
      transport.push(new transports.Console(conf.transports[i].data));
    } else if (conf.transports.type === 'file') {
      transport.push(new transports.File(conf.transports[i].data));
    }
  }
  return transport;
};

const createLogger = (conf: any) => {
  return createLoggerW({
    level: conf.level,
    format: LOG_FORMAT[conf.format](conf),
    transports: createTransports(conf)
  });
};

class Logger {
  public log: LoggerW;
  public logger: Logger;

  constructor() {
    this.logger = this;
  }

  public info(...args: any[]) {
    if (this.log != null) {
      this.log.info.call(this.log, ...args);
    }
  }

  public warn(...args: any[]) {
    if (this.log != null) {
      this.log.warn.call(this.log, ...args);
    }
  }

  public error(...args: any[]) {
    if (this.log != null) {
      this.log.error.call(this.log, ...args);
    }
  }

  public create = (conf: any) => {
    if (this.log == null) {
      this.log = createLogger(conf);
    }
  };
  
  public logError = (message: any, err: any) => {
    if (!err) {  
      this.log.error({
        message: message.message,
        stackTrace: this.getStackTrace(message),
      });
    } else {
      this.log.error({
        message: message,
        stackTrace: this.getStackTrace(err),
      });
    }
  };
  
  /**
   * get first 3 lines
   * then get the
   * @type {{for: Error}}
   */
  public getStackTrace = (err: any) => {
    if (!err.stack) {
      return '';
    }
    let result = '';
    for (let i = 0; i < 10 || i < err.stack.length; i++) {
      result += err.stack[i];
    }
    return result;
  };
}

const logger: Logger = new Logger();

export { logger };