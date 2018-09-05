const generateToken = (length: number = 6, onlyDigit: boolean = true): string => {
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if (onlyDigit) {
    possible = '0123456789';
  }
  
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export { generateToken }