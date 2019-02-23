/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import { IConf, IMessage, ISendMessage, MessageType, PromiseState } from "./types";
import Rx = require('rx');
declare class SendRequestCommon {
    protected conf: IConf;
    protected handleSendError?: (e: Error) => boolean;
    protected messageId: number;
    protected producer: any;
    protected highLatencyProducer: any;
    protected readonly responseTopic: string;
    protected bufferedMessages: ISendMessage[];
    protected highLatencyBufferedMessages: ISendMessage[];
    protected isReady: boolean;
    protected isHighLatencyReady: boolean;
    constructor(conf: IConf, handleSendError?: (e: Error) => boolean, producerOptions?: any, topicOptions?: any);
    getResponseTopic(): string;
    sendMessage(transactionId: string, topic: string, uri: string, data: any, highLatency?: boolean): void;
    sendForwardMessage(originMessage: any, newTopic: string, newUri: string): void;
    sendResponse(transactionId: string | number, messageId: string | number, topic: string, uri: string, data: any): void;
    protected timeout(message: ISendMessage): void;
    protected doReallySendMessage(message: ISendMessage): void;
    protected reallySendMessage: (message: ISendMessage) => void;
    protected getMessageId(): number;
    protected createMessage(transactionId: string | number, topic: string, uri: string, data: any, messageType?: MessageType, responseTopic?: string, responseUri?: string, messageId?: string | number): ISendMessage;
}
declare class SendRequest extends SendRequestCommon {
    private requestedMessages;
    constructor(conf: IConf, consumerOptions: any, initListener?: boolean, topicConf?: any, handleSendError?: (e: Error) => boolean, producerOptions?: any);
    sendRequestAsync(transactionId: string, topic: string, uri: string, data: any, timeout?: number): Promise<IMessage>;
    sendRequest(transactionId: string, topic: string, uri: string, data: any, timeout?: number): Rx.Observable<IMessage>;
    sendRequestBase(transactionId: string, topic: string, uri: string, data: any, subject: Rx.Subject<IMessage> | PromiseState<IMessage>, sendType?: number, timeout?: number): void;
    protected reallySendMessage: (message: ISendMessage) => void;
    protected timeout(message: ISendMessage): void;
    private respondData;
    private respondError;
    private handlerResponse;
}
declare function create(conf: IConf, consumerOptions: any, initResponseListener?: boolean, topicConf?: any, producerOptions?: any): void;
declare function getInstance(): SendRequest;
export { SendRequest, SendRequestCommon, create, getInstance };
