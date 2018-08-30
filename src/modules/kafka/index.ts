import StreamHandler from "./StreamHandler";
import {MessageHandler, HandleResult, Handle} from "./MessageHandler";
import {create, getInstance, SendRequest, SendRequestCommon} from "./SendRequest";
import {IConf, IMessage, IResponseDestination, ISendMessage, MessageType} from "./types";

export {
  IConf,
  ISendMessage,
  IMessage,
  IResponseDestination,
  HandleResult,
  Handle
};

export default {
  StreamHandler,
  SendRequest,
  SendRequestCommon,
  create,
  getInstance,
  MessageType,
  MessageHandler,
};