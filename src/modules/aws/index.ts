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

const generateSignedDataForUpload = (bucket: string, key: string, option: IAWSUploadOption): any => {
  const S3 = new AWS.S3();
  if (option == null) {
    return null;
  }

  S3.createPresignedPost({
    Bucket: bucket, 
    Fields: {
      key: key
    }, 
    Expires: option.expires,
    Conditions: [
      ['starts-with', '$key', option.pathToUpload],
      ['content-length-range', option.minUpload, option.maxUpload]
    ]
  }, (err: Error, data: AWS.S3.PresignedPost) => {
    if (err != null){
      return null;
    } else {
      return data;
    }
  });
}

export { loadCredentials, getTempCredentials, generateSignedDataForUpload, IAWSUploadOption }