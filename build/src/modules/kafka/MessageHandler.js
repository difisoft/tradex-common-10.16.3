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
        try {
            const startTime = process.hrtime();
            let diff = null;
            const msgString = message.value.toString();
            const msg = JSON.parse(msgString);
            const shouldResponse = this.shouldResponse(msg);
            const obs = func(msg, message);
            if (obs === false) {
                if (shouldResponse) {
                    diff = process.hrtime(startTime);
                    __1.Logger.info(`process request ${msg.uri} took ${diff[0]} seconds and  ${diff[0]} nanoseconds`);
                    this.sendRequest.sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, this.getErrorMessage(new UriNotFound_1.default()));
                }
                return;
            }
            else if (obs === true) {
                diff = process.hrtime(startTime);
                __1.Logger.info(`forward request ${msg.uri} took ${diff[0]} seconds and  ${diff[0]} nanoseconds`);
                return;
            }
            const handleError = (err) => {
                log_1.logger.logError('error while processing request', err);
                if (shouldResponse) {
                    this.sendRequest.sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, this.getErrorMessage(err));
                }
                diff = process.hrtime(startTime);
                __1.Logger.info(`handle request ${msg.uri} took ${diff[0]} seconds and  ${diff[0]} nanoseconds`);
            };
            const handleData = (data) => {
                try {
                    if (shouldResponse) {
                        this.sendRequest.sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, { data: data });
                    }
                    diff = process.hrtime(startTime);
                    __1.Logger.info(`handle request ${msg.uri} took ${diff[0]} seconds and  ${diff[0]} nanoseconds`);
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
            log_1.logger.logError('error while processing message', e);
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