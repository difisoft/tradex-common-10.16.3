import Rx from "rx";

interface IConf {
  clientId: string,
  clusterId: string,
  kafkaUrls: string[],
}

enum MessageType {
  MESSAGE = 'MESSAGE',
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
}

const SEND_MESSAGE_TYPE = {
  OBSERVABLE: 0,
  PROMISE: 1,
};

class PromiseState<T> {
  private rs: (v: T) => void;
  private rj: (err: Error) => void;
  private prom: Promise<T>;

  public constructor() {
    // tslint:disable
    this.prom = new Promise<T>((resolve: (v: T) => void, reject: (err: Error) => void) => {
      this.rs = resolve;
      this.rj = reject;
    });
    // tslint:enable
  }

  public resolve(v: T) {
    this.rs(v);
  }

  public reject(err: Error) {
    this.rj(err);
  }

  public promise(): Promise<T> {
    return this.prom;
  }
}

declare interface ISendMessage {
  topic: string,
  subject?: Rx.Subject<IMessage> | PromiseState<IMessage>,
  message: IMessage,
  highLatency?: boolean,
  timeout?: number,
  sendType?: number,
}

declare interface IResponseDestination {
  topic: string,
  uri: string,
}

declare interface IMessage {
  messageType: MessageType,
  sourceId?: string,
  messageId: string | number,
  transactionId: string | number,
  uri?: string,
  responseDestination?: IResponseDestination,
  data: any,
  stream?: boolean,
  streamState?: string;
  streamIndex?: number;
}

const STREAM_STATE = {
  NORMAL: "NORMAL",
  FINSISH: "FINSISH",
  ERROR: "ERROR",
};

export {
  IConf,
  MessageType,
  ISendMessage,
  IMessage,
  IResponseDestination,
  SEND_MESSAGE_TYPE,
  PromiseState,
  STREAM_STATE,
};