"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceRegistration_1 = require("./ServiceRegistration");
const defaultInterval = 5000;
class SendRegistration {
    constructor(send, conf) {
        this.send = send;
        this.conf = conf;
        const interval = conf.interval ? conf.interval : defaultInterval;
        this.serviceRegistration = new ServiceRegistration_1.default(conf.serviceName, conf.nodeId, 0);
        setInterval(() => this.doRegister(), interval);
    }
    doRegister() {
        this.serviceRegistration.currentTime = new Date().getUTCMilliseconds();
        this.send.sendMessage('', this.conf.listeningTopic, '', this.serviceRegistration);
    }
}
exports.default = SendRegistration;
let instance = null;
function create(send, conf) {
    instance = new SendRegistration(send, conf);
}
exports.create = create;
function getInstance() {
    return instance;
}
exports.getInstance = getInstance;
//# sourceMappingURL=SendRegistration.js.map