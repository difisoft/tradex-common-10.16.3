import * as moment from 'moment';

const DISPLAY_FORMAT = 'YYYYMMDD';
const DATETIME_DISPLAY_FORMAT = 'YYYYMMDDHHmmss'


const formatDateToDisplay = (date: Date, format: string = DISPLAY_FORMAT): string => {
  try {
    if (date == null) {
      return null;
    }
    
    const obj = moment(date);
    if (obj.isValid()) {
      return moment.utc(date).format(format);
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


const getEndOfDate = (date: Date): Date => {
  date.setHours(23, 59, 59, 999);
  return date;
};


const getStartOfDate = (date: Date): Date => {
  date.setHours(0, 0, 0, 0);
  return date;
};


export {
  formatDateToDisplay,
  convertStringToDate,
  DATETIME_DISPLAY_FORMAT,
  compareDateOnly,
  getEndOfDate,
  getStartOfDate
}