"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Kafka = require("./../modules/kafka");
const utils_1 = require("./../modules/utils");
const rx_1 = require("rx");
exports.results = [];
class ListenTopic {
    constructor() {
        this.conditions = [];
        this.callbacks = [];
    }
    when(condition, callback) {
        this.conditions.push(condition);
        this.callbacks.push(callback);
    }
    handler(data, streamHandler) {
        this.streamHandler = streamHandler;
        const msg = data.value.toString();
        const message = JSON.parse(msg);
        for (let i = 0; i < this.conditions.length; i++) {
            if (this.conditions[i](message)) {
                this.callbacks[i](message);
            }
        }
    }
    close() {
        this.streamHandler.close();
    }
}
exports.ListenTopic = ListenTopic;
class CommonTest {
    constructor(conf) {
        this.expectedResults = new Map();
        this.currentTransactionId = 0;
        this.testConfiguration = {
            clientId: 'testingClientId',
            clusterId: conf.clusterId,
            kafkaUrls: conf.kafkaUrls,
        };
        this.request = new Kafka.SendRequest(this.testConfiguration, {}, false);
    }
    listenTopic(topic) {
        const listeningTopic = topic ? topic : this.request.getResponseTopic();
        const listenTopic = new ListenTopic();
        new Kafka.StreamHandler(this.testConfiguration, {}, [listeningTopic], listenTopic.handler);
        return listenTopic;
    }
    sendMessage(topic, uri, data, tx) {
        const txId = tx ? tx : this.getNewTxId();
        this.request.sendMessage(txId, topic, uri, data);
        return txId;
    }
    sendRequest(topic, uri, data, tx) {
        const txId = tx ? tx : this.getNewTxId();
        this.request.sendRequest(txId, topic, uri, data);
        return txId;
    }
    sendResponse(msgId, topic, uri, data, tx) {
        const txId = tx ? tx : this.getNewTxId();
        this.request.sendResponse(txId, msgId, topic, uri, data);
        return txId;
    }
    runTest(instance, func, timeOut) {
        const subject = new rx_1.Subject();
        const txId = this.getNewTxId();
        const name = `${typeof instance}.${func.name}`;
        setTimeout(() => {
            if (this.expectedResults[txId]) {
                utils_1.default.onNext(subject, {
                    testName: name,
                    success: false,
                    reason: `timeout`,
                });
            }
        }, timeOut);
        utils_1.default.transformSingleAsync(subject, func(name, txId));
        return subject;
    }
    getNewTxId() {
        this.currentTransactionId++;
        return `${this.currentTransactionId}`;
    }
    createResult(name, expectedResult, result, compare) {
        const res = {
            testName: name,
            success: false,
            reason: '',
        };
        if (expectedResult.errorType && (!result.errorType || result.errorType !== expectedResult.errorType)) {
            res.reason = `expected error type ${expectedResult.errorType} but got ${result.errorType}`;
        }
        else if (!expectedResult.errorType && result.errorType) {
            res.reason = `not expected error but got ${result.errorType}`;
        }
        else if (!expectedResult.errorType && !result.errorType
            && expectedResult.data && !result.data) {
            res.reason = `expected has data ${expectedResult.data} but got null`;
        }
        else if (!expectedResult.errorType && !result.errorType
            && expectedResult.data && result.data) {
            const reason = compare(expectedResult.data, result.data);
            if (!reason) {
                res.reason = `expected has data ${expectedResult.data} but got null`;
            }
        }
        else {
            res.success = true;
        }
        exports.results.push(res);
        return res;
    }
}
exports.CommonTest = CommonTest;
//# sourceMappingURL=CommonTest.js.map