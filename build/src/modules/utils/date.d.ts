declare const DATETIME_DISPLAY_FORMAT = "YYYYMMDDhhmmss";
declare const formatDateToDisplay: (date: Date, format?: string) => string;
declare const convertStringToDate: (data: string, format?: string) => Date;
declare const compareDateOnly: (date1: Date, date2: Date) => boolean;
export { formatDateToDisplay, convertStringToDate, DATETIME_DISPLAY_FORMAT, compareDateOnly };
