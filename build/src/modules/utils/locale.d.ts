import 'isomorphic-fetch';
declare const getLanguageCode: (acceptLanguageHeader: string) => string;
declare const init: (requestTopic: string, msNames: string[], namsespaces: string[]) => void;
declare const getInstance: () => any;
export { getLanguageCode, init, getInstance };
