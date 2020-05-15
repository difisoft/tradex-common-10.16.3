"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const rsaEncrypt = (data, publicKey) => {
    const buffer = Buffer.from(data);
    const encrypted = crypto.publicEncrypt({ key: publicKey, padding: 1 }, buffer);
    return encrypted.toString("base64");
};
exports.rsaEncrypt = rsaEncrypt;
const rsaDecrypt = (data, privateKey) => {
    const buffer = Buffer.from(data, "base64");
    const decrypted = crypto.privateDecrypt({ key: privateKey, padding: 1 }, buffer);
    return decrypted.toString("utf8");
};
exports.rsaDecrypt = rsaDecrypt;
//# sourceMappingURL=rsa.js.map