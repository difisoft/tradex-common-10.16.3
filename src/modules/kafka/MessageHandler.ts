import { Observable } from "rx";
import { IMessage } from "./types";
import { logger } from "../log";
import { getInstance, SendRequest } from "./SendRequest";
import GeneralError from "../errors/GeneralError";
import UriNotFound from "../errors/UriNotFound";
import IResponse, { createFailResponse } from "../models/IResponse";
import { ForwardError } from "../errors";
import { Logger } from '../..';
import { IKafkaMessage } from './StreamHandler';

declare type HandleResult = Observable<any> | Promise<any> | boolean;
declare type Handle = (msg: IMessage, originalMessage?: IKafkaMessage) => HandleResult;

class MessageHandler {
  constructor(private sendRequest: SendRequest = null) {
    if (this.sendRequest == null) {
      this.sendRequest = getInstance();
    }
  }

  public handle(message: IKafkaMessage, func: Handle): void {
    try {
      const startTime: [number, number] = process.hrtime();
      let diff: [number, number] = null;
      const msgString: string = message.value.toString();
      const msg: IMessage = JSON.parse(msgString);
      const shouldResponse = this.shouldResponse(msg);
      if (shouldResponse && msg.uri === "/healthcheck") {
        this.sendRequest.sendResponse(
          msg.transactionId,
          msg.messageId,
          msg.responseDestination.topic,
          msg.responseDestination.uri,
          {
            status: "ON",
          }
        );
      }
      const obs: HandleResult = func(msg, message);
      if (obs === false) {
        if (shouldResponse) {
          diff = process.hrtime(startTime);
          Logger.info(`process request ${msg.uri} took ${diff[0]} seconds and  ${diff[0]} nanoseconds`);
          this.sendRequest.sendResponse(
            msg.transactionId,
            msg.messageId,
            msg.responseDestination.topic,
            msg.responseDestination.uri,
            this.getErrorMessage(new UriNotFound())
          );
        } 
        return;
      } else if (obs === true) {
        diff = process.hrtime(startTime);
        Logger.info(`forward request ${msg.uri} took ${diff[0]} seconds and  ${diff[0]} nanoseconds`);
        return; // forwarding. do nothing
      }
      const handleError = (err: Error) => {
        logger.logError('error while processing request', err);
        if (shouldResponse) {
          this.sendRequest.sendResponse(
            msg.transactionId,
            msg.messageId,
            msg.responseDestination.topic,
            msg.responseDestination.uri,
            this.getErrorMessage(err)
          );
        }
        diff = process.hrtime(startTime);
        Logger.info(`handle request ${msg.uri} took ${diff[0]} seconds and  ${diff[0]} nanoseconds`);
      };
      const handleData = (data: any) => {
        try {
          if (shouldResponse) {
            this.sendRequest.sendResponse(
              <string>msg.transactionId,
              msg.messageId,
              msg.responseDestination.topic,
              msg.responseDestination.uri,
              {data: data}
            );
          }
          diff = process.hrtime(startTime);
          Logger.info(`handle request ${msg.uri} took ${diff[0]} seconds and  ${diff[0]} nanoseconds`);
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
  };

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
}

export {
  HandleResult,
  Handle,
  MessageHandler,
  getErrorMessage,
}