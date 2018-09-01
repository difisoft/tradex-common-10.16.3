import Rx from "rx";

interface IConf {
  clientId: string,
  clusterId: string,
  kafkaUrls: string[],
}

enum MessageType {
  MESSAGE='MESSAGE',
  REQUEST='REQUEST',
  RESPONSE='RESPONSE',
}

declare interface ISendMessage {
  topic: string,
  subject?: Rx.Subject<IMessage>,
  message: IMessage,
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
}

export {
  IConf,
  MessageType,
  ISendMessage,
  IMessage,
  IResponseDestination,
};