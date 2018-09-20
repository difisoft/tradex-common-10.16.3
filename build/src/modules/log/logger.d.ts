import { Logger as LoggerW } from 'winston';
import { Logger as Logger4JS } from 'log4js';
declare class Logger {
    log: LoggerW;
    logger: Logger;
    log4JS: boolean;
    logger4js: Logger4JS;
    constructor();
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    create: (conf: any, log4JS?: boolean) => void;
    logError: (message: any, err: any) => void;
    getStackTrace: (err: any) => string;
}
declare const logger: Logger;
export { logger };
