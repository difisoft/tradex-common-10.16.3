"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const __1 = require("../..");
let templateResources = [];
const init = (msNames, requestTopic = 'configuration') => {
    __1.Kafka.getInstance().sendRequest(uuid_1.v4(), requestTopic, 'get:/api/v1/template', {
        msNames: msNames
    })
        .subscribe((message) => {
        if (message.data.status != null) {
            __1.Logger.error(message.data.status);
            process.exit(1);
        }
        else {
            templateResources = message.data.data;
        }
    });
};
exports.init = init;
const getTemplateResources = () => {
    return templateResources;
};
exports.getTemplateResources = getTemplateResources;
//# sourceMappingURL=template.js.map