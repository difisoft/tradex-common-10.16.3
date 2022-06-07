declare const MINUTE_DATE_DISPLAY_FORMAT = "YYYY-MM-DD";
declare const DATE_DISPLAY_FORMAT = "YYYYMMDD";
declare const DATETIME_DISPLAY_FORMAT = "YYYYMMDDhhmmss";
declare const TIME_DISPLAY_FORMAT = "hhmmss";
declare const isWeekend: (date: Date) => boolean;
declare const countDayBetween: (dateFrom: Date, dateTo: Date) => number;
declare const formatDateToDisplay: (date: Date, format?: string) => string;
declare const convertStringToDate: (data: string, format?: string) => Date;
declare const convertISO8601StringToDate: (data: string) => Date;
declare const formatISO8601StringToDate: (data: Date) => string;
declare const compareDateOnly: (date1: Date, date2: Date) => number;
declare const getEndOfDate: (date: Date) => Date;
declare const getStartOfDate: (date: Date) => Date;
declare const getStartOfWeek: (date: Date) => Date;
declare const getEndOfWeek: (date: Date) => Date;
declare const getStartOfMonth: (date: Date) => Date;
declare const getEndOfMonth: (date: Date) => Date;
declare const countDaysOfAYear: (year: number) => number;
export { formatDateToDisplay, convertStringToDate, MINUTE_DATE_DISPLAY_FORMAT, DATETIME_DISPLAY_FORMAT, DATE_DISPLAY_FORMAT, TIME_DISPLAY_FORMAT, compareDateOnly, getEndOfDate, getStartOfDate, countDayBetween, countDaysOfAYear, getStartOfWeek, getEndOfWeek, getStartOfMonth, getEndOfMonth, convertISO8601StringToDate, formatISO8601StringToDate, isWeekend };
