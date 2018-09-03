"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const DISPLAY_FORMAT = 'YYYYMMDD';
const formatDateToDisplay = (date) => {
    try {
        return moment(date).format(DISPLAY_FORMAT);
    }
    catch (e) {
        return null;
    }
};
exports.formatDateToDisplay = formatDateToDisplay;
//# sourceMappingURL=date.js.map