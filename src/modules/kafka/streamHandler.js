import Kafka from 'node-rdkafka';
import {logError} from './../log/logger';

class StreamHandler {
  constructor(conf, options, topics, dataHandler) {
    let ops = Object.assign({
      'group.id': conf.clusterId,
      'metadata.broker.list': conf.kafkaUrls.join(),
    }, options);
    this.hasError = false;
    this.stream = Kafka.KafkaConsumer.createReadStream(ops, {}, {
      topics: topics
    });
    this.stream.on('error', err => {
      logError('error on kafka', err);
      this.hasError = true;
      setTimeout(() => {
        if (this.hasError) {
          logError('error flag still on. preparing to exit in 2 seconds', topics);
          setTimeout(() => process.exit(1), 2000);
        }
      }, 15000)
    });
    this.stream.on('data', data => {
      this.hasError = false;
      dataHandler(data, this);
    });
    return this.stream;
  }
}

export default StreamHandler;