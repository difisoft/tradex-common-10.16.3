import { Logger as LoggerW } from 'winston';
declare class Logger {
    log: LoggerW;
    logger: Logger;
    constructor();
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    create: (conf: any) => void;
    logError: (message: any, err: any) => void;
    getStackTrace: (err: any) => string;
}
declare const logger: Logger;
export { logger };
