"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
const SendRequest_1 = require("./SendRequest");
const UriNotFound_1 = require("../errors/UriNotFound");
const IResponse_1 = require("../models/IResponse");
const __1 = require("../..");
class MessageHandler {
    constructor() {
        this.getErrorMessage = (error) => {
            return getErrorMessage(error);
        };
    }
    handle(message, func) {
        try {
            log_1.logger.info('Got message');
            const msgString = message.value.toString();
            log_1.logger.info(msgString);
            const msg = JSON.parse(msgString);
            const shouldResponse = this.shouldResponse(msg);
            const startedHrTime = process.hrtime();
            const obs = func(msg, message);
            if (obs === false) {
                if (shouldResponse) {
                    SendRequest_1.getInstance().sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, this.getErrorMessage(new UriNotFound_1.default()));
                }
                return;
            }
            else if (obs === true) {
                return;
            }
            const handleError = (err) => {
                log_1.logger.logError('error while processing request', err);
                if (shouldResponse) {
                    SendRequest_1.getInstance().sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, this.getErrorMessage(err));
                }
                ;
            };
            const handleData = (data) => {
                try {
                    const stopHrTime = process.hrtime();
                    __1.Logger.info(`request ${msg.uri} took ${(stopHrTime[0] - startedHrTime[0]) * 1000 + (stopHrTime[1] - startedHrTime[1]) / 1000000} ms`);
                    if (shouldResponse) {
                        SendRequest_1.getInstance().sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, { data: data });
                    }
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
;
//# sourceMappingURL=MessageHandler.js.map