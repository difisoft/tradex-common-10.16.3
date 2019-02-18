import { logger as Logger } from '../../modules/log';

export const round = (input: number, scale: number = 2): number => {
  if (input === undefined || input === null) {
    Logger.warn('Warning rounding undefined/null number');
    return 0;
  } else {
    return Number(input.toFixed(scale));
  }
};
