import * as AWS from 'aws-sdk';

declare interface IAWSUploadOption {
  expires: number; //seconds
  pathToUpload: string;
  minUpload: number;
  maxUpload: number;
}

const loadCredentials = (conf: any) => {
  AWS.config.credentials = new AWS.Credentials({
    accessKeyId: conf.accessKeyId,
    secretAccessKey: conf.secretAccessKey
  });
}

const getTempCredentials = (conf: any): Promise<AWS.STS.Credentials> => {
  return new Promise<AWS.STS.Credentials>((resolve: Function, reject: Function) => {
    const sts = new AWS.STS();
    sts.assumeRole(conf, (err: AWS.AWSError, data: AWS.STS.AssumeRoleResponse) => {
      if (err == null) {
        const tempCredentials = data.Credentials;

        resolve(tempCredentials);
      } else {
        reject(err);
      }

    });
  });

}

const generatePresignedUrlForUpload = (bucket: string, key: string, option: IAWSUploadOption): string => {
  const S3 = new AWS.S3();
  if (option == null) {
    return null;
  }

  return S3.getSignedUrl('putObject', {
    Bucket: bucket, 
    Key: key, 
    Expires: option.expires,
    Conditions: [
      ['starts-with', '$key', option.pathToUpload],
      ['content-length-range', option.minUpload, option.maxUpload]
    ]

  });
}

export { loadCredentials, getTempCredentials, generatePresignedUrlForUpload }