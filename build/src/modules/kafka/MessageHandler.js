"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
const SendRequest_1 = require("./SendRequest");
const UriNotFound_1 = require("../errors/UriNotFound");
const IResponse_1 = require("../models/IResponse");
class MessageHandler {
    constructor() {
    }
    handle(message, func) {
        try {
            log_1.logger.info('Got message');
            const msgString = message.value.toString();
            log_1.logger.info(msgString);
            const msg = JSON.parse(msgString);
            const obs = func(msg);
            if (obs === false) {
                SendRequest_1.getInstance().sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, this.getErrorMessage(new UriNotFound_1.default()));
                return;
            }
            else if (obs === true) {
                return;
            }
            obs.subscribe((data) => SendRequest_1.getInstance().sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, { data: data }), (err) => {
                log_1.logger.logError('error while processing request', err);
                SendRequest_1.getInstance().sendResponse(msg.transactionId, msg.messageId, msg.responseDestination.topic, msg.responseDestination.uri, this.getErrorMessage(err));
            });
        }
        catch (e) {
            log_1.logger.logError('error while processing message', e);
        }
    }
    getErrorMessage(error) {
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
    ;
}
exports.MessageHandler = MessageHandler;
//# sourceMappingURL=MessageHandler.js.map