"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const rsaEncrypt = (data, publicKey) => {
    const buffer = Buffer.from(data);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};
exports.rsaEncrypt = rsaEncrypt;
const rsaDecrypt = (data, privateKey) => {
    const buffer = Buffer.from(data, "base64");
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};
exports.rsaDecrypt = rsaDecrypt;
//# sourceMappingURL=rsa.js.map