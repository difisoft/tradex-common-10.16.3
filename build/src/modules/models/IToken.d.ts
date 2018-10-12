export default interface IToken {
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
    sec_username?: string;
}
