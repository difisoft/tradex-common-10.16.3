export const round = (input: number, scale: number = 2): number => {
  if (input === undefined) {
    throw new Error('Can not rounding undefined number');
  } else {
    return Number(input.toFixed(scale));
  }
};
