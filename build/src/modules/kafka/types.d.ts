/// <reference types="rx-core-binding" />
import Rx from "rx";
interface IConf {
    clientId: string;
    clusterId: string;
    kafkaUrls: string[];
}
declare enum MessageType {
    MESSAGE = "MESSAGE",
    REQUEST = "REQUEST",
    RESPONSE = "RESPONSE"
}
declare const SEND_MESSAGE_TYPE: {
    OBSERVABLE: number;
    PROMISE: number;
};
declare class PromiseState<T> {
    private rs;
    private rj;
    private prom;
    constructor();
    resolve(v: T): void;
    reject(err: Error): void;
    promise(): Promise<T>;
}
declare interface ISendMessage {
    topic: string;
    subject?: Rx.Subject<IMessage> | PromiseState<IMessage>;
    message: IMessage;
    highLatency?: boolean;
    timeout?: number;
    sendType?: number;
}
declare interface IResponseDestination {
    topic: string;
    uri: string;
}
declare interface IMessage {
    messageType: MessageType;
    sourceId?: string;
    messageId: string | number;
    transactionId: string | number;
    uri?: string;
    responseDestination?: IResponseDestination;
    data: any;
    stream?: boolean;
    streamState?: string;
    streamIndex?: number;
}
declare const STREAM_STATE: {
    NORMAL: string;
    FINSISH: string;
    ERROR: string;
};
export { IConf, MessageType, ISendMessage, IMessage, IResponseDestination, SEND_MESSAGE_TYPE, PromiseState, STREAM_STATE, };
