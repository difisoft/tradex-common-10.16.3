import { StreamHandler } from './StreamHandler';
import { logger } from '../log';
import { IConf, IMessage, ISendMessage, MessageType, } from './types';
import Rx = require("rx");
import Kafka = require('node-rdkafka');
import { TimeoutError } from '../errors';

class SendRequestCommon {
  protected messageId: number = 0;
  protected producer: any;
  protected highLatencyProducer: any;
  protected readonly responseTopic: string;
  protected bufferedMessages: ISendMessage[] = [];
  protected isReady: boolean = false;

  constructor(
    protected conf: IConf,
    protected handleSendError?: (e: Error) => boolean,
    producerOptions?: any
  ) {
    this.responseTopic = `${this.conf.clusterId}.response.${this.conf.clientId}`;
    this.producer = new Kafka.Producer({
      'client.id': conf.clientId,
      'metadata.broker.list': this.conf.kafkaUrls.join(),
      'retry.backoff.ms': 200,
      'message.send.max.retries': 10,
      'batch.num.messages': 10,
    }, producerOptions ? producerOptions : {});
    this.producer.connect({
      topic: '',
      allTopics: true,
      timeout: 30000,
    }, () => logger.info('producer connect'));
    this.producer.on('ready', () => {
      this.isReady = true;
      this.bufferedMessages.forEach(this.reallySendMessage);
    });
    this.producer.on('event.error', (err: Error) => {
      logger.logError('producer error', err);
    });

    this.highLatencyProducer = new Kafka.Producer({
      'client.id': conf.clientId,
      'metadata.broker.list': this.conf.kafkaUrls.join(),
      'retry.backoff.ms': 200,
      'message.send.max.retries': 10,
    }, {});
    this.highLatencyProducer.connect({
      topic: '',
      allTopics: true,
      timeout: 30000,
    }, () => logger.info('producer connect'));
    this.highLatencyProducer.on('ready', () => {
      this.isReady = true;
      this.bufferedMessages.forEach(this.reallySendMessage);
    });
    this.highLatencyProducer.on('event.error', (err: Error) => {
      logger.logError('producer error', err);
    });
  }

  public getResponseTopic(): string {
    return this.responseTopic;
  }

  public sendMessage(transactionId: string, topic: string, uri: string, data: any, highLatency: boolean = true): void {
    const message: ISendMessage = this.createMessage(transactionId, topic, uri, data);
    message.highLatency = highLatency;
    if (!this.isReady) {
      this.bufferedMessages.push(message);
    } else {
      this.reallySendMessage(message);
    }
  };

  public sendForwardMessage(originMessage: any, newTopic: string, newUri: string): void {
    const message: ISendMessage = {
      topic: newTopic,
      message: originMessage,
    };
    message.message.uri = newUri;
    if (!this.isReady) {
      this.bufferedMessages.push(message);
    } else {
      this.reallySendMessage(message);
    }
  };

  public sendResponse(transactionId: string | number, messageId: string | number, topic: string, uri: string, data: any): void {
    const message: ISendMessage = this.createMessage(transactionId, topic, uri, data, MessageType.RESPONSE,
      undefined, undefined, messageId);
    if (!this.isReady) {
      this.bufferedMessages.push(message);
    } else {
      this.reallySendMessage(message);
    }
  };

  protected timeout(message: ISendMessage) {
    // do nothing
  }

  protected doReallySendMessage(message: ISendMessage): void {
    try {
      const msgContent = JSON.stringify(message.message);
      if (message.highLatency === true) {
        logger.info(`send message ${msgContent} to topic ${message.topic}`);
        this.highLatencyProducer.produce(message.topic, null, new Buffer(msgContent), this.conf.clientId, Date.now());
      } else {
        logger.info(`send low latency message ${msgContent} to topic ${message.topic}`);
        this.producer.produce(message.topic, null, new Buffer(msgContent), this.conf.clientId, Date.now());
      }
      if (message.timeout) {
        setTimeout(() => this.timeout(message), message.timeout);
      }
    } catch (e) {
      if (!this.handleSendError || !this.handleSendError(e)) {
        if (e.message.indexOf('Local: Queue full') > -1) {
          logger.logError('error while sending the message. exitting...', e);
          process.exit(1);
        } else {
          logger.logError('error while sending the message', e);
        }
      }
    }
  }

