"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aaa_1 = require("../models/aaa");
function getForwardUriWithSetting(msg, forwardConfig, token, isServiceAlive, transformUriMap) {
    const result = {};
    if (forwardConfig.forwardType === aaa_1.ForwardType.CONNECTION) {
        const forwardData = forwardConfig;
        if (forwardData.type.toString() === aaa_1.ForwardDataType.SERVICE_STRING_MAPPING) {
            if (token.serviceName in forwardData.uri_mapping) {
                result.uri = forwardData.uri_mapping[token.serviceName];
            }
        }
        else if (forwardData.type.toString() === aaa_1.ForwardDataType.SERVICE_STRING_MAPPING) {
            if (token.serviceName in forwardData.uri_mapping) {
                result.uri = transformUriMap[forwardData.uri_mapping[token.serviceName]](msg.uri);
            }
        }
        result.conId = {
            connectionId: token.connectionId,
            serviceId: token.serviceId,
            serviceName: token.serviceName,
        };
        const serviceName = token.serviceName;
        const serviceId = token.serviceId;
        if (isServiceAlive(serviceName, serviceId)) {
            result.topic = `${serviceName}.${serviceId}`;
        }
        else {
            if (forwardData.backup) {
                return getForwardUriWithSetting(msg, forwardData.backup, token, isServiceAlive, transformUriMap);
            }
            result.topic = "ERROR";
            result.uri = "SERVICE_DOWN";
        }
    }
    else if (forwardConfig.forwardType === aaa_1.ForwardType.SERVICE) {
        const forwardData = forwardConfig;
        if (forwardData.backup && !isServiceAlive(forwardData.service)) {
            return getForwardUriWithSetting(msg, forwardData.backup, token, isServiceAlive, transformUriMap);
        }
    }
    return result;
}
function getForwardUri(msg, matchedScope, token, isServiceAlive, transformUriMap) {
    return getForwardUriWithSetting(msg, matchedScope.forwardData, token, isServiceAlive, transformUriMap);
}
exports.getForwardUri = getForwardUri;
//# sourceMappingURL=scope.js.map