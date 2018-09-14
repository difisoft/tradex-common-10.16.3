/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import { IConf, IMessage, ISendMessage, MessageType } from './types';
import Rx = require("rx");
declare class SendRequestCommon {
    protected conf: IConf;
    protected messageId: number;
    protected producer: any;
    protected readonly responseTopic: string;
    protected bufferedMessages: ISendMessage[];
    protected isReady: boolean;
    constructor(conf: IConf);
    getResponseTopic(): string;
    sendMessage(transactionId: string, topic: string, uri: string, data: any): void;
    sendForwardMessage(originMessage: any, newTopic: string, newUri: string): void;
    sendResponse(transactionId: string | number, messageId: string | number, topic: string, uri: string, data: any): void;
    protected doReallySendMessage(message: ISendMessage): void;
    protected reallySendMessage: (message: ISendMessage) => void;
    protected getMessageId(): number;
    protected createMessage(transactionId: string | number, topic: string, uri: string, data: any, messageType?: MessageType, responseTopic?: string, responseUri?: string, messageId?: string | number): ISendMessage;
}
declare class SendRequest extends SendRequestCommon {
    private requestedMessages;
    constructor(conf: IConf, consumerOptions: any, initListener?: boolean, topicConf?: any);
    sendRequest(transactionId: string, topic: string, uri: string, data: any): Rx.Observable<IMessage>;
    protected reallySendMessage: (message: ISendMessage) => void;
    private handlerResponse;
}
declare function create(conf: IConf, consumerOptions: any, initResponseListener?: boolean): void;
declare function getInstance(): SendRequest;
export { SendRequest, SendRequestCommon, create, getInstance, };
