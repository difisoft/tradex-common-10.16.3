"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const loadCredentials = (conf) => {
    AWS.config.credentials = new AWS.Credentials({
        accessKeyId: conf.accessKeyId,
        secretAccessKey: conf.secretAccessKey
    });
};
exports.loadCredentials = loadCredentials;
const getTempCredentials = (conf) => {
    return new Promise((resolve, reject) => {
        const sts = new AWS.STS();
        sts.assumeRole(conf, (err, data) => {
            if (err == null) {
                const tempCredentials = data.Credentials;
                resolve(tempCredentials);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.getTempCredentials = getTempCredentials;
//# sourceMappingURL=index.js.map