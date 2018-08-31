/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import { Observable } from "rx";
import { IMessage } from "./types";
declare type HandleResult = Observable<any> | boolean;
declare type Handle = (msg: IMessage) => HandleResult;
declare class MessageHandler {
    constructor();
    handle(message: any, func: Handle): void;
    getErrorMessage(error: Error): any;
}
export { HandleResult, Handle, MessageHandler, };
