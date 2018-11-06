import { IScope, ICommonForward, ForwardType, IForwardConnection, ForwardDataType, IForwardService } from '../models/aaa';
import { IToken, IForwardUriResult } from '../models';
import { IMessage } from '../kafka';

type CheckService = (serviceName: string, nodeId?: string) => boolean;

function getForwardUriWithSetting(msg: IMessage, forwardConfig: ICommonForward, token: IToken, isServiceAlive: CheckService, transformUriMap?: any): IForwardUriResult {
  const result: IForwardUriResult = {};
  if (forwardConfig.forwardType === ForwardType.CONNECTION) {
    const forwardData: IForwardConnection = <IForwardConnection>forwardConfig;
    if (forwardData.type.toString() === ForwardDataType.SERVICE_STRING_MAPPING) {
      if (token.serviceName in forwardData.uri_mapping) {
        result.uri = forwardData.uri_mapping[token.serviceName];
      }
    } else if (forwardData.type.toString() === ForwardDataType.SERVICE_STRING_MAPPING) {
      if (token.serviceName in forwardData.uri_mapping) {
        result.uri = transformUriMap[forwardData.uri_mapping[token.serviceName]](msg.uri);
      }
    }
    result.conId = {
      connectionId: token.connectionId,
      serviceId: token.serviceId,
      serviceName: token.serviceName,
    }
    const serviceName: string = token.serviceName;
    const serviceId: string = token.serviceId;
    if (isServiceAlive(serviceName, serviceId)) {
      result.topic = `${serviceName}.${serviceId}`;
    } else {
      if (forwardData.backup) {
        return getForwardUriWithSetting(msg, forwardData.backup, token, isServiceAlive, transformUriMap);
      }
      result.topic = "ERROR";
      result.uri = "SERVICE_DOWN";
    }
  } else if (forwardConfig.forwardType === ForwardType.SERVICE) {
    const forwardData: IForwardService = <IForwardService>forwardConfig;
    if (forwardData.backup && !isServiceAlive(forwardData.service)) {
      return getForwardUriWithSetting(msg, forwardData.backup, token, isServiceAlive, transformUriMap);
    }
  }
  return result;
}

export function getForwardUri(msg: IMessage, matchedScope: IScope, token: IToken, isServiceAlive: CheckService, transformUriMap?: any): IForwardUriResult {
  return getForwardUriWithSetting(msg, matchedScope.forwardData, token, isServiceAlive, transformUriMap);
}