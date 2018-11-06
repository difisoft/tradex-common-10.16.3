import { IScope } from '../models/aaa';
import { IToken, IForwardUriResult } from '../models';
import { IMessage } from '../kafka';
declare type CheckService = (serviceName: string, nodeId?: string) => boolean;
export declare function getForwardUri(msg: IMessage, matchedScope: IScope, token: IToken, isServiceAlive: CheckService, transformUriMap?: any): IForwardUriResult;
export {};
