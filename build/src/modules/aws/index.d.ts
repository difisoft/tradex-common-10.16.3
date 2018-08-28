import * as AWS from 'aws-sdk';
declare const loadCredentials: (conf: any) => void;
declare const getTempCredentials: (conf: any) => Promise<AWS.STS.Credentials>;
export { loadCredentials, getTempCredentials };
