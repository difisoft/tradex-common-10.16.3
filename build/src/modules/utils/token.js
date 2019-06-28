"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateToken = (length = 6, onlyDigit = true) => {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (onlyDigit) {
        possible = '0123456789';
    }
    let text = '';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
exports.generateToken = generateToken;
//# sourceMappingURL=token.js.map