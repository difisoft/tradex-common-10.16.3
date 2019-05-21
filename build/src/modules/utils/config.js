"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getEnvStr(name, defaultValue = "") {
    const result = process.env[name];
    return (result == null || result === "") ? defaultValue : result;
}
exports.getEnvStr = getEnvStr;
function getEnvArr(name, defaultValue = []) {
    const result = process.env[name];
    return (result == null || result === "") ? defaultValue : result.split(";");
}
exports.getEnvArr = getEnvArr;
function getEnvNum(name, defaultValue = 0) {
    const result = process.env[name];
    return (result == null || result === "") ? defaultValue : Number(result);
}
exports.getEnvNum = getEnvNum;
function createJwtConfig(conf, domain, domains, keyDir, serviceName, publicKeyFileName, privateKeyFileName) {
    conf.jwt = {};
    const domainConfig = {};
    domains.forEach((dm) => {
        const config = {};
        domainConfig[dm] = config;
        if (publicKeyFileName != null && publicKeyFileName !== "") {
            config.publicKeyFile = `${keyDir}/${serviceName}/${dm}/${publicKeyFileName}`;
        }
        if (privateKeyFileName != null && privateKeyFileName !== "") {
            config.privateKeyFile = `${keyDir}/${serviceName}/${dm}/${privateKeyFileName}`;
        }
        if (dm === domain) {
            Object.assign(conf.jwt, config);
        }
    });
    conf.jwt.domains = domainConfig;
}
exports.createJwtConfig = createJwtConfig;
//# sourceMappingURL=config.js.map