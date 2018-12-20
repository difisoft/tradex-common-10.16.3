export declare interface IUserData {
  un?: string;// username
  oks?: string[];//order_keys
}

export default interface IToken {
  domain?: string;
  userId?: number;
  serviceCode?: string;
  connectionId?: any;
  serviceId?: string;
  serviceName?: string;
  clientId?: number;
  serviceUserId?: number;
  loginMethod?: number;
  refreshTokenId?: number;
  scopeGroupIds?: number[];
  serviceUsername?: string;
  userData?: IUserData;
}