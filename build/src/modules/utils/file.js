"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function readTextFromFile(file, callback) {
    fs_1.default.readFile(file, 'utf8', callback);
}
exports.readTextFromFile = readTextFromFile;
//# sourceMappingURL=file.js.map