"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const DISPLAY_FORMAT = 'YYYYMMDD';
const DATETIME_DISPLAY_FORMAT = 'YYYYMMDDhhmmss';
exports.DATETIME_DISPLAY_FORMAT = DATETIME_DISPLAY_FORMAT;
const formatDateToDisplay = (date, format = DISPLAY_FORMAT) => {
    try {
        return moment(date).format(format);
    }
    catch (e) {
        return null;
    }
};
exports.formatDateToDisplay = formatDateToDisplay;
const convertStringToDate = (data, format = DISPLAY_FORMAT) => {
    try {
        return moment(data, format).toDate();
    }
    catch (e) {
        return null;
    }
};
exports.convertStringToDate = convertStringToDate;
//# sourceMappingURL=date.js.map