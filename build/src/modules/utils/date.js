"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const DISPLAY_FORMAT = 'YYYYMMDD';
const DATETIME_DISPLAY_FORMAT = 'YYYYMMDDHHmmss';
exports.DATETIME_DISPLAY_FORMAT = DATETIME_DISPLAY_FORMAT;
const formatDateToDisplay = (date, format = DISPLAY_FORMAT) => {
    try {
        if (date == null) {
            return null;
        }
        const obj = moment(date);
        if (obj.isValid()) {
            return moment.utc(date).format(format);
        }
        else {
            return null;
        }
    }
    catch (e) {
        return null;
    }
};
exports.formatDateToDisplay = formatDateToDisplay;
const convertStringToDate = (data, format = DISPLAY_FORMAT) => {
    try {
        const obj = moment.utc(data, format);
        if (obj.isValid()) {
            return obj.toDate();
        }
        else {
            return null;
        }
    }
    catch (e) {
        return null;
    }
};
exports.convertStringToDate = convertStringToDate;
const compareDateOnly = (date1, date2) => {
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    return date1.getTime() === date2.getTime();
};
exports.compareDateOnly = compareDateOnly;
const getEndOfDate = (date) => {
    date.setHours(23, 59, 59, 999);
    return date;
};
exports.getEndOfDate = getEndOfDate;
const getStartOfDate = (date) => {
    date.setHours(0, 0, 0, 0);
    return date;
};
exports.getStartOfDate = getStartOfDate;
//# sourceMappingURL=date.js.map