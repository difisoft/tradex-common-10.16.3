import 'isomorphic-fetch';
declare const getLanguageCode: (acceptLanguageHeader: string) => string;
declare const init: (msNames: string, namespaceList: string[], requestTopic?: string) => void;
declare const getInstance: () => any;
export { getLanguageCode, init, getInstance };
