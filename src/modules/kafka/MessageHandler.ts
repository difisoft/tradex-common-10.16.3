import { Observable } from "rx";
import { IMessage } from "./types";
import { logger } from "../log";
import { getInstance } from "./SendRequest";
import GeneralError from "../errors/GeneralError";
import UriNotFound from "../errors/UriNotFound";
import IResponse, { createFailResponse } from "../models/IResponse";
import { ForwardError } from "../errors";
import { Logger } from '../..';
import { IKafkaMessage } from './StreamHandler';

declare type HandleResult = Observable<any> | Promise<any> | boolean;
declare type Handle = (msg: IMessage, originalMessage?: IKafkaMessage) => HandleResult;

class MessageHandler {
  constructor() {
    // nothing to do
  }

  public handle(message: IKafkaMessage, func: Handle): void {
    try {
      logger.info('Got message');
      const msgString: string = message.value.toString();
      logger.info(msgString);
      const msg: IMessage = JSON.parse(msgString);
      const shouldResponse = this.shouldResponse(msg);
      const startedHrTime = process.hrtime()
      const obs: HandleResult = func(msg, message);
      if (obs === false) {
        if (shouldResponse) {
          getInstance().sendResponse(
            msg.transactionId,
            msg.messageId,
            msg.responseDestination.topic,
            msg.responseDestination.uri,
            this.getErrorMessage(new UriNotFound())
          );
        } 
        return;
      } else if (obs === true) {
        return; // forwarding. do nothing
      }
      const handleError = (err: Error) => {
        logger.logError('error while processing request', err);
        if (shouldResponse) {
          getInstance().sendResponse(
            msg.transactionId,
            msg.messageId,
            msg.responseDestination.topic,
            msg.responseDestination.uri,
            this.getErrorMessage(err)
          );
        };
      }
      const handleData = (data: any) => {
        try {
          const stopHrTime = process.hrtime()
          Logger.info(`request ${msg.uri} took ${(stopHrTime[0] - startedHrTime[0]) * 1000 + (stopHrTime[1] - startedHrTime[1])/1000000} ms`);
          if (shouldResponse) {
            getInstance().sendResponse(
              <string>msg.transactionId,
              msg.messageId,
              msg.responseDestination.topic,
              msg.responseDestination.uri,
              {data: data}
            );
          }
        } catch (err) {
          handleError(err);
        }
      };
      if (obs instanceof Promise) {
        obs.then(handleData).catch(handleError);
      } else {
        obs.subscribe(handleData, handleError);
      }
    } catch (e) {
      logger.logError('error while processing message', e);
    }
  }

  public getErrorMessage = (error: Error) => {
    return getErrorMessage(error);
  }

  private shouldResponse(msg: IMessage) {
    return msg.responseDestination && msg.responseDestination.topic;
  }
}

function getErrorMessage(error: Error): IResponse {
  if (error['isSystemError']) {// tslint:disable-line
    if (error['source']) {// tslint:disable-line
      logger.logError('error', error['source']);// tslint:disable-line
    } else {
      logger.logError('error', error);
    }
    return createFailResponse((<GeneralError>error).code, (<GeneralError>error).messageParams,
      ((<GeneralError>error).params && (<GeneralError>error).params.length > 0) ? (<GeneralError>error).params : undefined);
  } else if (error['isForwardError']) {// tslint:disable-line
    return {status: (<ForwardError>error).status};
  } else {
    logger.logError('error', error);
    return createFailResponse('INTERNAL_SERVER_ERROR');
  }
};

export {
  HandleResult,
  Handle,
  MessageHandler,
  getErrorMessage,
}