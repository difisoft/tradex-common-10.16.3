import IConnectionIdentifier from "./IConnectionIdentifier";

export declare interface IUserData {
  username?: string;
  orderKeys?: string;
  identifierNumber?: string;
  branchCode?: string;
  mngDeptCode?: string;
  deptCode?: string;
  agencyNumber?: string;
  accountNumbers?: string[];
  fssTokenId?: string;
  userLevel?: string;
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
  platform?: string;
  osVersion?: string;
  appVersion?: string;
  userData?: IUserData;
}

export interface IAccessTokenExtendData {
  sgIds: number[]; // scopeGroupIds
  conId?: IConnectionIdentifier; // connectionId
  sc?: string; // serviceCode
  su?: string; // serviceUser
  ud?: IUserData; // userdata
  pl?: string;
  osV?: string;
  appV?: string;
}

export interface IAccessToken extends IAccessTokenExtendData {
  dm?: string;
  uId?: number;
  cId: number;
  suId?: number;
  lm: number;
  rId: number;
  rls?: string[];
}
