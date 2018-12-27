import { ConsumerStream, createReadStream } from 'node-rdkafka';
import { logger } from '../log';
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

class StreamHandler {
  private hasError: boolean;
  private stream: ConsumerStream;

  constructor(conf: IConf, options: any, topics: string[]
              , dataHandler: (data: IKafkaMessage, handler: StreamHandler) => void
              , topicConf: any = {}
              , readyCallback?: () => void
  ) {
    const ops = {
      ...{
        'group.id': conf.clusterId,
        'metadata.broker.list': conf.kafkaUrls.join(),
      }, ...options
    };

    this.hasError = false;
    this.stream = createReadStream(ops, topicConf, {
      topics: topics
    });

    if (readyCallback) {
      this.stream.consumer.on('ready', readyCallback);
    }

    this.stream.on('error', (err: any) => {
      logger.logError('error on kafka', err);
      this.hasError = true;
      setTimeout(() => {
        if (this.hasError) {
          logger.logError('error flag still on. preparing to exit in 2 seconds', topics);
          setTimeout(() => process.exit(1), 2000);
        }
      }, 15000)
    });

    this.stream.on('data', (data: any) => {
      this.hasError = false;
      dataHandler(<IKafkaMessage>data, this);
    });
  }

  public close() {
    this.stream.close();
  }
}

function createBroadcastListener(conf: IConf, options: any, topics: string[]
  , dataHandler: (data: IKafkaMessage, handler: StreamHandler) => void, topicConf: any = {}
) {
  const opt = {
    ...{
      'group.id': conf.clientId,
    }, ...options
  };
  return new StreamHandler(conf, opt, topics, dataHandler, topicConf);
}

export {
  StreamHandler,
  IKafkaMessage,
  createBroadcastListener
};