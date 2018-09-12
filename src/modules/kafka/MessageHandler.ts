import { Observable } from "rx";
import { IMessage } from "./types";
import { logger } from "../log";
import { getInstance } from "./SendRequest";
import GeneralError from "../errors/GeneralError";
import UriNotFound from "../errors/UriNotFound";
import IResponse, { createFailResponse } from "../models/IResponse";
import { ForwardError } from "../errors";

declare type HandleResult = Observable<any> | boolean;
declare type Handle = (msg: IMessage) => HandleResult;

class MessageHandler {
  constructor() {
    // nothing to do
  }

  public handle(message: any, func: Handle): void {
    try {
      logger.info('Got message');
      const msgString: string = message.value.toString();
      logger.info(msgString);
      const msg: IMessage = JSON.parse(msgString);
      const obs: HandleResult = func(msg);
      if (obs === false) {
        getInstance().sendResponse(
          msg.transactionId,
          msg.messageId,
          msg.responseDestination.topic,
          msg.responseDestination.uri,
          this.getErrorMessage(new UriNotFound())
        );
        return;
      } else if (obs === true) {
        return; // forwarding. do nothing
      }
      obs.subscribe((data: any) => getInstance().sendResponse(
        <string>msg.transactionId,
        msg.messageId,
        msg.responseDestination.topic,
        msg.responseDestination.uri,
        {data: data}
      ), (err: Error) => {
        logger.logError('error while processing request', err);
        getInstance().sendResponse(
          msg.transactionId,
          msg.messageId,
          msg.responseDestination.topic,
          msg.responseDestination.uri,
          this.getErrorMessage(err)
        );
      });
    } catch (e) {
      logger.logError('error while processing message', e);
    }
  }


  public getErrorMessage(error: Error): IResponse {
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
}

export {
  HandleResult,
  Handle,
  MessageHandler,
}