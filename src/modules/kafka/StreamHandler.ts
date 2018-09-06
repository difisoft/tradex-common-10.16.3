import { ConsumerStream, createReadStream } from 'node-rdkafka';
import { logger } from '../log';
import { IConf } from "./types";

class StreamHandler {
  private hasError: boolean;
  private stream: ConsumerStream;

  constructor(conf: IConf, options: any, topics: string[]
              , dataHandler: (data: any, handler: StreamHandler) => void
  ) {
    const ops = {
      ...{
        'group.id': conf.clusterId,
        'metadata.broker.list': conf.kafkaUrls.join(),
      }, ...options
    };

    this.hasError = false;
    this.stream = createReadStream(ops, {}, {
      topics: topics
    });

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
      dataHandler(data, this);
    });
  }

  public close() {
    this.stream.close();
  }
}

export {
  StreamHandler
};