import { createReadStream, ConsumerStream } from 'node-rdkafka';
import { logError } from '../log';

class StreamHandler {
  private hasError: boolean;
  private stream: ConsumerStream;

  constructor(conf: any, options: any, topics: any, dataHandler: any) {
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
      logError('error on kafka', err);
      this.hasError = true;
      setTimeout(() => {
        if (this.hasError) {
          logError('error flag still on. preparing to exit in 2 seconds', topics);
          setTimeout(() => process.exit(1), 2000);
        }
      }, 15000)
    });

    this.stream.on('data', (data: any) => {
      this.hasError = false;
      dataHandler(data, this);
    });
  }
}

export default StreamHandler;