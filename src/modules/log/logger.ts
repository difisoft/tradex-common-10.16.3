import { createLogger as createLoggerW, format, Logger as LoggerW, transports } from 'winston';
import { configure, getLogger, Logger as Logger4JS } from 'log4js';

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
    // format.splat(),
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

const createLogger4JS = (conf: any) => {
  configure(conf);
  return getLogger('application');
}

class Logger {
  public log: LoggerW;
  public logger: Logger;
  public log4JS: boolean = false;
  public logger4js: Logger4JS;

  constructor() {
    this.logger = this;
  }

  public info(...args: any[]) {
    if (!this.log4JS) {
      if (this.log != null) {
        this.log.info.call(this.log, args.map((arg: any) => arg ? (typeof arg === 'string' ? arg : JSON.stringify(arg)) : 'null' ).join(','));
      }
    } else {
      if (this.logger4js != null) {
        this.logger4js.info.call(this.logger4js, ...args);
      }
    }
  }

  public warn(...args: any[]) {
    if (!this.log4JS) {
      if (this.log != null) {
        this.log.warn.call(this.log, ...args);
      }
    } else {
      if (this.logger4js != null) {
        this.logger4js.warn.call(this.logger4js, ...args);
      }
    }
  }

  public error(...args: any[]) {
    if (!this.log4JS) {
      if (this.log != null) {
        this.log.error.call(this.log, ...args);
      }
    } else {
      if (this.logger4js != null) {
        this.logger4js.error.call(this.logger4js, ...args);
      }
    }
  }

  public create = (conf: any, log4JS: boolean = false) => {
    this.log4JS = log4JS;
    if (!log4JS) {
      if (this.log == null) {
        this.log = createLogger(conf);
      }
    } else {
      if (this.logger4js == null) {
        this.logger4js = createLogger4JS(conf);
      }
    }
  };

  public logError = (message: any, err: any) => {
    if (!this.log4JS) {
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
    } else {
      if (!err) {
        this.logger4js.error({
          message: message.message,
          stackTrace: this.getStackTrace(message),
        });
      } else {
        this.logger4js.error({
          message: message,
          stackTrace: this.getStackTrace(err),
        });
      }
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