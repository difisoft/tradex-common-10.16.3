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
const generateSignedDataForUpload = (bucket, key, option) => {
    return new Promise((resolve, reject) => {
        const S3 = new AWS.S3();
        if (option == null) {
            resolve(null);
        }
        S3.createPresignedPost({
            Bucket: bucket,
            Fields: {
                key: key
            },
            Expires: option.expires,
            Conditions: [
                ['starts-with', '$key', option.pathToUpload],
                ['content-length-range', option.minUpload, option.maxUpload]
            ]
        }, (err, data) => {
            if (err != null) {
                resolve(null);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.generateSignedDataForUpload = generateSignedDataForUpload;
//# sourceMappingURL=index.js.map