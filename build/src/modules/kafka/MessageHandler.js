"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
const SendRequest_1 = require("./SendRequest");
const UriNotFound_1 = require("../errors/UriNotFound");
const IResponse_1 = require("../models/IResponse");
const __1 = require("../..");
class MessageHandler {
    constructor(sendRequest = null) {
        this.sendRequest = sendRequest;
        this.getErrorMessage = (error) => {
            return getErrorMessage(error);
        };
        if (this.sendRequest == null) {
            this.sendRequest = SendRequest_1.getInstance();
        }
    }
    handle(message, func) {
        if (message.value == null) {
            return;
        }
        const msgString = message.value.toString();
        try {
            const startTime = process.hrtime();
            let diff = null;
            __1.Logger.info(`receive msg: ${msgString}`);
            const msg = JSON.parse(msgString);
            const shouldResponse = this.shouldResponse(msg);
            if (shouldResponse && msg.uri === "/healthcheck") {
                this.sendRequest.sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, {
                    status: "ON",
                });
            }
            const obs = func(msg, message);
            if (obs === false) {
                if (shouldResponse) {
                    diff = process.hrtime(startTime);
                    __1.Logger.info(`process request ${msg.uri} took ${diff[0]}.${diff[1]} seconds`);
                    this.sendRequest.sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, this.getErrorMessage(new UriNotFound_1.default()));
                }
                return;
            }
            else if (obs === true) {
                diff = process.hrtime(startTime);
                __1.Logger.info(`forward request ${msg.transactionId} ${msg.messageId} ${msg.uri} took ${diff[0]}.${diff[1]} seconds`);
                return;
            }
            const handleError = (err) => {
                log_1.logger.logError(`error while processing request ${msg.transactionId} ${msg.messageId} ${msg.uri}`, err);
                if (shouldResponse) {
                    this.sendRequest.sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, this.getErrorMessage(err));
                }
                diff = process.hrtime(startTime);
                __1.Logger.info(`handle request ${msg.transactionId} ${msg.messageId} ${msg.uri} took ${diff[0]}.${diff[1]} seconds`);
            };
            const handleData = (data) => {
                try {
                    if (shouldResponse) {
                        this.sendRequest.sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, { data: data });
                    }
                    diff = process.hrtime(startTime);
                    __1.Logger.info(`handle request ${msg.uri} took ${diff[0]}.${diff[1]} seconds`);
                }
                catch (err) {
                    handleError(err);
                }
            };
            if (obs instanceof Promise) {
                obs.then(handleData).catch(handleError);
            }
            else {
                obs.subscribe(handleData, handleError);
            }
        }
        catch (e) {
            log_1.logger.logError(`error while processing message ${message.topic} ${message.value} ${msgString}`, e);
        }
    }
    shouldResponse(msg) {
        return msg.responseDestination && msg.responseDestination.topic;
    }
}
exports.MessageHandler = MessageHandler;
function getErrorMessage(error) {
    if (error['isSystemError']) {
        if (error['source']) {
            log_1.logger.logError('error', error['source']);
        }
        else {
            log_1.logger.logError('error', error);
        }
        return IResponse_1.createFailResponse(error.code, error.messageParams, (error.params && error.params.length > 0) ? error.params : undefined);
    }
    else if (error['isForwardError']) {
        return { status: error.status };
    }
    else {
        log_1.logger.logError('error', error);
        return IResponse_1.createFailResponse('INTERNAL_SERVER_ERROR');
    }
}
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=MessageHandler.js.map