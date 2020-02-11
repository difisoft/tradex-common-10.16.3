import { IScope } from '../models/aaa';
import { IToken, IForwardUriResult } from '../models';
declare type CheckService = (serviceName: string, nodeId?: string) => boolean;
export interface IInputUri {
    uri: string;
}
export declare function getForwardUri(msg: IInputUri | string, matchedScope: IScope, token: IToken, isServiceAlive: CheckService, transformUriMap?: any): IForwardUriResult;
export {};
