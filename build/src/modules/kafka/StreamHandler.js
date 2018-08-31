"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_rdkafka_1 = require("node-rdkafka");
const log_1 = require("../log");
class StreamHandler {
    constructor(conf, options, topics, dataHandler) {
        const ops = Object.assign({
            'group.id': conf.clusterId,
            'metadata.broker.list': conf.kafkaUrls.join(),
        }, options);
        this.hasError = false;
        this.stream = node_rdkafka_1.createReadStream(ops, {}, {
            topics: topics
        });
        this.stream.on('error', (err) => {
            log_1.logger.logError('error on kafka', err);
            this.hasError = true;
            setTimeout(() => {
                if (this.hasError) {
                    log_1.logger.logError('error flag still on. preparing to exit in 2 seconds', topics);
                    setTimeout(() => process.exit(1), 2000);
                }
            }, 15000);
        });
        this.stream.on('data', (data) => {
            this.hasError = false;
            dataHandler(data, this);
        });
    }
}
exports.StreamHandler = StreamHandler;
//# sourceMappingURL=StreamHandler.js.map