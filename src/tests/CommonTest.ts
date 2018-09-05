import * as Kafka from './../modules/kafka';
import Utils from './../modules/utils';
import { Subject } from "rx";

declare interface IExpectedResult {
  txId?: string,
  errorType?: string,
  data?: Kafka.IMessage | string,
  subject?: Subject<IExpectedResult>,
}

interface ITestResult {
  testName: string
  success: boolean,
  reason: string,
}

export const results: ITestResult[] = [];

declare type Condition = (message: Kafka.IMessage) => boolean;
declare type Callback = (data: Kafka.IMessage) => void;

class ListenTopic {
  private conditions: Condition[] = [];
  private callbacks: Callback[] = [];
  private streamHandler: Kafka.StreamHandler;

  public when(condition: Condition, callback: Callback): void {
    this.conditions.push(condition);
    this.callbacks.push(callback);
  }

  public handler(data: any, streamHandler: Kafka.StreamHandler): void {
    this.streamHandler = streamHandler;
    const msg: string = data.value.toString();
    const message: Kafka.IMessage = JSON.parse(msg);
    for (let i: number = 0; i < this.conditions.length; i++) {
      if (this.conditions[i](message)) {
        this.callbacks[i](message);
      }
    }
  }

  public close() {
    this.streamHandler.close();
  }
}

abstract class CommonTest {
  protected testConfiguration: Kafka.IConf;
  protected request: Kafka.SendRequest;
  protected expectedResults: Map<string, IExpectedResult> = new Map<string, IExpectedResult>();
  protected currentTransactionId: number = 0;

  protected constructor(conf: Kafka.IConf) {
    this.testConfiguration = {
      clientId: 'testingClientId',
      clusterId: conf.clusterId,
      kafkaUrls: conf.kafkaUrls,
    };
    this.request = new Kafka.SendRequest(this.testConfiguration, {}, false);
  }

  protected listenTopic(topic: string): ListenTopic {
    const listeningTopic: string = topic ? topic : this.request.getResponseTopic();
    const listenTopic: ListenTopic = new ListenTopic();
    new Kafka.StreamHandler(this.testConfiguration, {}, [listeningTopic], listenTopic.handler);
    return listenTopic;
  }

  protected sendMessage(topic: string, uri: string, data: any, tx?: string): string {
    const txId: string = tx ? tx : this.getNewTxId();
    this.request.sendMessage(txId, topic, uri, data);
    return txId;
  }

  protected sendRequest(topic: string, uri: string, data: any, tx?: string): string {
    const txId: string = tx ? tx : this.getNewTxId();
    this.request.sendRequest(txId, topic, uri, data);
    return txId;
  }

  protected sendResponse(msgId: string, topic: string, uri: string, data: any, tx?: string): string {
    const txId: string = tx ? tx : this.getNewTxId();
    this.request.sendResponse(txId, msgId, topic, uri, data);
    return txId;
  }

  protected abstract run(): void;

  protected runTest(instance: any
    , func: (name: string, txId: string) => Subject<ITestResult>
    , timeOut: number
  ): Subject<ITestResult> {
    const subject: Subject<ITestResult> = new Subject();
    const txId: string = this.getNewTxId();
    const name: string = `${typeof instance}.${func.name}`;
    setTimeout(() => {
      if (this.expectedResults[txId]) {
        Utils.onNext(subject, {
          testName: name,
          success: false,
          reason: `timeout`,
        });
      }
    }, timeOut);
    Utils.transformSingleAsync(subject, func(name, txId));
    return subject;
  }

  protected getNewTxId(): string {
    this.currentTransactionId++;
    return `${this.currentTransactionId}`;
  }

  protected createResult(name: string, expectedResult: IExpectedResult
    , result: IExpectedResult, compare: (expectedData: any, resultData: any) => string
  ): ITestResult {
    const res: ITestResult = {
      testName: name,
      success: false,
      reason: '',
    };
    if (expectedResult.errorType && (!result.errorType || result.errorType !== expectedResult.errorType)) {
      res.reason = `expected error type ${expectedResult.errorType} but got ${result.errorType}`;
    } else if (!expectedResult.errorType && result.errorType) {
      res.reason = `not expected error but got ${result.errorType}`;
    } else if (!expectedResult.errorType && !result.errorType
      && expectedResult.data && !result.data) {
      res.reason = `expected has data ${expectedResult.data} but got null`;
    } else if (!expectedResult.errorType && !result.errorType
      && expectedResult.data && result.data) {
      const reason: string = compare(expectedResult.data, result.data);
      if (!reason) {
        res.reason = `expected has data ${expectedResult.data} but got null`;
      }
    } else {
      res.success = true;
    }
    results.push(res);
    return res;
  }
}

export {
  CommonTest,
  ListenTopic,
  Callback,
  Condition,
  ITestResult,
  IExpectedResult,
}