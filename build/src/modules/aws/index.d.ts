import * as AWS from 'aws-sdk';
declare interface IAWSUploadOption {
    expires: number;
    pathToUpload: string;
    minUpload: number;
    maxUpload: number;
}
declare const loadCredentials: (conf: any) => void;
declare const getTempCredentials: (conf: any) => Promise<AWS.STS.Credentials>;
declare const generateSignedDataForUpload: (bucket: string, key: string, option: IAWSUploadOption) => Promise<AWS.S3.PresignedPost>;
export { loadCredentials, getTempCredentials, generateSignedDataForUpload, IAWSUploadOption };
