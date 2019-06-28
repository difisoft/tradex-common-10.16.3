/// <reference types="node" />
import { IConf } from "./types";
interface IKafkaMessage {
    value: Buffer;
    size: number;
    topic: string;
    offset: number;
    partition: number;
    key: string;
    timestamp: number;
}
declare class StreamHandler {
    private hasError;
    private stream;
    constructor(conf: IConf, options: any, topics: string[], dataHandler: (data: IKafkaMessage, handler: StreamHandler) => void, topicConf?: any, readyCallback?: () => void);
    close(): void;
}
declare function createBroadcastListener(conf: IConf, options: any, topics: string[], dataHandler: (data: IKafkaMessage, handler: StreamHandler) => void, topicConf?: any): StreamHandler;
export { StreamHandler, IKafkaMessage, createBroadcastListener };
