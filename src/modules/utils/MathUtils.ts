import { logger as Logger } from '../../modules/log';

export const round = (input: number, scale: number = 2): number => {
  if (input === undefined) {
    Logger.error('Can not rounding undefined number');
    throw new Error('Can not rounding undefined number');
  } else {
    return Number(input.toFixed(scale));
  }
};
