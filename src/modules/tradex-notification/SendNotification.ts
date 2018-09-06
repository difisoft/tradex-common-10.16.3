import { SendRequestCommon } from "../kafka";
import EmailConfiguration from "./EmailConfiguration";
import NotificationRequest from "./NotificationRequest";
import EmailVerificationData from "./EmailVerificationData";

export default class SendNotification {
  constructor(private send: SendRequestCommon, private notificationListenningTopic: string) {
  }

  public sendEmail(txId: string, conf: EmailConfiguration, locale: string, template: Map<string, any>) {
    const request: NotificationRequest = new NotificationRequest();
    request.setConfiguration(conf);
    request.locale = locale;
    request.template = template;
    this.send.sendMessage(txId, this.notificationListenningTopic, '', request.toJson());
  }

  public sendVerifiactionEmail(txId: string, conf: EmailConfiguration, locale: string, data: EmailVerificationData) {
    const request: NotificationRequest = new NotificationRequest();
    request.setConfiguration(conf);
    request.locale = locale;
    request.add(data.getTemplate(), data);
    this.send.sendMessage(txId, this.notificationListenningTopic, '', request.toJson());
  }
}
let instance: SendNotification = null;

export function create(send: SendRequestCommon, notificationListenningTopic: string = 'notification') {
  instance = new SendNotification(send, notificationListenningTopic);
}

export function getInstance(): SendNotification {
  return instance;
}
