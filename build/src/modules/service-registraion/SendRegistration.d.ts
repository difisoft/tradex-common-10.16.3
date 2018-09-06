import { SendRequestCommon } from "../kafka";
import IConf from "./IConf";
export default class SendRegistration {
    private send;
    private conf;
    private serviceRegistration;
    constructor(send: SendRequestCommon, conf: IConf);
    private doRegister;
}
export declare function create(send: SendRequestCommon, conf: IConf): void;
export declare function getInstance(): SendRegistration;
