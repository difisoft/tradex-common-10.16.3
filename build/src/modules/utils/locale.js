"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acceptLanguage = require("accept-language");
acceptLanguage.languages(['vi', 'en', 'kr', 'zh']);
const getLanguageCode = (acceptLanguageHeader) => {
    try {
        return acceptLanguage.get(acceptLanguageHeader);
    }
    catch (e) {
        return 'vi';
    }
};
exports.getLanguageCode = getLanguageCode;
//# sourceMappingURL=locale.js.map