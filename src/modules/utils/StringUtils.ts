export const isEmpty = (input: string): boolean => {
  return (input === undefined || input === null || input === '' || input.length <= 0) ? true : false;
};
