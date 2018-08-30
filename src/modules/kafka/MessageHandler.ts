import {Observable} from "rx";
import {IMessage} from "./types";
import {logger} from "../log";
import {getInstance} from "./SendRequest";
import GeneralError from "../errors/GeneralError";
import UriNotFound from "../errors/UriNotFound";

declare type HandleResult = Observable<any> | boolean;
declare type Handle = (msg: IMessage) => HandleResult;

class MessageHandler {
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
          null,
          msg.responseDestination.topic,
          msg.responseDestination.uri,
          this.getErrorMessage(new UriNotFound())
        );
        return;
      } else if (obs === true) {
        return; // forwarding. do nothing
      }
      obs.subscribe((data: any) => getInstance().sendMessage(
        <string>msg.transactionId,
        msg.responseDestination.topic,
        msg.responseDestination.uri,
        {data: data}
      ), (err: Error) => {
        logger.logError('error while processing request', err);
        getInstance().sendResponse(
          msg.transactionId,
          null,
          msg.responseDestination.topic,
          msg.responseDestination.uri,
          this.getErrorMessage(err)
        );
      });
    } catch (e) {
      logger.logError('error while processing message', e);
    }
  }


  public getErrorMessage(error: Error): any {
    if (error['isSystemError']) {// tslint:disable-line
      if (error['source']) {// tslint:disable-line
        logger.logError('error', error['source']);// tslint:disable-line
      } else {
        logger.logError('error', error);
      }
      return {
        status: {
          code: (<GeneralError>error).code,
          message: (<GeneralError>error).message,
          messageParams: (<GeneralError>error).messageParams,
          params: ((<GeneralError>error).params && (<GeneralError>error).params.length > 0) ? (<GeneralError>error).params : undefined,
        }
      };
    } else if (error['isForwardError']) {// tslint:disable-line
      return {status: error['status']};// tslint:disable-line
    } else {
      logger.logError('error', error);
      return {
        status: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'an error has occurred',
        }
      };
    }
  };
}

export {
  MessageHandler,
  HandleResult,
  Handle,
}