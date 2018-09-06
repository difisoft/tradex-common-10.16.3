import { SendRequestCommon } from "../kafka";
import EmailConfiguration from "./EmailConfiguration";
import EmailVerificationData from "./EmailVerificationData";
export default class SendNotification {
    private send;
    private notificationListenningTopic;
    constructor(send: SendRequestCommon, notificationListenningTopic: string);
    sendEmail(txId: string, conf: EmailConfiguration, locale: string, template: Map<string, any>): void;
    sendVerifiactionEmail(txId: string, conf: EmailConfiguration, locale: string, data: EmailVerificationData): void;
}
export declare function create(send: SendRequestCommon, notificationListenningTopic?: string): void;
export declare function getInstance(): SendNotification;
