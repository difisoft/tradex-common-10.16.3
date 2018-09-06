import { SendRequestCommon } from "../kafka";
import IConf from "./IConf";
import ServiceRegistration from "./ServiceRegistration";

const defaultInterval: number = 5000;

export default class SendRegistration {
  private serviceRegistration: ServiceRegistration;
  constructor(private send: SendRequestCommon, private conf: IConf) {
    const interval: number = conf.interval ? conf.interval : defaultInterval;
    this.serviceRegistration = new ServiceRegistration(conf.serviceName, conf.nodeId, 0);
    setInterval(() => this.doRegister(), interval);
  }

  private doRegister(): void {
    this.serviceRegistration.currentTime = new Date().getUTCMilliseconds();
    this.send.sendMessage('', this.conf.listeningTopic, '', this.serviceRegistration);
  }
}
let instance: SendRegistration = null;

export function create(send: SendRequestCommon, conf: IConf) {
  instance = new SendRegistration(send, conf);
}

export function getInstance(): SendRegistration {
  return instance;
}
