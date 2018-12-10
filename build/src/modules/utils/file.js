"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function readTextFromFile(file, callback) {
    fs.readFile(file, 'utf8', callback);
}
exports.readTextFromFile = readTextFromFile;
//# sourceMappingURL=file.js.map