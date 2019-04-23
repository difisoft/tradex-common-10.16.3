import { logger as Logger } from '../../modules/log';

export const round = (input: number, scale: number = 2): number => {
  if (input == null) {
    Logger.warn('Warning rounding undefined/null number');
    return input;
  } else {
    return Number(input.toFixed(scale));
  }
};
