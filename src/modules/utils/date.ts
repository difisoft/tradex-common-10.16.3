import * as moment from 'moment';

const DISPLAY_FORMAT = 'YYYYMMDD';

const formatDateToDisplay = (date: Date): string => {
  try {
    return moment(date).format(DISPLAY_FORMAT);
  } catch (e) {
    return null;
  }
};

export { formatDateToDisplay }