import { Logger as LoggerW } from 'winston';
declare class Logger {
    logger: LoggerW;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    create: (conf: any) => void;
    logError: (message: any, err: any) => void;
    getStackTrace: (err: any) => string;
}
declare const logger: Logger;
export { logger };
