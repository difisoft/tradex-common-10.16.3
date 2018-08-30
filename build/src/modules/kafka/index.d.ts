import StreamHandler from "./StreamHandler";
import { MessageHandler, HandleResult, Handle } from "./MessageHandler";
import { create, getInstance, SendRequest, SendRequestCommon } from "./SendRequest";
import { IConf, IMessage, IResponseDestination, ISendMessage, MessageType } from "./types";
export { IConf, ISendMessage, IMessage, IResponseDestination, HandleResult, Handle };
declare const _default: {
    StreamHandler: typeof StreamHandler;
    SendRequest: typeof SendRequest;
    SendRequestCommon: typeof SendRequestCommon;
    create: typeof create;
    getInstance: typeof getInstance;
    MessageType: typeof MessageType;
    MessageHandler: typeof MessageHandler;
};
export default _default;
