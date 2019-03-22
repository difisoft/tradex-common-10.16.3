import * as moment from 'moment';

const DATE_DISPLAY_FORMAT = 'YYYYMMDD';
const DATETIME_DISPLAY_FORMAT = 'YYYYMMDDhhmmss'


const formatDateToDisplay = (date: Date, format: string = DATE_DISPLAY_FORMAT): string => {
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

const convertStringToDate = (data: string, format: string = DATE_DISPLAY_FORMAT): Date => {
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


const compareDateOnly = (date1: Date, date2: Date): number => {
  const temp1 = new Date(date1.getTime());
  const temp2 = new Date(date2.getTime());
  temp1.setHours(0, 0, 0, 0);
  temp2.setHours(0, 0, 0, 0);
  return temp1.getTime() - temp2.getTime();
};


const getEndOfDate = (date: Date): Date => {
  const temp: Date = new Date(date.getTime());
  temp.setHours(23, 59, 59, 999);
  return temp;
};


const getStartOfDate = (date: Date): Date => {
  const temp: Date = new Date(date.getTime());
  temp.setHours(0, 0, 0, 0);
  return temp;
};


export {
  formatDateToDisplay,
  convertStringToDate,
  DATETIME_DISPLAY_FORMAT,
  DATE_DISPLAY_FORMAT,
  compareDateOnly,
  getEndOfDate,
  getStartOfDate
}