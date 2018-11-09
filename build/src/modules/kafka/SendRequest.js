"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StreamHandler_1 = require("./StreamHandler");
const log_1 = require("../log");
const types_1 = require("./types");
const Rx = require("rx");
const Kafka = require("node-rdkafka");
const errors_1 = require("../errors");
class SendRequestCommon {
    constructor(conf, handleSendError, producerOptions) {
        this.conf = conf;
        this.handleSendError = handleSendError;
        this.messageId = 0;
        this.bufferedMessages = [];
        this.isReady = false;
        this.reallySendMessage = (message) => {
            this.doReallySendMessage(message);
        };
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
        }, () => log_1.logger.info('producer connect'));
        this.producer.on('ready', () => {
            this.isReady = true;
            this.bufferedMessages.forEach(this.reallySendMessage);
        });
        this.producer.on('event.error', (err) => {
            log_1.logger.logError('producer error', err);
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
        }, () => log_1.logger.info('producer connect'));
        this.highLatencyProducer.on('ready', () => {
            this.isReady = true;
            this.bufferedMessages.forEach(this.reallySendMessage);
        });
        this.highLatencyProducer.on('event.error', (err) => {
            log_1.logger.logError('producer error', err);
        });
    }
    getResponseTopic() {
        return this.responseTopic;
    }
    sendMessage(transactionId, topic, uri, data, highLatency = true) {
        const message = this.createMessage(transactionId, topic, uri, data);
        message.highLatency = highLatency;
        if (!this.isReady) {
            this.bufferedMessages.push(message);
        }
        else {
            this.reallySendMessage(message);
        }
    }
    ;
    sendForwardMessage(originMessage, newTopic, newUri) {
        const message = {
            topic: newTopic,
            message: originMessage,
        };
        message.message.uri = newUri;
        if (!this.isReady) {
            this.bufferedMessages.push(message);
        }
        else {
            this.reallySendMessage(message);
        }
    }
    ;
    sendResponse(transactionId, messageId, topic, uri, data) {
        const message = this.createMessage(transactionId, topic, uri, data, types_1.MessageType.RESPONSE, undefined, undefined, messageId);
        if (!this.isReady) {
            this.bufferedMessages.push(message);
        }
        else {
            this.reallySendMessage(message);
        }
    }
    ;
    timeout(message) {
    }
    doReallySendMessage(message) {
        try {
            const msgContent = JSON.stringify(message.message);
            if (message.highLatency === true) {
                log_1.logger.info(`send message ${msgContent} to topic ${message.topic}`);
                this.highLatencyProducer.produce(message.topic, null, new Buffer(msgContent), this.conf.clientId, Date.now());
            }
            else {
                log_1.logger.info(`send low latency message ${msgContent} to topic ${message.topic}`);
                this.producer.produce(message.topic, null, new Buffer(msgContent), this.conf.clientId, Date.now());
            }
            if (message.timeout) {
                setTimeout(() => this.timeout(message), message.timeout);
            }
        }
        catch (e) {
            if (!this.handleSendError || !this.handleSendError(e)) {
                if (e.message.indexOf('Local: Queue full') > -1) {
                    log_1.logger.logError('error while sending the message. exitting...', e);
                    process.exit(1);
                }
                else {
                    log_1.logger.logError('error while sending the message', e);
                }
            }
        }
    }
    getMessageId() {
        this.messageId++;
        return this.messageId;
    }
    createMessage(transactionId, topic, uri, data, messageType = types_1.MessageType.MESSAGE, responseTopic, responseUri, messageId) {
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
    }
    ;
}
exports.SendRequestCommon = SendRequestCommon;
class SendRequest extends SendRequestCommon {
    constructor(conf, consumerOptions, initListener = true, topicConf = {}, handleSendError, producerOptions) {
        super(conf, handleSendError, producerOptions);
        this.requestedMessages = new Map();
        this.reallySendMessage = (message) => {
            if (message.subject) {
                this.requestedMessages[message.message.messageId] = message.subject;
            }
            super.doReallySendMessage(message);
        };
        if (initListener) {
            log_1.logger.info(`init response listener ${this.responseTopic}`);
            new StreamHandler_1.StreamHandler(this.conf, consumerOptions, [this.responseTopic], (data) => this.handlerResponse(data), topicConf);
        }
    }
    sendRequest(transactionId, topic, uri, data) {
        const subject = new Rx.Subject();
        const message = this.createMessage(transactionId, topic, uri, data, types_1.MessageType.REQUEST, this.responseTopic, 'REQUEST_RESPONSE');
        message.subject = subject;
        if (!this.isReady) {
            this.bufferedMessages.push(message);
        }
        else {
            this.reallySendMessage(message);
        }
        return subject;
    }
    ;
    timeout(message) {
        const msgId = message.message.messageId;
        if (this.requestedMessages[msgId]) {
            this.requestedMessages[msgId].onError(new errors_1.TimeoutError());
            this.requestedMessages[msgId].onCompleted();
            delete this.requestedMessages[msgId];
        }
    }
    handlerResponse(message) {
        const msgStr = message.value.toString();
        const msg = JSON.parse(msgStr);
        if (this.requestedMessages[msg.messageId]) {
            this.requestedMessages[msg.messageId].onNext(msg);
            this.requestedMessages[msg.messageId].onCompleted();
            delete this.requestedMessages[msg.messageId];
        }
        else {
            log_1.logger.warn(`cannot find where to response (probably timeout happen) "${msgStr}"`);
        }
    }
}
exports.SendRequest = SendRequest;
let instance = null;
function create(conf, consumerOptions, initResponseListener = true, topicConf = {}) {
    instance = new SendRequest(conf, consumerOptions, initResponseListener, topicConf);
}
exports.create = create;
function getInstance() {
    return instance;
}
exports.getInstance = getInstance;
//# sourceMappingURL=SendRequest.js.map