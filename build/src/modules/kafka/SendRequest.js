"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StreamHandler_1 = require("./StreamHandler");
const log_1 = require("../log");
const Rx = require("rx");
const types_1 = require("./types");
const Kafka = require("node-rdkafka");
class SendRequestCommon {
    constructor(conf) {
        this.conf = conf;
        this.messageId = 0;
        this.bufferedMessages = [];
        this.isReady = false;
        this.responseTopic = `${this.conf.clusterId}.response.${this.conf.clientId}`;
        this.producer = new Kafka.Producer({
            'client.id': conf.clientId,
            'metadata.broker.list': this.conf.kafkaUrls.join(),
            'retry.backoff.ms': 200,
            'message.send.max.retries': 10,
        }, {});
        this.producer.connect({
            topic: '',
            allTopics: true,
            timeout: 30000,
        }, (...args) => log_1.logger.info('producer connect', args));
        this.producer.on('ready', () => {
            this.isReady = true;
            this.bufferedMessages.forEach(this.reallySendMessage);
        });
        this.producer.on('event.error', (err) => {
            log_1.logger.logError('producer error', err);
        });
    }
    sendMessage(transactionId, topic, uri, data) {
        const message = this.createMessage(transactionId, topic, uri, data);
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
    reallySendMessage(message) {
        try {
            const msgContent = JSON.stringify(message.message);
            log_1.logger.info('send message {} to topic', msgContent, message.topic);
            this.producer.produce(message.topic, null, new Buffer(msgContent), this.conf.clientId, Date.now());
        }
        catch (e) {
            log_1.logger.logError('error while sending the message', e);
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
    constructor(conf, consumerOptions) {
        super(conf);
        this.requestedMessages = new Map();
        new StreamHandler_1.default(this.conf, consumerOptions, [this.responseTopic], (data) => this.handlerResponse(data));
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
    reallySendMessage(message) {
        if (message.subject) {
            this.requestedMessages[message.message.messageId] = message.subject;
        }
        super.reallySendMessage(message);
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
            log_1.logger.warn(`cannot find where to response "${msgStr}"`);
        }
    }
}
exports.SendRequest = SendRequest;
let instance = null;
function create(conf, consumerOptions) {
    instance = new SendRequest(conf, consumerOptions);
}
exports.create = create;
function getInstance() {
    return instance;
}
exports.getInstance = getInstance;
//# sourceMappingURL=SendRequest.js.map