"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotificationRequest {
    constructor() {
        this.template = new Map();
    }
    add(templateKey, data) {
        this.template[templateKey] = data;
    }
    setConfiguration(configurationData) {
        this.configurationData = configurationData;
        this.configuration = JSON.stringify(configurationData);
        this.method = configurationData.getMethod();
    }
    getConfiguration() {
        if (!this.configurationData && this.configuration) {
            this.configurationData = JSON.parse(this.configuration);
        }
        return this.configurationData;
    }
    toJson() {
        return {
            method: this.method.toString(),
            template: this.template,
            locale: this.locale,
            configuration: this.configuration,
        };
    }
    fromJson(json) {
        const data = JSON.parse(json);
        this.method = data.method;
        this.template = data.template;
        this.locale = data.locale;
        this.configuration = data.configuration;
    }
}
exports.default = NotificationRequest;
//# sourceMappingURL=NotificationRequest.js.map