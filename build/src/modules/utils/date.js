"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const DATE_DISPLAY_FORMAT = 'YYYYMMDD';
exports.DATE_DISPLAY_FORMAT = DATE_DISPLAY_FORMAT;
const DATETIME_DISPLAY_FORMAT = 'YYYYMMDDhhmmss';
exports.DATETIME_DISPLAY_FORMAT = DATETIME_DISPLAY_FORMAT;
const formatDateToDisplay = (date, format = DATE_DISPLAY_FORMAT) => {
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
const convertStringToDate = (data, format = DATE_DISPLAY_FORMAT) => {
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
    const temp1 = new Date(date1.getTime());
    const temp2 = new Date(date2.getTime());
    temp1.setHours(0, 0, 0, 0);
    temp2.setHours(0, 0, 0, 0);
    return temp1.getTime() - temp2.getTime();
};
exports.compareDateOnly = compareDateOnly;
const getEndOfDate = (date) => {
    const temp = new Date(date.getTime());
    temp.setHours(23, 59, 59, 999);
    return temp;
};
exports.getEndOfDate = getEndOfDate;
const getStartOfDate = (date) => {
    const temp = new Date(date.getTime());
    temp.setHours(0, 0, 0, 0);
    return temp;
};
exports.getStartOfDate = getStartOfDate;
//# sourceMappingURL=date.js.map