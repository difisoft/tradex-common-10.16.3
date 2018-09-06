import * as acceptLanguage from 'accept-language';

acceptLanguage.languages(['vi', 'en', 'kr', 'zh']);

const getLanguageCode = (acceptLanguageHeader: string): string => {
  try {
    return acceptLanguage.get(acceptLanguageHeader);
  } catch (e) {
    return 'vi';
  }
};

export { getLanguageCode }