  protected reallySendMessage: (message: ISendMessage) => void = (message: ISendMessage) => {
    this.doReallySendMessage(message);
  };

  protected getMessageId(): number {
    this.messageId++;
    return this.messageId;
  }

  protected createMessage(transactionId: string | number, topic: string, uri: string
    , data: any, messageType: MessageType = MessageType.MESSAGE
    , responseTopic?: string, responseUri?: string, messageId?: string | number): ISendMessage {
    return {
      topic: topic,
      message: {
        messageType: messageType,
        sourceId: this.conf.clusterId,
        messageId: messageId ? messageId : this.getMessageId(),
        transactionId: transactionId,
        uri: uri,
        responseDestination: responseTopic ? {
            topic: responseTopic,
            uri: responseUri
          }
          :
          undefined,
        data: data,
      },
    };
  };
}

class SendRequest extends SendRequestCommon {
  private requestedMessages: Map<string | number, ISendMessage> = new Map<string | number, ISendMessage>();

  constructor(
    conf: IConf,
    consumerOptions: any,
    initListener: boolean = true,
    topicConf: any = {},
    handleSendError?: (e: Error) => boolean,
    producerOptions?: any
  ) {
    super(conf, handleSendError, producerOptions);
    if (initListener) {
      logger.info(`init response listener ${this.responseTopic}`);
      new StreamHandler(this.conf, consumerOptions, [this.responseTopic]
        , (data: any) => this.handlerResponse(data), topicConf);
    }
  }


  public sendRequest(transactionId: string, topic: string, uri: string, data: any, timeout?: number): Rx.Observable<IMessage> {
    const subject: Rx.Subject<IMessage> = new Rx.Subject();
    const message: ISendMessage = this.createMessage(transactionId, topic, uri, data, MessageType.REQUEST
      , this.responseTopic, 'REQUEST_RESPONSE');
    message.subject = subject;
    message.timeout = timeout;
    if (!this.isReady) {
      this.bufferedMessages.push(message);
    } else {
      this.reallySendMessage(message);
    }
    return subject;
  };

  protected reallySendMessage: (message: ISendMessage) => void = (message: ISendMessage) => {
    if (message.subject) {
      this.requestedMessages[message.message.messageId] = message.subject;
    }
    super.doReallySendMessage(message);
  };

  protected timeout(message: ISendMessage) {
    const msgId: string = <string>message.message.messageId;
    if (this.requestedMessages[msgId]) {
      this.requestedMessages[msgId].onError(new TimeoutError());
      this.requestedMessages[msgId].onCompleted();
      delete this.requestedMessages[msgId];
    }
  }

  private handlerResponse(message: any) {
    const msgStr = message.value.toString();
    const msg: IMessage = JSON.parse(msgStr);
    if (this.requestedMessages[msg.messageId]) {
      this.requestedMessages[msg.messageId].onNext(msg);
      this.requestedMessages[msg.messageId].onCompleted();
      delete this.requestedMessages[msg.messageId];
    } else {
      logger.warn(`cannot find where to response (probably timeout happen) "${msgStr}"`);
    }
  }

}

let instance: SendRequest = null;

function create(conf: IConf, consumerOptions: any, initResponseListener: boolean = true, topicConf: any = {}): void {
  instance = new SendRequest(conf, consumerOptions, initResponseListener, topicConf);
}

function getInstance(): SendRequest {
  return instance;
}

export {
  SendRequest,
  SendRequestCommon,
  create,
  getInstance,
};