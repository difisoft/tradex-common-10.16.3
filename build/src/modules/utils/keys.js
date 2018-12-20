"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.TRADEX_DOMAIN = 'tradex';
function processJwtKey(conf) {
    if (conf.domain === exports.TRADEX_DOMAIN) {
        processKey(conf);
        conf.jwt.domains && Object.keys(conf.jwt.domains).forEach((domain) => processKey(conf, domain));
    }
    else {
        processKey(conf, conf.domain);
    }
    conf.getJwt = () => conf.domain === exports.TRADEX_DOMAIN || !conf.domain ? conf.jwt : conf.jwt.domains[conf.domain];
}
exports.processJwtKey = processJwtKey;
function processKey(conf, domain = null) {
    let obj = conf.jwt;
    if (domain) {
        obj = obj.domains[domain];
    }
    if (!obj) {
        return;
    }
    if (obj.privateKeyFile) {
        obj.privateKey = fs.readFileSync(obj.privateKeyFile, 'utf8');
    }
    if (obj.publicKeyFile) {
        obj.publicKey = fs.readFileSync(obj.publicKeyFile, 'utf8');
    }
}
//# sourceMappingURL=keys.js.map