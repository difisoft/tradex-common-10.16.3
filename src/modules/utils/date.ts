import * as moment from 'moment';

const DISPLAY_FORMAT = 'YYYYMMDD';
const DATETIME_DISPLAY_FORMAT = 'YYYYMMDDhhmmss'


const formatDateToDisplay = (date: Date, format: string = DISPLAY_FORMAT): string => {
  try {
    const obj = moment(date);
    if (obj.isValid()) {
      return moment(date).format(format);
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

const convertStringToDate = (data: string, format: string = DISPLAY_FORMAT): Date => {
  try {
    const obj = moment.utc(data, format);
    if (obj.isValid()) {
      return obj.toDate();
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};


const compareDateOnly = (date1: Date, date2: Date): boolean => {
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  return date1.getTime() === date2.getTime();
};

export { formatDateToDisplay, convertStringToDate, DATETIME_DISPLAY_FORMAT, compareDateOnly }