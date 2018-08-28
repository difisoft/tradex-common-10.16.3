import * as AWS from 'aws-sdk';

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

export { loadCredentials, getTempCredentials }