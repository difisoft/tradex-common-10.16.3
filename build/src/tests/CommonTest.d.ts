/// <reference types="rx-core-binding" />
import * as Kafka from './../modules/kafka';
import { Subject } from "rx";
declare interface IExpectedResult {
    txId?: string;
    errorType?: string;
    data?: Kafka.IMessage | string;
    subject?: Subject<IExpectedResult>;
}
interface ITestResult {
    testName: string;
    success: boolean;
    reason: string;
}
export declare const results: ITestResult[];
declare type Condition = (message: Kafka.IMessage) => boolean;
declare type Callback = (data: Kafka.IMessage) => void;
declare class ListenTopic {
    private conditions;
    private callbacks;
    private streamHandler;
    when(condition: Condition, callback: Callback): void;
    handler(data: any, streamHandler: Kafka.StreamHandler): void;
    close(): void;
}
declare abstract class CommonTest {
    protected testConfiguration: Kafka.IConf;
    protected request: Kafka.SendRequest;
    protected expectedResults: Map<string, IExpectedResult>;
    protected currentTransactionId: number;
    protected constructor(conf: Kafka.IConf);
    protected listenTopic(topic: string): ListenTopic;
    protected sendMessage(topic: string, uri: string, data: any, tx?: string): string;
    protected sendRequest(topic: string, uri: string, data: any, tx?: string): string;
    protected sendResponse(msgId: string, topic: string, uri: string, data: any, tx?: string): string;
    protected abstract run(): void;
    protected runTest(instance: any, func: (name: string, txId: string) => Subject<ITestResult>, timeOut: number): Subject<ITestResult>;
    protected getNewTxId(): string;
    protected createResult(name: string, expectedResult: IExpectedResult, result: IExpectedResult, compare: (expectedData: any, resultData: any) => string): ITestResult;
}
export { CommonTest, ListenTopic, Callback, Condition, ITestResult, IExpectedResult, };
